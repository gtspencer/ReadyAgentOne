"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptySchema = exports.SuperfluidUpdatePoolSchema = exports.SuperfluidCreatePoolSchema = exports.SuperfluidDeleteStreamSchema = exports.SuperfluidCreateStreamSchema = void 0;
const zod_1 = require("zod");
/**
 * Input schema for creating a Superfluid stream
 */
exports.SuperfluidCreateStreamSchema = zod_1.z
    .object({
    recipientAddress: zod_1.z.string().describe("The EVM address to stream the token to."),
})
    .strip()
    .describe("Input schema for creating or updating a Superfluid stream");
/**
* Input schema for deleting a Superfluid stream
*/
exports.SuperfluidDeleteStreamSchema = zod_1.z
    .object({
    erc20TokenAddress: zod_1.z.string().describe("The ERC20 token to start streaming"),
    chainId: zod_1.z.string().describe("The EVM chain ID on which the ERC20 is deployed"),
    recipientAddress: zod_1.z.string().describe("The EVM address to stream the token to."),
})
    .strip()
    .describe("Input schema for creating a Superfluid stream");
/**
* Input schema for creating a Superfluid pool
*/
exports.SuperfluidCreatePoolSchema = zod_1.z
    .object({
    erc20TokenAddress: zod_1.z.string().describe("The ERC20 token for which to create a pool"),
    chainId: zod_1.z.string().describe("The EVM chain ID on which the ERC20 is deployed"),
})
    .strip()
    .describe("Input schema for creating a Superfluid pool");
/**
* Input schema for updating a Superfluid pool
*/
exports.SuperfluidUpdatePoolSchema = zod_1.z
    .object({
    poolAddress: zod_1.z.string().describe("The EVM address of the token pool"),
    recipientAddress: zod_1.z.string().describe("The EVM address to stream the token to, from the pool."),
    chainId: zod_1.z.string().describe("The EVM chain ID on which the pool is deployed"),
    units: zod_1.z.number().describe("The new units of the recipient in the pool."),
})
    .strip()
    .describe("Input schema for updating a Superfluid pool");
/**
* Empty input schema
*/
exports.EmptySchema = zod_1.z
    .object({})
    .strip()
    .describe("Empty input schema");
