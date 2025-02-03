import { z } from "zod";

import { encodeFunctionData, Hex } from "viem";
import { EmptySchema } from "./schemas";
import { getAccountOutflow } from "./graphQueries/superfluidGraphQueries"
import { ActionProvider, WalletProvider, CreateAction, EvmWalletProvider, Network } from "@coinbase/agentkit";


/**
 * SuperfluidQueryActionProvider is an action provider for Superfluid interactions.
 */
export class SuperfluidQueryActionProvider extends ActionProvider {

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
    @CreateAction
        ({ name: "my_action", description: "My action", schema: myActionSchema })
    async queryStreams(
        walletProvider: EvmWalletProvider,
    ): Promise<string> {
        try {

            const accountData = await getAccountOutflow(walletProvider.getAddress())
            const outflows = accountData?.data?.accounts?.length ? accountData?.data.accounts[0].outflows : [];
            const activeOutflows = outflows.filter(o => {
                return parseInt(o.currentFlowRate) > 0;
            });

            return `Current outflows are ${activeOutflows}`;
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
