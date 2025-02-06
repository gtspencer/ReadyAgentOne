import { z } from "zod";
import { GraphQLClient } from "graphql-request";
import { encodeFunctionData, Hex } from "viem";
import { EmptySchema } from "./schemas";
import { gql } from "graphql-request";
import { ActionProvider, CreateAction, EvmWalletProvider, Network } from "@coinbase/agentkit";

export const BASE_SEPOLIA_GRAPH_ENDPOINT =
  "https://subgraph-endpoints.superfluid.dev/base-sepolia/protocol-v1";

export type SuperfluidAccountResponse = {
    accounts: Account[];
  };
  
  type Account = {
    isSuperApp: boolean;
    inflows: Flow[]; // Assuming inflows have the same structure as outflows, adjust if needed
    outflows: Flow[];
    accountTokenSnapshots: AccountTokenSnapshot[];
  };
  
  type Flow = {
    currentFlowRate: string;
    token: Token;
    receiver: Receiver;
  };
  
  type Token = {
    symbol?: string; // Optional because "symbol" is only seen in outflows
    id?: string; // Optional because "id" is only seen in accountTokenSnapshots
  };
  
  type Receiver = {
    id: string;
  };
  
  type AccountTokenSnapshot = {
    token: Token;
    totalNumberOfActiveStreams: number;
    totalNetFlowRate: string;
  };
  

  export const getAccountOutflowQuery = gql`
    query GetAccountData($id: ID!) {
      accounts(where: { id: $id }) {
        isSuperApp
        inflows {
          currentFlowRate
          token {
            symbol
          }
          sender {
            id
          }
        }
        outflows {
          currentFlowRate
          token {
            symbol
          }
          receiver {
            id
          }
        }
        accountTokenSnapshots {
          token {
            id
          }
          totalNumberOfActiveStreams
          totalNetFlowRate
        }
      }
    }
  `;


const client = new GraphQLClient(BASE_SEPOLIA_GRAPH_ENDPOINT);

/**
 * Gets the current account outflows for the user
 *
 * @param userId - The user id of the account
 * @returns The data on the current streams from the agent
 */
async function getAccountOutflow(
  userId: string,
): Promise<SuperfluidAccountResponse | undefined> {
  try {
    const variables = { id: userId.toLowerCase() };
    const data = await client.request<SuperfluidAccountResponse>(getAccountOutflowQuery, variables);
    return data;
  } catch (error) {
    console.error("Error fetching account data:", error);
    return undefined;
  }
}

/**
 * SuperfluidQueryActionProvider is an action provider for Superfluid interactions.
 */
export class SuperfluidQueryActionProvider extends ActionProvider<EvmWalletProvider> {

    /**
     * Constructor for the SuperfluidQueryActionProvider class.
     */
    constructor() {
        super("superfluid-query", []);

    }

    /**
     * Gets a list of addresses to which a stream is open
     *
     * @param walletProvider - The wallet provider to start the pool from.
     * @returns A JSON string containing the account details or error message
     */
    @CreateAction({
        name: "query_streams",
        description: `
This tool will query the Superfluid subgraph to find a list of addresses to which you are streaming a token.
It takes nothing as input; you will be checking against your own wallet.
It returns an array of account outflows, each with a receiver (wallet address), a token, and a flow rate. If the flow rate is greater than zero, there is a current flow.
`,
        schema: EmptySchema,
    })
    async queryStreams(
        walletProvider: EvmWalletProvider,
    ): Promise<string> {
        try {

            const accountData = await getAccountOutflow(walletProvider.getAddress())
            const outflows = accountData?.accounts?.length ? accountData?.accounts[0].outflows : [];
            const activeOutflows = outflows.filter(o => {
                return parseInt(o.currentFlowRate) > 0;
            });

            return `Current outflows are ${JSON.stringify(activeOutflows)}`;
        } catch (error) {
            return `Error creating Superfluid pool: ${error}`;
        }
    }

    /**
     * Checks if the Superfluid action provider supports the given network.
     *
     * @param network - The network to check.
     * @returns True if the Superfluid action provider supports the network, false otherwise.
     */
    supportsNetwork = (network: Network) => network.protocolFamily === "evm";



}

export const superfluidQueryActionProvider = () => new SuperfluidQueryActionProvider();
