"use client";

import ActionButton from "@/components/button/ActionButton";
import React, { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { JoinedRoomPayload } from "@/types/room";
import { useAuth } from "@/providers/AuthProvider";

const Lobby = () => {
  const [lobby, setLobby] = useState<JoinedRoomPayload | null>(null);
  const { authData } = useAuth();
  const currentUserId = authData?.id || "";

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    // Listen for joined-room event
    socket.on(SOCKET_EVENTS.COMMON.JOINED_ROOM, (data: JoinedRoomPayload) => {
      console.log("Joined room data:", data);
      setLobby(data);
    });

    return () => {
      socket.off(SOCKET_EVENTS.COMMON.JOINED_ROOM);
    };
  }, []);

  if (!lobby) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tertiary-variant">
        <p className="text-primary-foreground">Joining room...</p>
      </div>
    );
  }

  const players = lobby.users;
  const isOwner = lobby.createdBy === currentUserId;

  const handleStartGame = () => {
    console.log("Game started!");
    // socket.emit(SOCKET_EVENTS.COMMON.START_MATCH, { roomCode: lobby.roomCode });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tertiary-variant p-6">
      <div className="w-full max-w-xl bg-tertiary-variant-2 p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-primary-foreground text-center">
          {lobby.name}
        </h1>

        <div className="h-64 overflow-y-auto space-y-2 scrollbar-hide">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex justify-between items-center px-4 py-2 rounded bg-background hover:brightness-110 transition"
            >
              <span className="text-primary-foreground font-medium">
                {player.name || "Anonymous"}
              </span>
              {lobby.createdBy === player.id && (
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
