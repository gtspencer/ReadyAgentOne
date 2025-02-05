import { z } from "zod";
/**
 * Input schema for creating a Superfluid stream
 */
export declare const SuperfluidCreateStreamSchema: z.ZodObject<{
    erc20TokenAddress: z.ZodString;
    chainId: z.ZodString;
    recipientAddress: z.ZodString;
    flowRate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    erc20TokenAddress: string;
    chainId: string;
    recipientAddress: string;
    flowRate: string;
}, {
    erc20TokenAddress: string;
    chainId: string;
    recipientAddress: string;
    flowRate: string;
}>;
/**
* Input schema for deleting a Superfluid stream
*/
export declare const SuperfluidDeleteStreamSchema: z.ZodObject<{
    erc20TokenAddress: z.ZodString;
    chainId: z.ZodString;
    recipientAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    erc20TokenAddress: string;
    chainId: string;
    recipientAddress: string;
}, {
    erc20TokenAddress: string;
    chainId: string;
    recipientAddress: string;
}>;
/**
* Input schema for creating a Superfluid pool
*/
export declare const SuperfluidCreatePoolSchema: z.ZodObject<{
    erc20TokenAddress: z.ZodString;
    chainId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    erc20TokenAddress: string;
    chainId: string;
}, {
    erc20TokenAddress: string;
    chainId: string;
}>;
/**
* Input schema for updating a Superfluid pool
*/
export declare const SuperfluidUpdatePoolSchema: z.ZodObject<{
    poolAddress: z.ZodString;
    recipientAddress: z.ZodString;
    chainId: z.ZodString;
    units: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    chainId: string;
    recipientAddress: string;
    poolAddress: string;
    units: number;
}, {
    chainId: string;
    recipientAddress: string;
    poolAddress: string;
    units: number;
}>;
/**
* Empty input schema
*/
export declare const EmptySchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
