import { z } from "zod";
import { 
  SuperfluidCreatePoolSchema,
  SuperfluidUpdatePoolSchema
} from "./schemas";
import {
  GDAv1ForwarderAddress,
  GDAv1ForwarderABI
} from "./constants";
import { encodeFunctionData, Hex } from "viem";
import {
  ActionProvider,
  CreateAction,
  EvmWalletProvider,
  Network
} from "@coinbase/agentkit";


/**
 * SuperfluidPoolActionProvider is an action provider for Superfluid interactions.
 */
export class SuperfluidPoolActionProvider extends ActionProvider<EvmWalletProvider> {

  /**
   * Constructor for the SuperfluidPoolActionProvider class.
   */
  constructor() {
    super("superfluid-pool", []);

  }

  /**
   * Creates a pool from the agent wallet to the recipient
   *
   * @param walletProvider - The wallet provider to start the pool from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "create_pool",
    description: `
This tool will create a Superfluid pool for a desired token on an EVM network.
It takes the ERC20 token address to create a pool of the tokens to later be multi streamed to other wallets.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: SuperfluidCreatePoolSchema,
  })
  async createPool(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidCreatePoolSchema>
  ): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: GDAv1ForwarderABI,
        functionName: "createPool",
        args: [args.erc20TokenAddress as Hex, walletProvider.getAddress() as Hex, {
          transferabilityForUnitsOwner: false,
          distributionFromAnyAddress: false,
        }],
      });

      const hash = await walletProvider.sendTransaction({
        to: GDAv1ForwarderAddress as `0x${string}`,
        data,
      });

      const receipt = await walletProvider.waitForTransactionReceipt(hash);
      const [success, poolAddress] = receipt.events.find((e: { event: string; }) => e.event === 'PoolCreated').args;

      // todo store this poolAddress is memory so we can manipulate it later (we don't trust the llm to remember...)
      return `Created pool of token ${args.erc20TokenAddress} at ${poolAddress}`;
    } catch (error) {
      return `Error creating Superfluid pool: ${error}`;
    }
  }

  /**
   * Updates member units for a pool
   *
   * @param walletProvider - The wallet provider to start the pool from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "update_pool",
    description: `
This tool will update a Superfluid pool for a desired token on an EVM network.
The pool must already have been created; this action merely updates the flow for a member of the pool.
It takes the EVM address of the token pool contract that was created.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: SuperfluidUpdatePoolSchema,
  })
  async updatePool(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidUpdatePoolSchema>
  ): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: GDAv1ForwarderABI,
        functionName: "updateMemberUnits",
        args: [args.poolAddress as Hex, args.recipientAddress as Hex, BigInt(args.units), "0x"],
      });

      const hash = await walletProvider.sendTransaction({
        to: GDAv1ForwarderAddress as `0x${string}`,
        data,
      });

      const receipt = await walletProvider.waitForTransactionReceipt(hash);

      return `Updated member units of pool ${args.poolAddress} for member ${args.recipientAddress}, with new member units ${args.units}`;
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

export const superfluidPoolActionProvider = () => new SuperfluidPoolActionProvider();
