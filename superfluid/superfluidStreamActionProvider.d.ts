import { z } from "zod";
import { SuperfluidCreateStreamSchema, SuperfluidDeleteStreamSchema } from "./schemas";
import { ActionProvider, EvmWalletProvider, Network } from "@coinbase/agentkit";
/**
 * SuperfluidStreamActionProvider is an action provider for Superfluid interactions.
 */
export declare class SuperfluidStreamActionProvider extends ActionProvider<EvmWalletProvider> {
    /**
     * Constructor for the SuperfluidStreamActionProvider class.
     */
    constructor();
    /**
     * Gets the link to the Superfluid dashboard pertaining to the stream
     */
    getStreamLink: (network: Network, tokenAddress: string, senderAddress: string, recipientAddress: string) => string;
    /**
     * Creates a stream from the agent wallet to the recipient
     *
     * @param walletProvider - The wallet provider to start the stream from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    createStream(walletProvider: EvmWalletProvider, args: z.infer<typeof SuperfluidCreateStreamSchema>): Promise<string>;
    /**
     * Updates a stream from the agent wallet to the recipient
     *
     * @param walletProvider - The wallet provider to start the stream from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    updateStream(walletProvider: EvmWalletProvider, args: z.infer<typeof SuperfluidCreateStreamSchema>): Promise<string>;
    /**
     * Deletes a stream from the agent wallet to the recipient
     *
     * @param walletProvider - The wallet provider to start the stream from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    deleteStream(walletProvider: EvmWalletProvider, args: z.infer<typeof SuperfluidDeleteStreamSchema>): Promise<string>;
    /**
     * Checks if the Superfluid action provider supports the given network.
     *
     * @param network - The network to check.
     * @returns True if the Superfluid action provider supports the network, false otherwise.
     */
    supportsNetwork: (network: Network) => boolean;
}
export declare const superfluidStreamActionProvider: () => SuperfluidStreamActionProvider;
