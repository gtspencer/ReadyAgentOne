"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superfluidQueryActionProvider = exports.SuperfluidQueryActionProvider = exports.getAccountOutflowQuery = exports.BASE_SEPOLIA_GRAPH_ENDPOINT = void 0;
const graphql_request_1 = require("@graphql-request");
const schemas_1 = require("./schemas");
const graphql_request_2 = require("@graphql-request");
const agentkit_1 = require("@coinbase/agentkit");
exports.BASE_SEPOLIA_GRAPH_ENDPOINT = "https://subgraph-endpoints.superfluid.dev/base-sepolia/protocol-v1";
exports.getAccountOutflowQuery = (0, graphql_request_2.gql) `
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
const client = new graphql_request_1.GraphQLClient(exports.BASE_SEPOLIA_GRAPH_ENDPOINT);
/**
 * Gets the current account outflows for the user
 *
 * @param userId - The user id of the account
 * @returns The data on the current streams from the agent
 */
async function getAccountOutflow(userId) {
    try {
        const variables = { id: userId.toLowerCase() };
        const data = await client.request(exports.getAccountOutflowQuery, variables);
        return data;
    }
    catch (error) {
        console.error("Error fetching account data:", error);
        return undefined;
    }
}
/**
 * SuperfluidQueryActionProvider is an action provider for Superfluid interactions.
 */
class SuperfluidQueryActionProvider extends agentkit_1.ActionProvider {
    /**
     * Constructor for the SuperfluidQueryActionProvider class.
     */
    constructor() {
        super("superfluid-query", []);
        /**
         * Checks if the Superfluid action provider supports the given network.
         *
         * @param network - The network to check.
         * @returns True if the Superfluid action provider supports the network, false otherwise.
         */
        this.supportsNetwork = (network) => network.protocolFamily === "evm";
    }
    /**
     * Gets a list of addresses to which a stream is open
     *
     * @param walletProvider - The wallet provider to start the pool from.
     * @returns A JSON string containing the account details or error message
     */
    async queryStreams(walletProvider) {
        try {
            const accountData = await getAccountOutflow(walletProvider.getAddress());
            const outflows = accountData?.accounts?.length ? accountData?.accounts[0].outflows : [];
            const activeOutflows = outflows.filter(o => {
                return parseInt(o.currentFlowRate) > 0;
            });
            return `Current outflows are ${JSON.stringify(activeOutflows)}`;
        }
        catch (error) {
            return `Error creating Superfluid pool: ${error}`;
        }
    }
}
exports.SuperfluidQueryActionProvider = SuperfluidQueryActionProvider;
__decorate([
    (0, agentkit_1.CreateAction)({
        name: "query_streams",
        description: `
This tool will query the Superfluid subgraph to find a list of addresses to which you are streaming a token.
It takes nothing as input; you will be checking against your own wallet.
It returns an array of account outflows, each with a receiver (wallet address), a token, and a flow rate. If the flow rate is greater than zero, there is a current flow.
`,
        schema: schemas_1.EmptySchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agentkit_1.EvmWalletProvider]),
    __metadata("design:returntype", Promise)
], SuperfluidQueryActionProvider.prototype, "queryStreams", null);
const superfluidQueryActionProvider = () => new SuperfluidQueryActionProvider();
exports.superfluidQueryActionProvider = superfluidQueryActionProvider;
