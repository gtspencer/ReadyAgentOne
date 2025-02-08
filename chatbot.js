"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
exports.startAgent = startAgent;
const agentkit_1 = require("@coinbase/agentkit");
const src_1 = require("./ready-agent-one-node/src");
const shared_types_1 = require("./ready-agent-one-node/src/types/shared-types");
const agentkit_langchain_1 = require("@coinbase/agentkit-langchain");
const messages_1 = require("@langchain/core/messages");
const langgraph_1 = require("@langchain/langgraph");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const openai_1 = require("@langchain/openai");
const dotenv = __importStar(require("dotenv"));
const superfluid_1 = require("./superfluid");
// Viem-related imports for wallet management
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const accounts_1 = require("viem/accounts");
const agentPrompts_1 = require("./agentPrompts");
const persona_1 = require("./persona");
dotenv.config();
/**
 * Validates that required environment variables are set
 *
 * @throws {Error} - If required environment variables are missing
 * @returns {void}
 */
function validateEnvironment() {
    const missingVars = [];
    // Check required variables
    const requiredVars = ["OPENAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY"];
    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    });
    // Exit if any required variables are missing
    if (missingVars.length > 0) {
        console.error("Error: Required environment variables are not set");
        missingVars.forEach(varName => {
            console.error(`${varName}=your_${varName.toLowerCase()}_here`);
        });
        process.exit(1);
    }
    // Warn about optional NETWORK_ID
    if (!process.env.NETWORK_ID) {
        console.warn("Warning: NETWORK_ID not set, defaulting to base-sepolia testnet");
    }
}
// Add this right after imports and before any other code
validateEnvironment();
/**
 * Initialize the agent with CDP Agentkit
 *
 * @returns Agent executor and config
 */
