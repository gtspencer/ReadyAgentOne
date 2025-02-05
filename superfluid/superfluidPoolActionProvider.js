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
exports.superfluidPoolActionProvider = exports.SuperfluidPoolActionProvider = void 0;
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
const constants_1 = require("./constants");
const viem_1 = require("viem");
const agentkit_1 = require("@coinbase/agentkit");
/**
 * SuperfluidPoolActionProvider is an action provider for Superfluid interactions.
 */
class SuperfluidPoolActionProvider extends agentkit_1.ActionProvider {
    /**
     * Constructor for the SuperfluidPoolActionProvider class.
     */
    constructor() {
        super("superfluid-pool", []);
        /**
         * Checks if the Superfluid action provider supports the given network.
         *
         * @param network - The network to check.
         * @returns True if the Superfluid action provider supports the network, false otherwise.
         */
        this.supportsNetwork = (network) => network.protocolFamily === "evm";
    }
    /**
     * Creates a pool from the agent wallet to the recipient
     *
     * @param walletProvider - The wallet provider to start the pool from.
     * @param args - The input arguments for the action.
     * @returns A JSON string containing the account details or error message
     */
    async createPool(walletProvider, args) {
        try {
            const data = (0, viem_1.encodeFunctionData)({
                abi: constants_1.GDAv1ForwarderABI,
                functionName: "createPool",
                args: [args.erc20TokenAddress, walletProvider.getAddress(), {
                        transferabilityForUnitsOwner: false,
                        distributionFromAnyAddress: false,
                    }],
            });
            const hash = await walletProvider.sendTransaction({
                to: constants_1.GDAv1ForwarderAddress,
                data,
            });
            const receipt = await walletProvider.waitForTransactionReceipt(hash);
            const [success, poolAddress] = receipt.events.find((e) => e.event === 'PoolCreated').args;
            // todo store this poolAddress is memory so we can manipulate it later (we don't trust the llm to remember...)
            return `Created pool of token ${args.erc20TokenAddress} at ${poolAddress}`;
        }
        catch (error) {
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
    async updatePool(walletProvider, args) {
        try {
            const data = (0, viem_1.encodeFunctionData)({
                abi: constants_1.GDAv1ForwarderABI,
                functionName: "updateMemberUnits",
                args: [args.poolAddress, args.recipientAddress, BigInt(args.units), "0x"],
            });
            const hash = await walletProvider.sendTransaction({
                to: constants_1.GDAv1ForwarderAddress,
                data,
            });
            const receipt = await walletProvider.waitForTransactionReceipt(hash);
            return `Updated member units of pool ${args.poolAddress} for member ${args.recipientAddress}, with new member units ${args.units}`;
        }
        catch (error) {
            return `Error creating Superfluid pool: ${error}`;
        }
    }
}
exports.SuperfluidPoolActionProvider = SuperfluidPoolActionProvider;
__decorate([
    (0, agentkit_1.CreateAction)({
        name: "create_pool",
        description: `
This tool will create a Superfluid pool for a desired token on an EVM network.
It takes the ERC20 token address to create a pool of the tokens to later be multi streamed to other wallets.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
        schema: schemas_1.SuperfluidCreatePoolSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agentkit_1.EvmWalletProvider, void 0]),
    __metadata("design:returntype", Promise)
], SuperfluidPoolActionProvider.prototype, "createPool", null);
__decorate([
    (0, agentkit_1.CreateAction)({
        name: "update_pool",
        description: `
This tool will update a Superfluid pool for a desired token on an EVM network.
The pool must already have been created; this action merely updates the flow for a member of the pool.
It takes the EVM address of the token pool contract that was created.
Do not use the ERC20 address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
        schema: schemas_1.SuperfluidUpdatePoolSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agentkit_1.EvmWalletProvider, void 0]),
    __metadata("design:returntype", Promise)
], SuperfluidPoolActionProvider.prototype, "updatePool", null);
const superfluidPoolActionProvider = () => new SuperfluidPoolActionProvider();
exports.superfluidPoolActionProvider = superfluidPoolActionProvider;
