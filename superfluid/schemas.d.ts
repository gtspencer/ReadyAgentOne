import { z } from "zod";
/**
 * Input schema for creating a Superfluid stream
 */
export declare const SuperfluidCreateStreamSchema: z.ZodObject<{
    recipientAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    recipientAddress: string;
}, {
    recipientAddress: string;
}>;
/**
* Input schema for deleting a Superfluid stream
*/
export declare const SuperfluidDeleteStreamSchema: z.ZodObject<{
    recipientAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    recipientAddress: string;
}, {
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
    recipientAddress: string;
    chainId: string;
    poolAddress: string;
    units: number;
}, {
    recipientAddress: string;
    chainId: string;
    poolAddress: string;
    units: number;
}>;
/**
* Empty input schema
*/
export declare const EmptySchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
