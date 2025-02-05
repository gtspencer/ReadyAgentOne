import { z } from "zod";
import { SuperfluidCreatePoolSchema, SuperfluidUpdatePoolSchema } from "./schemas";
import { ActionProvider, EvmWalletProvider, Network } from "@coinbase/agentkit";
/**
 * SuperfluidPoolActionProvider is an action provider for Superfluid interactions.
 */
export declare class SuperfluidPoolActionProvider extends ActionProvider<EvmWalletProvider> {
    /**
     * Constructor for the SuperfluidPoolActionProvider class.
     */
    constructor();
    /**
     * Creates a pool from the agent wallet to the recipient
     *
     * @param walletProvider - The wallet provider to start the pool from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    createPool(walletProvider: EvmWalletProvider, args: z.infer<typeof SuperfluidCreatePoolSchema>): Promise<string>;
    /**
     * Updates member units for a pool
     *
     * @param walletProvider - The wallet provider to start the pool from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    updatePool(walletProvider: EvmWalletProvider, args: z.infer<typeof SuperfluidUpdatePoolSchema>): Promise<string>;
    /**
     * Checks if the Superfluid action provider supports the given network.
     *
     * @param network - The network to check.
     * @returns True if the Superfluid action provider supports the network, false otherwise.
     */
    supportsNetwork: (network: Network) => boolean;
}
export declare const superfluidPoolActionProvider: () => SuperfluidPoolActionProvider;