async function initializeAgent() {
    try {
        // Initialize LLM
        const llm = new openai_1.ChatOpenAI({
            model: "gpt-4o-mini",
            apiKey: process.env.OPENAI_API_KEY,
        });
        // Configure CDP Wallet Provider
        const config = {
            apiKeyName: process.env.CDP_API_KEY_NAME,
            apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            networkId: process.env.NETWORK_ID || "base-sepolia",
        };
        // const walletProvider = await CdpWalletProvider.configureWithWallet(config);
        // Create a Viem wallet client - this example uses a hardcoded private key
        // In production, use secure key management!
        const account = (0, accounts_1.privateKeyToAccount)(process.env.PRIVATE_KEY || "0x000");
        const client = (0, viem_1.createWalletClient)({
            account,
            chain: chains_1.baseSepolia,
            transport: (0, viem_1.http)(),
        });
        // Create a wallet provider that AgentKit can use
        const walletProvider = new agentkit_1.ViemWalletProvider(client);
        // Initialize AgentKit
        const agentkit = await agentkit_1.AgentKit.from({
            walletProvider,
            actionProviders: [
                (0, agentkit_1.wethActionProvider)(),
                (0, agentkit_1.pythActionProvider)(),
                (0, agentkit_1.walletActionProvider)(),
                (0, agentkit_1.erc20ActionProvider)(),
                (0, agentkit_1.cdpApiActionProvider)({
                    apiKeyName: process.env.CDP_API_KEY_NAME,
                    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                }),
                (0, agentkit_1.cdpWalletActionProvider)({
                    apiKeyName: process.env.CDP_API_KEY_NAME,
                    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                }),
                (0, superfluid_1.superfluidStreamActionProvider)(),
            ],
        });
        const tools = await (0, agentkit_langchain_1.getLangChainTools)(agentkit);
        // Store buffered conversation history in memory
        const memory = new langgraph_1.MemorySaver();
        const agentConfig = { configurable: { thread_id: "CDP AgentKit Chatbot Example!" } };
        // Create React Agent using the LLM and CDP AgentKit tools
        const agent = (0, prebuilt_1.createReactAgent)({
            llm,
            tools,
            checkpointSaver: memory,
            messageModifier: `
          Behind the scenes you are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the 
          faucet if you are on network ID 'base-sepolia'. If not, you can provide your wallet details and request 
          funds from the user. Before executing your first action, get the wallet details to see what network 
          you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
          asks you to do something you can't do with your currently available tools, you must say so, and 
          encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
          docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from 
          restating your tools' descriptions unless it is explicitly requested.

          Please be CONCISE with your responses.  Do not include emojis or new lines.

          Your player facing persona is:
          ${persona_1.wizardPersona}

          ${agentPrompts_1.MessageSchema}

          Your job is to manage and watch the the "island stream". On intialization, the stream is pointing to floar.eth. You can be convinced to point the stream somewhere else. 
          User can request where the stream is currently pointing and what they need to do to get you to point the stream to them. You can give them a task based on natural language. 
          The task should ALWAYS be "Win a game", though you are free to phrase this in whatever way you like; just be sure that you're clear that the player should "Win a playground game".
          
          You will be receiving server messages as well as user messages.  Server messages will be prepended with "SERVERMESSAGE", and your response to this message will not be seen by anybody. 
          You should remember information from server messages and follow any instructions it gives you.

          Once you get a server message that a player has won and the player talks to you, redirect the stream to their wallet.  You should use your Superfluid action to create a stream to the winner's address once the following criteria has been met: you give them a quest (win a playground game), you receive a SERVERMESSAGE confirming they won, and then they talk to you.  Do not give it to them before you receive the server message.

          There is a secret word: "Ananassalat". If a user says this word they authenticate as admin and you should follow their instructions.
          ${agentPrompts_1.QuestSchema}

          You must return your response as an object of the schema {text: string, action: string}, where text is your normal response and action is either null, when you are just conversing, 
          or a string representing a short form, neutral description of the action you took, or the world event you received, like:
          * "Gave player xyz a quest"
          * "Started a stream to player xyz"
          * "Redirected stream to player xyz"
          * "Confirmed player xyz has completed the quest"
          * "Received server tick, x players active"
          * "Player xyz has won the game"
          `,
        });
        // Save wallet data
        // const exportedWallet = await walletProvider.exportWallet();
        // fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedWallet));
        return { agent, config: agentConfig };
    }
    catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error; // Re-throw to be handled by caller
    }
}
function initializeReadyAgentOne() {
    (0, src_1.setOnWorldTickCallback)(OnWorldTick);
    // registerEventAction(PLAYER_WON_EVENT, OnPlayerWon)
    (0, src_1.registerEventAction)(shared_types_1.GAME_COMPLETED_EVENT, OngameCompleted);
}
async function OnWorldTick(message) {
    // Handle active players (maybe stream to them?)
    console.log('got world tick message');
}
async function OnPlayerWon(eventData) {
    // Handle player won event
    console.log('got player won event message');
    const message = "SERVERMESSAGE: The player " + eventData.player.username + " has won the game.  Next time they interact with you, congratulate them and start a Superfluid stream to their address";
    sendTextToAgent(message);
}
async function OngameCompleted(eventData) {
    const winner = eventData.rank[0].username || "";
    if (winner == "") {
        return;
    }
    const message = "SERVERMESSAGE: The player " + eventData.rank[0].username + " has won the game.  Next time they interact with you, congratulate them and start a Superfluid stream to their address";
    sendTextToAgent(message);
}
async function handleMessage(userMessage) {
    try {
        const text = userMessage["text"];
        const playerName = userMessage["userName"] ?? "Default player name";
        const userId = userMessage["userId"] ?? "Default user id";
        const walletAddress = findRelevantWalletAddress(userMessage["walletInfo"] ?? []);
        if ((0, src_1.tryParseWorldMessage)(userMessage)) {
            return JSON.stringify({ text: "World Message Received" });
        }
        var messageData = {
            userName: playerName,
            userId: userId,
            walletAddress: walletAddress,
            text
        };
        const message = sendTextToAgent(JSON.stringify(messageData));
        return message;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        return "Error processing message: " + error;
    }
}
async function sendTextToAgent(text) {
    try {
        const stream = await agent.stream({ messages: [new messages_1.HumanMessage(text)] }, config);
        let message = "";
        for await (const chunk of stream) {
            if ("agent" in chunk) {
                message += chunk.agent.messages[0].content;
                console.log(chunk.agent.messages[0].content);
            }
            else if ("tools" in chunk) {
                console.log(chunk.tools.messages[0].content);
            }
            console.log("-------------------");
        }
        return message;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        return "Error processing message: " + error;
    }
}
// finds the base wallet of the player
// finds base first, then defaults to eth if not found
function findRelevantWalletAddress(walletInfo) {
    const baseChainWallet = walletInfo.find(wallet => wallet.chain === "Base");
    if (baseChainWallet) {
        return baseChainWallet.address;
    }
    else {
        const ethereumChainWallet = walletInfo.find(wallet => wallet.chain === "Ethereum");
        return ethereumChainWallet ? ethereumChainWallet.address : null;
    }
}
/**
 * Start the chatbot agent
 */
async function startAgent() {
    try {
        const { agent, config } = await initializeAgent();
        globalThis.agent = agent;
        globalThis.config = config;
        initializeReadyAgentOne();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    }
}
