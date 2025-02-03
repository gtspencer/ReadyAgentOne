export interface Player {
    userId: string;
    username: string;
}

export interface WorldTickMessage {
    text: "WORLD_TICK";
    players: Player[];
}

export const PLAYER_ENTER_EVENT = "PLAYER_ENTER";
export const PLAYER_EXIT_EVENT = "PLAYER_EXIT";
export const PLAYER_WON_EVENT = "PLAYER_WON";

export type EventName =
    | typeof PLAYER_ENTER_EVENT
    | typeof PLAYER_EXIT_EVENT
    | typeof PLAYER_WON_EVENT
    | string;

export interface WorldEventBase {
    text: "WORLD_EVENT";
    event: EventName;
    eventData: object;
}

export interface PlayerEnterEvent extends WorldEventBase {
    event: typeof PLAYER_ENTER_EVENT;
    eventData: Player;
}

export interface PlayerExitEvent extends WorldEventBase {
    event: typeof PLAYER_EXIT_EVENT;
    eventData: Player;
}

export interface PlayerWonEvent extends WorldEventBase {
    event: typeof PLAYER_WON_EVENT;
    eventData: { player: Player; score: number; game: string };
}

export interface CustomWorldEvent extends WorldEventBase {
    event: string;
    eventData: object;
}

export type WorldEvent = PlayerEnterEvent | PlayerExitEvent | PlayerWonEvent | CustomWorldEvent;

export type GameMessage = WorldTickMessage | WorldEvent;
