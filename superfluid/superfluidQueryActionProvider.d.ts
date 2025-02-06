import { ActionProvider, EvmWalletProvider, Network } from "@coinbase/agentkit";
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
