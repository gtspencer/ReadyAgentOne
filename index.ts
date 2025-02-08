import express, { Express, Request, Response } from 'express';
import { startAgent, handleMessage } from './chatbot';
import cors from 'cors';
import dotenv from "dotenv";
import { WebSocketServer } from 'ws';

dotenv.config();

export const app = express();

declare global {
    var wss: any;
}

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("ReadyAgentOne Demo");
});

app.post("/readyagentone", async (req: Request, res: Response) => {
    const data = req.body;

    if (!data) {
        res.status(400).json({ message: 'Missing data in request body' });
    }

    console.log('Received data:', data);

    var agentOutput = await handleMessage(data);
    console.log('Agent response: ' + agentOutput)

    var output: { text: string, action?: string } = {} as { text: string, action?: string };    

    try {
        const parsed = JSON.parse(agentOutput);
        // Check if the parsed object has the required structure
        if (parsed && typeof parsed === 'object' && 'text' in parsed) {
            let action = "";
            if ('action' in parsed) {
                action = parsed.action
            }
            output = {
                "text": parsed.text,
                "action": parsed.action
            }; // If it's already in the correct format, return as is
        } else {
            throw new Error('Invalid format');
        }
    } catch {
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

    res.status(200).json(
        {
            text: response,
            ...(action !== '' && { action })
        }
    );
});

// used to infer actions from the agent text
// will check for keywords (eg: OPEN LOBBY START GAME) -> HOST_LOBBY
// to check if we need to append an action to the message
function inferAction(agentResponse: string): string {
    return "";
}

const wss = undefined;

// Start the server
const PORT = 3000;
export const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    startAgent().then(() => console.log(`Agent started`));

    const wss = new WebSocketServer({ server });

    globalThis.wss = wss;

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('close', () => {
            console.log('Client disconnected');
        });

        ws.on('error', (err) => {
            console.log(`Websocket error: ${err.message}`)
        })
    });


});

async function broadcast(data: any) {
    globalThis.wss.clients.forEach(async (client) => {
        if (client.readyState === client.OPEN) {
            const temp = await JSON.stringify(data);
            console.log('Broadcast client data:')
            console.log(temp)
            client.send(temp);
        }
    });
}

// WebSocket server setup