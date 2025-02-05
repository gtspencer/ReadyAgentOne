"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const viem_1 = require("viem");
const constants_1 = require("./constants");
const superfluidPoolActionProvider_1 = require("./superfluidPoolActionProvider");
describe("SuperfluidPoolActionProvider", () => {
    const MOCK_ADDRESS = "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83";
    const MOCK_ERC20_CONTRACT = "0x1234567890123456789012345678901234567890";
    const MOCK_CHAIN_ID = "8453";
    let mockWallet;
    const actionProvider = (0, superfluidPoolActionProvider_1.superfluidPoolActionProvider)();
    beforeEach(() => {
        mockWallet = {
            getAddress: jest.fn().mockReturnValue(MOCK_ADDRESS),
            getNetwork: jest.fn().mockReturnValue({ protocolFamily: "evm" }),
            sendTransaction: jest.fn(),
            waitForTransactionReceipt: jest.fn(),
            readContract: jest.fn(),
            call: jest.fn(),
        };
        mockWallet.sendTransaction.mockResolvedValue("0xmockhash");
        mockWallet.waitForTransactionReceipt.mockResolvedValue({});
    });
    describe("create pool", () => {
        it("should successfully create a superfluid pool", async () => {
            const args = {
                erc20TokenAddress: MOCK_ERC20_CONTRACT,
                chainId: MOCK_CHAIN_ID,
            };
            const response = await actionProvider.createPool(mockWallet, args);
            expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
                to: constants_1.GDAv1ForwarderAddress,
                data: (0, viem_1.encodeFunctionData)({
                    abi: constants_1.GDAv1ForwarderABI,
                    functionName: "createPool",
                    args: [MOCK_ERC20_CONTRACT, MOCK_ADDRESS, { transferabilityForUnitsOwner: false, distributionFromAnyAddress: false }],
                }),
            });
            expect(mockWallet.waitForTransactionReceipt).toHaveBeenCalledWith("0xmockhash");
        });
        it("should handle pool creation errors", async () => {
            const error = new Error("Pool creation failed");
            mockWallet.sendTransaction.mockRejectedValue(error);
            const args = {
                erc20TokenAddress: MOCK_ERC20_CONTRACT,
                chainId: MOCK_CHAIN_ID,
            };
            const response = await actionProvider.createPool(mockWallet, args);
            expect(response).toBe(`Error creating Superfluid pool: ${error}`);
        });
    });
    describe("supportsNetwork", () => {
        it("should return true for EVM networks", () => {
            const result = actionProvider.supportsNetwork({ protocolFamily: "evm", networkId: "any" });
            expect(result).toBe(true);
        });
        it("should return false for non-EVM networks", () => {
            const result = actionProvider.supportsNetwork({
                protocolFamily: "bitcoin",
                networkId: "any",
            });
            expect(result).toBe(false);
        });
    });
});
