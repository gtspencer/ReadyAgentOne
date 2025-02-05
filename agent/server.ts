import express, { Express, Request, Response } from 'express';
import { startAgent, handleMessage } from './chatbot';
import cors from 'cors';
import dotenv from "dotenv";
import { WebSocketServer } from 'ws';

dotenv.config();

const app = express();


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
    // if response is not of the shape {text: string, action: string} wrap it in an object
    var output: { text: string, action?: string } = {} as { text: string, action?: string };
    if (typeof agentOutput === 'string') {
        output = { text: agentOutput, action: undefined };
    }
    else {
        output = agentOutput as { text: string, action?: string };
    }

    var response = output.text;
    var action = output.action;

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

// Start the server
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    startAgent().then(() => console.log(`Agent started`));
});