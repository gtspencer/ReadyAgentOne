export declare const app: import("express-serve-static-core").Express;
declare global {
    var wss: any;
}
export declare const server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
