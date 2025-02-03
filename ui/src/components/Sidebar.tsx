import React, { useState } from 'react';
import { Send, Users, Trophy, DoorOpen, DoorClosed } from 'lucide-react';
import { Player, PLAYER_ENTER_EVENT, PLAYER_EXIT_EVENT, PLAYER_WON_EVENT, GAME_COMPLETED_EVENT } from '../types';

interface SidebarProps {
    endpoint: string;
    onEndpointChange: (endpoint: string) => void;
    onSendEvent: (event: any) => void;
}

export default function Sidebar({ endpoint, onEndpointChange, onSendEvent }: SidebarProps) {
    const [player, setPlayer] = useState<Player>({
        userId: '1',
        username: 'Player1'
    });

    const handlePlayerEnter = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: PLAYER_ENTER_EVENT,
            eventData: player
        });
    };

    const handlePlayerExit = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: PLAYER_EXIT_EVENT,
            eventData: player
        });
    };

    const handlePlayerWon = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: PLAYER_WON_EVENT,
            eventData: {
                player,
                score: 100,
                game: "Sample Game"
            }
        });
    };

    const handleGameCompleted = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: GAME_COMPLETED_EVENT,
            eventData: {
                rank: [player],
                game: "Sample Game",
                duration: 300
            }
        });
    };

    return (
        <div className="w-80 bg-gray-50 p-4 border-r border-gray-200 flex flex-col h-screen">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Endpoint
                </label>
                <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => onEndpointChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://api.example.com/chat"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Player Settings
                </label>
                <input
                    type="text"
                    value={player.username}
                    onChange={(e) => setPlayer({ ...player, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
                    placeholder="Username"
                />
                <input
                    type="text"
                    value={player.userId}
                    onChange={(e) => setPlayer({ ...player, userId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="User ID"
                />
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
                <button
                    onClick={handlePlayerEnter}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <DoorOpen size={18} /> Player Enter
                </button>
                <button
                    onClick={handlePlayerExit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    <DoorClosed size={18} /> Player Exit
                </button>
                <button
                    onClick={handlePlayerWon}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    <Trophy size={18} /> Player Won
                </button>
                <button
                    onClick={handleGameCompleted}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                    <Users size={18} /> Game Completed
                </button>
            </div>
        </div>
    );
}