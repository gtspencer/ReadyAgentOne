declare global {
    var agent: any;
    var config: any;
}
export declare function handleMessage(userMessage: any): Promise<string>;
/**
 * Start the chatbot agent
 */
export declare function startAgent(): Promise<void>;
