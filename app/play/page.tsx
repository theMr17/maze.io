"use client";

import MazeCanvas from "@/components/MazeCanvas";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { getSocket } from "@/lib/socket";
import { useAuth } from "@/providers/AuthProvider";
import { StartMatchPayload } from "@/types/room";
import React, { useEffect, useState } from "react";

const Play = () => {
  const [match, setMatch] = useState<StartMatchPayload | null>(null);
  const { authData } = useAuth();

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.emit(SOCKET_EVENTS.COMMON.START_MATCH);

    socket.on(SOCKET_EVENTS.COMMON.MAZE_CREATED, (data: StartMatchPayload) => {
      console.log("Maze created:", data);
      setMatch(data);
    });

    return () => {
      socket.off(SOCKET_EVENTS.COMMON.MAZE_CREATED);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary">
      <MazeCanvas
        maze={match?.grid ?? []}
        players={
          match?.playerMove.map((player) => ({
            ...player,
            isOwner: player.tag === authData?.id,
            name: player.tag === authData?.id ? "You" : "Opponent",
          })) ?? []
        }
      />
    </div>
  );
};

export default Play;
