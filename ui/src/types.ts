// import and re-export all types from ../ready-agent-one-node/src/types/shared-types.ts
export * from '../../ready-agent-one-node/src/types/shared-types';


// Chat types
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}