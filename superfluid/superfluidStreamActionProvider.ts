import { z } from "zod";
import {
  SuperfluidCreateStreamSchema,
  SuperfluidDeleteStreamSchema
} from "./schemas";
import {
  CFAv1ForwarderAddress,
  CFAv1ForwarderABI,
} from "./constants";
import { encodeFunctionData, Hex } from "viem";
import {
  ActionProvider,
  CreateAction,
  EvmWalletProvider,
  Network } from "@coinbase/agentkit";


const tokenAddress = "0x7635356D54d8aF3984a5734C2bE9e25e9aBC2ebC";
const flowRate = 10;

let lastFlow = "0x6D8dEC3fD68D94a7189A98346EA52B4D32e00012"

/**
 * SuperfluidStreamActionProvider is an action provider for Superfluid interactions.
 */
export class SuperfluidStreamActionProvider extends ActionProvider<EvmWalletProvider> {

  /**
   * Constructor for the SuperfluidStreamActionProvider class.
   */
  constructor() {
    super("superfluid-stream", []);

  }

  /**
   * Gets the link to the Superfluid dashboard pertaining to the stream
   */
  getStreamLink = (network: Network, tokenAddress: string, senderAddress: string, recipientAddress: string) => {
    return `https://app.superfluid.finance/stream/${network.networkId}/${senderAddress}-${recipientAddress}-${tokenAddress}`
  }

  /**
   * Creates a stream from the agent wallet to the recipient
   *
   * @param walletProvider - The wallet provider to start the stream from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "create_stream",
    description: `
This tool will create a Superfluid stream for a desired token on an EVM network.
It takes the a recipient address to create a Superfluid stream to that address.
Superfluid will then start streaming the token to the recipient.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: SuperfluidCreateStreamSchema,
  })
  async createStream(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidCreateStreamSchema>
  ): Promise<string> {
    try {

      if (lastFlow.toLowerCase() == args.recipientAddress.toLowerCase()) {
        return `This recipient already has the stream`;
      }

      try {
        await this.deleteStream(walletProvider, {recipientAddress: lastFlow })
      } catch {
        
      }
      

      const data = encodeFunctionData({
        abi: CFAv1ForwarderABI,
        functionName: "createFlow",
        args: [tokenAddress as Hex, walletProvider.getAddress() as Hex, args.recipientAddress as Hex, BigInt(flowRate), "0x"],
      });

      const hash = await walletProvider.sendTransaction({
        to: CFAv1ForwarderAddress as `0x${string}`,
        data,
      });


      await walletProvider.waitForTransactionReceipt(hash);

      lastFlow = args.recipientAddress;

      return `Created stream of token ${tokenAddress} to ${args.recipientAddress} at a rate of ${flowRate}.`;
    } catch (error) {
      return `Error creating Superfluid stream: ${error}`;
    }
  }

  /**
   * Updates a stream from the agent wallet to the recipient
   *
   * @param walletProvider - The wallet provider to start the stream from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "update_stream",
    description: `
This tool will update a Superfluid stream for a desired token on an EVM network.
It takes the ERC20 token address, a recipient address, and a stream rate to update a Superfluid stream.
Superfluid will then start streaming the token with the updated flow rate to the recipient.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    // schema same as create schema
    schema: SuperfluidCreateStreamSchema,
  })
  async updateStream(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidCreateStreamSchema>
  ): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: CFAv1ForwarderABI,
        functionName: "updateFlow",
        args: [tokenAddress as Hex, walletProvider.getAddress() as Hex, args.recipientAddress as Hex, BigInt(0), "0x"],
      });

      const hash = await walletProvider.sendTransaction({
        to: CFAv1ForwarderAddress as `0x${string}`,
        data,
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Updated stream of token ${tokenAddress} to ${args.recipientAddress} at a rate of ${flowRate}`;
    } catch (error) {
      return `Error creating Superfluid stream: ${error}`;
    }
  }

  /**
   * Deletes a stream from the agent wallet to the recipient
   *
   * @param walletProvider - The wallet provider to start the stream from.
   * @param args - The input arguments for the action.
   * @returns A JSON string containing the account details or error message
   */
  @CreateAction({
    name: "delete_stream",
    description: `
This tool will stop the streaming of a Superfluid ERC20 token.
It takes the ERC20 token address and a recipient address to delete a Superfluid stream, if one is present.
Superfluid will then stop streaming the token to the recipient.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: SuperfluidDeleteStreamSchema,
  })
  async deleteStream(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof SuperfluidDeleteStreamSchema>
  ): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: CFAv1ForwarderABI,
        functionName: "deleteFlow",
        args: [tokenAddress as Hex, walletProvider.getAddress() as Hex, args.recipientAddress as Hex, "0x"],
      });

      const hash = await walletProvider.sendTransaction({
        to: CFAv1ForwarderAddress as `0x${string}`,
        data,
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Stopped stream of token to ${args.recipientAddress}`;
    } catch (error) {
      return `Error creating Superfluid stream: ${error}`;
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

export const superfluidStreamActionProvider = () => new SuperfluidStreamActionProvider();
