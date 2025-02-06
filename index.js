"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const chatbot_1 = require("./chatbot");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = require("ws");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
exports.app.use(express_1.default.json());
exports.app.get("/", (req, res) => {
    res.send("ReadyAgentOne Demo");
});
exports.app.post("/readyagentone", async (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(400).json({ message: 'Missing data in request body' });
    }
    console.log('Received data:', data);
    var agentOutput = await (0, chatbot_1.handleMessage)(data);
    console.log('Agent response: ' + agentOutput);
    const parsed = JSON.parse(agentOutput);
    var output = {};
    try {
        // Check if the parsed object has the required structure
        if (parsed && typeof parsed === 'object' && 'text' in parsed && 'action' in parsed) {
            output = parsed; // If it's already in the correct format, return as is
        }
        else {
            throw new Error('Invalid format');
        }
    }
    catch {
        output = { text: agentOutput, action: undefined };
    }
    // // if response is not of the shape {text: string, action: string} wrap it in an object
    // var output: { text: string, action?: string } = {} as { text: string, action?: string };
    // if (typeof agentOutput === 'string') {
    //     output = { text: agentOutput, action: undefined };
    // }
    // else {
    //     output = agentOutput as { text: string, action?: string };
    // }
    var response = output.text;
    var action = output.action;
    broadcast({ action });
    res.status(200).json({
        text: response,
        ...(action !== '' && { action })
    });
});
// used to infer actions from the agent text
// will check for keywords (eg: OPEN LOBBY START GAME) -> HOST_LOBBY
// to check if we need to append an action to the message
function inferAction(agentResponse) {
    return "";
}
const wss = undefined;
// Start the server
const PORT = 3000;
exports.server = exports.app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    (0, chatbot_1.startAgent)().then(() => console.log(`Agent started`));
    const wss = new ws_1.WebSocketServer({ server: exports.server });
    globalThis.wss = wss;
    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('close', () => {
            console.log('Client disconnected');
        });
        ws.on('error', (err) => {
            console.log(`Websocket error: ${err.message}`);
        });
    });
});
async function broadcast(data) {
    globalThis.wss.clients.forEach(async (client) => {
        if (client.readyState === client.OPEN) {
            const temp = await JSON.stringify(data);
            console.log('Broadcast client data:');
            console.log(temp);
            client.send(temp);
        }
    });
}
// WebSocket server setup
