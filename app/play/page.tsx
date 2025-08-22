"use client";

import MazeCanvas from "@/components/MazeCanvas";
import { useAuth } from "@/providers/AuthProvider";
import { useMatch } from "@/providers/MatchProvider";

const Play = () => {
  const { match } = useMatch();
  const { authData } = useAuth();

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
