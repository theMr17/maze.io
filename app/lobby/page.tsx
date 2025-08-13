"use client";

import ActionButton from "@/components/button/ActionButton";
import React, { useState } from "react";

// Mock player list
const mockPlayers = [
  { id: 1, name: "MazeKing", isOwner: true },
  { id: 2, name: "QuickFox", isOwner: false },
  { id: 3, name: "GhostChaser", isOwner: false },
];

const Lobby = () => {
  const [players, setPlayers] = useState(mockPlayers);

  // Assume current user is MazeKing (id: 1)
  const currentPlayerId = 1;
  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const isOwner = currentPlayer?.isOwner;

  const handleStartGame = () => {
    console.log("Game started!");
    // TODO: emit start game event or route transition
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tertiary-variant p-6">
      <div className="w-full max-w-xl bg-tertiary-variant-2 p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-primary-foreground text-center">
          Room Lobby
        </h1>

        <div className="h-64 overflow-y-auto space-y-2 scrollbar-hide">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex justify-between items-center px-4 py-2 rounded bg-background hover:brightness-110 transition"
            >
              <span className="text-primary-foreground font-medium">
                {player.name}
              </span>
              {player.isOwner && (
                <span className="text-xs text-primary font-semibold">
                  Owner
                </span>
              )}
            </div>
          ))}
        </div>

        {isOwner && (
          <ActionButton
            onClick={handleStartGame}
            className="w-full bg-secondary text-secondary-foreground border-2 border-border"
            variant="light"
          >
            Start Game
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default Lobby;
