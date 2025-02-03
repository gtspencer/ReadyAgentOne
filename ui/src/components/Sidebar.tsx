import React from 'react';
import { Send, Users, Trophy, DoorOpen, DoorClosed, Cpu, Settings } from 'lucide-react';
import { Player, PLAYER_ENTER_EVENT, PLAYER_EXIT_EVENT, PLAYER_WON_EVENT, GAME_COMPLETED_EVENT } from '../types';

interface SidebarProps {
    endpoint: string;
    onEndpointChange: (endpoint: string) => void;
    onSendEvent: (event: any) => void;
    currentPlayer: Player;
    onPlayerChange: (player: Player) => void;
}

export default function Sidebar({ 
    endpoint, 
    onEndpointChange, 
    onSendEvent,
    currentPlayer,
    onPlayerChange
}: SidebarProps) {
    const handlePlayerEnter = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: PLAYER_ENTER_EVENT,
            eventData: currentPlayer
        });
    };

    const handlePlayerExit = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: PLAYER_EXIT_EVENT,
            eventData: currentPlayer
        });
    };

    const handlePlayerWon = () => {
        onSendEvent({
            text: "WORLD_EVENT",
            event: PLAYER_WON_EVENT,
            eventData: {
                player: currentPlayer,
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
                rank: [currentPlayer],
                game: "Sample Game",
                duration: 300
            }
        });
    };

    return (
        <div className="w-80 bg-gray-900 p-6 border-r border-blue-500 flex flex-col h-screen neon-border">
            <div className="flex items-center gap-2 mb-8">
                <Cpu className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-blue-400 neon-text">Control Panel</h2>
            </div>
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-blue-400">
                        <Settings className="w-4 h-4" />
                        API Endpoint
                    </label>
                    <input
                        type="text"
                        value={endpoint}
                        onChange={(e) => onEndpointChange(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="http://localhost:3000/chat"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-blue-400">
                        <Users className="w-4 h-4" />
                        Player Settings
                    </label>
                    <input
                        type="text"
                        value={currentPlayer.username}
                        onChange={(e) => onPlayerChange({ ...currentPlayer, username: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2"
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={currentPlayer.userId}
                        onChange={(e) => onPlayerChange({ ...currentPlayer, userId: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="User ID"
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-blue-400 mb-3">Quick Actions</h3>
                    <button
                        onClick={handlePlayerEnter}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 bg-opacity-20 border border-blue-500 text-blue-400 rounded-md hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                    >
                        <DoorOpen size={18} /> Player Enter
                    </button>
                    <button
                        onClick={handlePlayerExit}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 bg-opacity-20 border border-red-500 text-red-400 rounded-md hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                    >
                        <DoorClosed size={18} /> Player Exit
                    </button>
                    <button
                        onClick={handlePlayerWon}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 bg-opacity-20 border border-green-500 text-green-400 rounded-md hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                    >
                        <Trophy size={18} /> Player Won
                    </button>
                    <button
                        onClick={handleGameCompleted}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 bg-opacity-20 border border-purple-500 text-purple-400 rounded-md hover:bg-opacity-30 transition-all duration-300 hover:scale-105"
                    >
                        <Users size={18} /> Game Completed
                    </button>
                </div>
            </div>
        </div>
    );
}