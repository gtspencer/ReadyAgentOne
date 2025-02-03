import express, { Express, Request, Response } from 'express';
import { startAgent, handleMessage } from './chatbot';

import dotenv from "dotenv";

dotenv.config();

const app = express();

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

    var response = await handleMessage(data);
    console.log('Agent response: ' + response)

    var action = inferAction(response);
    console.log('Inferred action: ' + action)

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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    startAgent().then(() => console.log(`Agent started`));
});
