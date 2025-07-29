"use client";

import ActionButton from "@/components/button/ActionButton";
import PlayButton from "@/components/button/PlayButton";
import CollapsibleSettings from "@/components/CollapsibleSettings";
import CreateRoomModal from "@/components/modal/CreateRoomModal";
import JoinRoomModal from "@/components/modal/JoinRoomModal";
import LoginModal from "@/components/modal/LoginModal";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

export default function Home() {
  const playerLevel = 53;

  const { authData, isLoading } = useAuth();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);

  return (
    <div className="maze-pattern-bg h-screen flex items-center justify-center">
      <div className="absolute left-10 top-4 right-10 flex justify-between items-center">
        <div className="flex items-center">
          <div className="player-level-bg size-25 flex items-center justify-center z-10">
            <span className="text-2xl text-black">{playerLevel}</span>
          </div>
          <div className="absolute left-16 bg-tertiary border-6 border-border pl-10 pr-4 py-1 rounded">
            <span className="text-2xl">
              {isLoading ? "Loading..." : authData?.name || "Guest"}
            </span>
          </div>
        </div>

        {authData?.isGuest ? (
          <ActionButton
            className="bg-primary-variant"
            variant="light"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Log In
          </ActionButton>
        ) : null}
      </div>

      <div className="h-full w-full flex flex-col justify-center items-center">
        <img src="maze-logo.svg" alt="Maze Logo" className="w-70" />
        <PlayButton className="w-full max-w-sm">Play</PlayButton>
        <div className="flex space-x-4 w-full max-w-sm mt-5">
          <ActionButton
            className="flex-1"
            onClick={() => setIsCreateRoomModalOpen(true)}
          >
            Create
          </ActionButton>
          <ActionButton
            className="flex-1"
            onClick={() => setIsJoinRoomModalOpen(true)}
          >
            Join
          </ActionButton>
        </div>
      </div>

      <CollapsibleSettings></CollapsibleSettings>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <JoinRoomModal
        isOpen={isJoinRoomModalOpen}
        onClose={() => setIsJoinRoomModalOpen(false)}
      />

      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
      />
    </div>
  );
}
