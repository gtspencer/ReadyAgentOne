// import { z } from "zod";

// import { encodeFunctionData, Hex } from "viem";
// import { EmptySchema } from "./schemas";
// import { getAccountOutflow } from "./graphQueries/superfluidGraphQueries"
// import { ActionProvider, CreateAction, EvmWalletProvider, Network } from "@coinbase/agentkit";


// /**
//  * SuperfluidQueryActionProvider is an action provider for Superfluid interactions.
//  */
// export class SuperfluidQueryActionProvider extends ActionProvider<EvmWalletProvider> {

//     /**
//      * Constructor for the SuperfluidQueryActionProvider class.
//      */
//     constructor() {
//         super("superfluid-query", []);

//     }

//     /**
//      * Gets a list of addresses to which a stream is open
//      *
//      * @param walletProvider - The wallet provider to start the pool from.
//      * @returns A JSON string containing the account details or error message
//      */
//     @CreateAction({
//         name: "query_streams",
//         description: `
// This tool will query the Superfluid subgraph to find a list of addresses to which you are streaming a token.
// It takes nothing as input; you will be checking against your own wallet.
// It returns a list of account outflows, each with a receiver (wallet address), and a flow rate. If the flow rate is greater than zero, there is a current flow.
// `,
//         schema: EmptySchema,
//     })
//     async queryStreams(
//         walletProvider: EvmWalletProvider,
//     ): Promise<string> {
//         try {

//             const accountData = await getAccountOutflow(walletProvider.getAddress())
//             const outflows = accountData?.data?.accounts?.length ? accountData?.data.accounts[0].outflows : [];
//             const activeOutflows = outflows.filter(o => {
//                 return parseInt(o.currentFlowRate) > 0;
//             });

//             return `Current outflows are ${activeOutflows}`;
//         } catch (error) {
//             return `Error creating Superfluid pool: ${error}`;
//         }
//     }

//     /**
//      * Checks if the Superfluid action provider supports the given network.
//      *
//      * @param network - The network to check.
//      * @returns True if the Superfluid action provider supports the network, false otherwise.
//      */
//     supportsNetwork = (network: Network) => network.protocolFamily === "evm";
// }

// export const superfluidQueryActionProvider = () => new SuperfluidQueryActionProvider();
