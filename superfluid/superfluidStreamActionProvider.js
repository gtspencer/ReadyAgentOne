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
exports.superfluidStreamActionProvider = exports.SuperfluidStreamActionProvider = void 0;
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
const constants_1 = require("./constants");
const viem_1 = require("viem");
const agentkit_1 = require("@coinbase/agentkit");
const tokenAddress = "0x7635356D54d8aF3984a5734C2bE9e25e9aBC2ebC";
const flowRate = 10;
/**
 * SuperfluidStreamActionProvider is an action provider for Superfluid interactions.
 */
class SuperfluidStreamActionProvider extends agentkit_1.ActionProvider {
    /**
     * Constructor for the SuperfluidStreamActionProvider class.
     */
    constructor() {
        super("superfluid-stream", []);
        /**
         * Gets the link to the Superfluid dashboard pertaining to the stream
         */
        this.getStreamLink = (network, tokenAddress, senderAddress, recipientAddress) => {
            return `https://app.superfluid.finance/stream/${network.networkId}/${senderAddress}-${recipientAddress}-${tokenAddress}`;
        };
        /**
         * Checks if the Superfluid action provider supports the given network.
         *
         * @param network - The network to check.
         * @returns True if the Superfluid action provider supports the network, false otherwise.
         */
        this.supportsNetwork = (network) => network.protocolFamily === "evm";
    }
    /**
     * Creates a stream from the agent wallet to the recipient
     *
     * @param walletProvider - The wallet provider to start the stream from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    async createStream(walletProvider, args) {
        try {
            const data = (0, viem_1.encodeFunctionData)({
                abi: constants_1.CFAv1ForwarderABI,
                functionName: "createFlow",
                args: [tokenAddress, walletProvider.getAddress(), args.recipientAddress, BigInt(flowRate), "0x"],
            });
            const hash = await walletProvider.sendTransaction({
                to: constants_1.CFAv1ForwarderAddress,
                data,
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Created stream of token ${tokenAddress} to ${args.recipientAddress} at a rate of ${flowRate}. The link to the stream is ${this.getStreamLink(walletProvider.getNetwork(), tokenAddress, walletProvider.getAddress(), args.recipientAddress)}`;
        }
        catch (error) {
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
    async updateStream(walletProvider, args) {
        try {
            const data = (0, viem_1.encodeFunctionData)({
                abi: constants_1.CFAv1ForwarderABI,
                functionName: "updateFlow",
                args: [tokenAddress, walletProvider.getAddress(), args.recipientAddress, BigInt(0), "0x"],
            });
            const hash = await walletProvider.sendTransaction({
                to: constants_1.CFAv1ForwarderAddress,
                data,
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Updated stream of token ${tokenAddress} to ${args.recipientAddress} at a rate of ${flowRate}`;
        }
        catch (error) {
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
    async deleteStream(walletProvider, args) {
        try {
            const data = (0, viem_1.encodeFunctionData)({
                abi: constants_1.CFAv1ForwarderABI,
                functionName: "deleteFlow",
                args: [args.erc20TokenAddress, walletProvider.getAddress(), args.recipientAddress, "0x"],
            });
            const hash = await walletProvider.sendTransaction({
                to: constants_1.CFAv1ForwarderAddress,
                data,
            });
            await walletProvider.waitForTransactionReceipt(hash);
            return `Stopped stream of token ${args.erc20TokenAddress} to ${args.recipientAddress}`;
        }
        catch (error) {
            return `Error creating Superfluid stream: ${error}`;
        }
    }
}
exports.SuperfluidStreamActionProvider = SuperfluidStreamActionProvider;
__decorate([
    (0, agentkit_1.CreateAction)({
        name: "create_stream",
        description: `
This tool will create a Superfluid stream for a desired token on an EVM network.
It takes the a recipient address to create a Superfluid stream to that address.
Superfluid will then start streaming the token to the recipient.
Before starting a new superfluid stream, you should use your query tool to check if you have any open streams.
If you do, then delete that stream first, then open the new one.  
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
        schema: schemas_1.SuperfluidCreateStreamSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agentkit_1.EvmWalletProvider, void 0]),
    __metadata("design:returntype", Promise)
], SuperfluidStreamActionProvider.prototype, "createStream", null);
__decorate([
    (0, agentkit_1.CreateAction)({
        name: "update_stream",
        description: `
This tool will update a Superfluid stream for a desired token on an EVM network.
It takes the ERC20 token address, a recipient address, and a stream rate to update a Superfluid stream.
Superfluid will then start streaming the token with the updated flow rate to the recipient.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
        // schema same as create schema
        schema: schemas_1.SuperfluidCreateStreamSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agentkit_1.EvmWalletProvider, void 0]),
    __metadata("design:returntype", Promise)
], SuperfluidStreamActionProvider.prototype, "updateStream", null);
__decorate([
    (0, agentkit_1.CreateAction)({
        name: "delete_stream",
        description: `
This tool will stop the streaming of a Superfluid ERC20 token.
It takes the ERC20 token address and a recipient address to delete a Superfluid stream, if one is present.
Superfluid will then stop streaming the token to the recipient.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
        schema: schemas_1.SuperfluidDeleteStreamSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agentkit_1.EvmWalletProvider, void 0]),
    __metadata("design:returntype", Promise)
], SuperfluidStreamActionProvider.prototype, "deleteStream", null);
const superfluidStreamActionProvider = () => new SuperfluidStreamActionProvider();
exports.superfluidStreamActionProvider = superfluidStreamActionProvider;
