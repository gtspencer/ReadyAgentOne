import { ActionProvider, EvmWalletProvider, Network } from "@coinbase/agentkit";
export declare const BASE_SEPOLIA_GRAPH_ENDPOINT = "https://subgraph-endpoints.superfluid.dev/base-sepolia/protocol-v1";
export type SuperfluidAccountResponse = {
    accounts: Account[];
};
type Account = {
    isSuperApp: boolean;
    inflows: Flow[];
    outflows: Flow[];
    accountTokenSnapshots: AccountTokenSnapshot[];
};
type Flow = {
    currentFlowRate: string;
    token: Token;
    receiver: Receiver;
};
type Token = {
    symbol?: string;
    id?: string;
};
type Receiver = {
    id: string;
};
type AccountTokenSnapshot = {
    token: Token;
    totalNumberOfActiveStreams: number;
    totalNetFlowRate: string;
};
export declare const getAccountOutflowQuery: string;
/**
 * SuperfluidQueryActionProvider is an action provider for Superfluid interactions.
 */
export declare class SuperfluidQueryActionProvider extends ActionProvider<EvmWalletProvider> {
    /**
     * Constructor for the SuperfluidQueryActionProvider class.
     */
    constructor();
    /**
     * Gets a list of addresses to which a stream is open
     *
     * @param walletProvider - The wallet provider to start the pool from.
     * @returns A JSON string containing the account details or error message
     */
    queryStreams(walletProvider: EvmWalletProvider): Promise<string>;
    /**
     * Checks if the Superfluid action provider supports the given network.
     *
     * @param network - The network to check.
     * @returns True if the Superfluid action provider supports the network, false otherwise.
     */
    supportsNetwork: (network: Network) => boolean;
}
export declare const superfluidQueryActionProvider: () => SuperfluidQueryActionProvider;
export {};
