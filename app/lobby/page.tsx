"use client";

import ActionButton from "@/components/button/ActionButton";
import React, { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { RoomInfoPayload } from "@/types/room";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const Lobby = () => {
  const [lobby, setLobby] = useState<RoomInfoPayload | null>(null);
  const { authData } = useAuth();
  const currentUserId = authData?.id || "";

  const maxPlayers = 2;

  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    // Listen for joined-room event
    socket.on(SOCKET_EVENTS.COMMON.JOINED_ROOM, (data: RoomInfoPayload) => {
      console.log("Joined room data:", data);
      setLobby(data);
    });

    socket.on(SOCKET_EVENTS.COMMON.LEFT_ROOM, (data: RoomInfoPayload) => {
      console.log("Left room data:", data);
      setLobby(data);
    });

    socket.on(SOCKET_EVENTS.COMMON.MAZE_CREATED, (data: RoomInfoPayload) => {
      router.push("/play");
    });

    return () => {
      socket.off(SOCKET_EVENTS.COMMON.JOINED_ROOM);
      socket.off(SOCKET_EVENTS.COMMON.LEFT_ROOM);
      socket.off(SOCKET_EVENTS.COMMON.MAZE_CREATED);
    };
  }, []);

  if (!lobby) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tertiary-variant">
        <p className="text-primary-foreground">Connecting to room...</p>
      </div>
    );
  }

  const handleStartGame = () => {
    router.push("/play");
  };

  const handleLeaveLobby = () => {
    getSocket().disconnect();
    router.push("/");
  };

  return (
    <div className="maze-pattern-bg h-screen flex items-center">
      <ActionButton
        className="absolute left-4 top-4"
        onClick={handleLeaveLobby}
      >
        Leave
      </ActionButton>
      <div className="md:w-3/5 flex flex-col"></div>
      <div className="md:w-2/5 flex flex-col p-10">
        <div className="bg-tertiary-variant p-4 rounded-lg space-y-2 min-h-96">
          <div className="mt-1 mb-2 justify-between flex flex-row items-center">
            <h4 className="text-tertiary-foreground">
              Room Code: {lobby.roomCode}
            </h4>
            <div className="text-sm text-tertiary-foreground">
              Joined: {lobby.users.length}/{maxPlayers}
            </div>
          </div>
          {lobby.users.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-tertiary-variant-2 p-3 rounded"
            >
              <div className="font-medium text-secondary-foreground">
                {player.name ? player.name : "No name"}
                {player.id === currentUserId && " (You)"}
              </div>
              {player.id === lobby.createdBy && (
                <img
                  src="/crown.svg"
                  alt="Host"
                  className="w-5 h-5 ml-2"
                  title="Host"
                />
              )}
            </div>
          ))}
          {lobby.users.length < maxPlayers && (
            <div className="text-sm text-tertiary-foreground mt-4 text-center">
              Waiting for players to join...
            </div>
          )}
        </div>

        {lobby.createdBy === currentUserId && (
          <ActionButton
            onClick={handleStartGame}
            className="bg-secondary text-secondary-foreground border-2 border-border mt-6"
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
