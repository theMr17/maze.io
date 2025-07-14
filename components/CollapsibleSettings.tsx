"use client";

import React, { useState } from "react";
import Collapsible from "./Collapsible";
import ActionButton from "./button/ActionButton";

interface CollapsibleSettingsProps {
  className?: string;
}

const CollapsibleSettings: React.FC<CollapsibleSettingsProps> = ({
  className = "",
}) => {
  const [username, setUsername] = useState("Player1");
  const [musicVolume, setMusicVolume] = useState(50);
  const [gameVolume, setGameVolume] = useState(50); // Renamed from gameSoundVolume

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log("Username changed to:", e.target.value);
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    setMusicVolume(volume);
    console.log("Music volume:", volume);
  };

  const handleGameVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    setGameVolume(volume);
    console.log("Game volume:", volume);
  };

  return (
    <Collapsible
      className={`absolute bottom-10 left-10 max-w-sm w-full ${className}`}
      title="Settings"
    >
      <div className="flex flex-col space-y-4 p-2">
        {/* Username */}
        <label htmlFor="username" className="flex flex-col items-start">
          <span className="text-sm text-tertiary-foreground">
            Edit Username:
          </span>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            className="w-full mt-2 h-12 border-3 border-border-variant p-2 rounded bg-tertiary text-tertiary-foreground focus:bg-tertiary-variant focus:border-tertiary-foreground focus:outline-none"
            aria-label="Username"
          />
        </label>

        {/* Music Volume */}
        <label htmlFor="music-volume" className="flex flex-col items-start">
          <span className="text-sm text-tertiary-foreground mb-1">
            Music Volume: {musicVolume}%
          </span>
          <input
            id="music-volume"
            type="range"
            min={0}
            max={100}
            value={musicVolume}
            onChange={handleMusicVolumeChange}
            className="w-full accent-secondary-variant"
            aria-label="Music Volume"
          />
        </label>

        {/* Game Volume */}
        <label htmlFor="game-volume" className="flex flex-col items-start">
          <span className="text-sm text-tertiary-foreground mb-1">
            Game Volume: {gameVolume}%
          </span>
          <input
            id="game-volume"
            type="range"
            min={0}
            max={100}
            value={gameVolume}
            onChange={handleGameVolumeChange}
            className="w-full accent-secondary-variant"
            aria-label="Game Volume"
          />
        </label>

        <div className="flex justify-end mt-4">
          <ActionButton className="text-sm" variant="light">
            Logout
          </ActionButton>
        </div>
      </div>
    </Collapsible>
  );
};

export default CollapsibleSettings;
