import { WorldTick, EventName } from "./types/shared-types";
type EventCallback = (eventData: object) => void;
/**
 * Method to set WorldTick callback
 */
export declare function setOnWorldTickCallback(callback: (message: WorldTick) => void): void;
/**
 * A method to register event actions, either specified in types or custom
 */
export declare function registerEventAction(eventName: EventName, callback: EventCallback): void;
/**
 * Parses the message
 * Returns true if this message is a World or Event message, false otherwise
 * Handles callback invocation if we have any events registered
 */
export declare function tryParseWorldMessage(json: any): boolean;
export {};
