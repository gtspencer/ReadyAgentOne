import { WorldTickMessage, WorldEvent, GameMessage, EventName } from "./types/shared-types";

type EventCallback = (eventData: object) => void;
const actionMappings: Record<EventName, EventCallback[]> = {
    PLAYER_ENTER: [],
    PLAYER_EXIT: [],
    PLAYER_WON: [],
};

let onWorldTick: (message: WorldTickMessage) => void = () => { };

export function setOnWorldTickCallback(callback: (message: WorldTickMessage) => void) {
    onWorldTick = callback;
}

export function registerEventAction(eventName: EventName, callback: EventCallback) {
    if (!actionMappings[eventName]) {
        actionMappings[eventName] = [];
    }
    actionMappings[eventName].push(callback);
}

export function parseInstruction(json: any): json is GameMessage {
    if (typeof json !== "object" || json === null) return false;

    if (json.text === "WORLD_TICK") {
        if (
            !Array.isArray(json.players) ||
            !json.players.every((player: { userId: string; username: string }) =>
                typeof player.userId === "string" && typeof player.username === "string")
        ) {
            return false;
        }
        onWorldTick(json as WorldTickMessage);
        return true;
    }

    if (json.text === "WORLD_EVENT") {
        if (typeof json.event !== "string" || typeof json.eventData !== "object") {
            return false;
        }

        const eventName = json.event as EventName;
        if (eventName in actionMappings) {
            actionMappings[eventName].forEach(callback => callback(json.eventData));
            return true;
        }
    }

    return false;
}