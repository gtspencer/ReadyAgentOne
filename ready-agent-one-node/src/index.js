"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOnWorldTickCallback = setOnWorldTickCallback;
exports.registerEventAction = registerEventAction;
exports.tryParseWorldMessage = tryParseWorldMessage;
const actionMappings = {
    PLAYER_ENTER: [],
    PLAYER_EXIT: [],
    PLAYER_WON: [],
};
/**
 * A callback that gets invoked whenever the agent receives a WorldTick
 */
let onWorldTick = (message) => { };
/**
 * Method to set WorldTick callback
 */
function setOnWorldTickCallback(callback) {
    onWorldTick = callback;
}
/**
 * A method to register event actions, either specified in types or custom
 */
function registerEventAction(eventName, callback) {
    if (!actionMappings[eventName]) {
        actionMappings[eventName] = [];
    }
    actionMappings[eventName].push(callback);
}
/**
 * Parses the message
 * Returns true if this message is a World or Event message, false otherwise
 * Handles callback invocation if we have any events registered
 */
function tryParseWorldMessage(json) {
    if (typeof json !== "object" || json === null)
        return false;
    if (json.text === "WORLD_TICK") {
        if (!Array.isArray(json.players) ||
            !json.players.every((player) => typeof player.userId === "string" && typeof player.username === "string")) {
            return false;
        }
        onWorldTick(json);
        return true;
    }
    if (json.text === "WORLD_EVENT") {
        if (typeof json.event !== "string" || typeof json.eventData !== "object") {
            return false;
        }
        const eventName = json.event;
        if (eventName in actionMappings) {
            actionMappings[eventName].forEach(callback => callback(json.eventData));
            return true;
        }
    }
    return false;
}
