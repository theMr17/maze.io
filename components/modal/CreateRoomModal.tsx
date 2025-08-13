"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import ActionButton from "../button/ActionButton";
import { GameMode } from "@/types/room";
import { createRoom, getGameModes } from "@/services/roomService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { initSocket } from "@/lib/socket";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { authData } = useAuth();
  const [roomName, setRoomName] = useState(() => {
    const playerName = authData?.name || "Player1";
    return `${playerName}'s Room`;
  });
  const [roomType, setRoomType] = useState("Public");
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [formState, setFormState] = useState<Record<string, string | number>>(
    {}
  );
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchModes = async () => {
      try {
        const response = await getGameModes();
        setGameModes(response.data);
        setSelectedMode(response.data[0]?.id || null);
      } catch (err) {
        console.error("Failed to load game modes", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchModes();
  }, [isOpen]);

  useEffect(() => {
    const mode = gameModes.find((m) => m.id === selectedMode);
    if (mode) {
      const defaultState: Record<string, string | number> = {};
      mode.options.forEach((opt) => {
        defaultState[opt.key] = opt.defaultValue;
      });
      setFormState(defaultState);
    }
  }, [selectedMode, gameModes]);

  const handleInputChange = (key: string, value: string | number) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const res = await createRoom(
        roomName,
        roomType as "Public" | "Private",
        selectedMode,
        formState
      );

      initSocket(res.id);

      const roomCode = res.roomCode;
      router.push(`/lobby?code=${roomCode}`);

      onClose();
    } catch (err) {
      console.error("Room creation failed:", err);
    }
  };

  const currentOptions =
    gameModes.find((mode) => mode.id === selectedMode)?.options ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-2xl h-100 flex bg-primary-variant/80">
        <div className="flex flex-col md:w-2/5 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-primary-foreground">Loading...</span>
            </div>
          ) : null}
          {gameModes.map((mode) => (
            <div
              key={mode.id}
              className={`p-2 h-25 cursor-pointer flex items-center gap-3 rounded-l ${
                selectedMode === mode.id
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => setSelectedMode(mode.id)}
            >
              <div className="md:w-1/3 w-15 h-15 flex items-center justify-center rounded p-1">
                <img
                  src={`${mode.id}.svg`}
                  alt={`${mode.name} Icon`}
                  className="w-70"
                />
              </div>
              <div className="md:w-2/3">
                <h4 className="font-semibold text-primary-foreground">
                  {mode.name}
                </h4>
                <p className="text-xs text-primary-foreground">
                  {mode.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:w-3/5 overflow-y-auto scrollbar-hide bg-primary rounded-tr rounded-br px-10 py-10">
          <label className="text-sm text-primary-foreground mb-2">
            Room Name:
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="input mt-1"
            />
          </label>

          <label className="text-sm text-primary-foreground mb-4">
            Room Type:
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="input mt-1"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </label>

          <ActionButton
            onClick={handleCreate}
            className="bg-primary text-primary-foreground border-2 border-border"
            disabled={loading || !selectedMode || !roomName.trim()}
          >
            Create Room
          </ActionButton>

          <div className="flex items-center gap-2 text-primary-foreground mt-4 mb-3">
            <div className="flex-grow border-t border-border" />
            <span className="text-sm">Customize</span>
            <div className="flex-grow border-t border-border" />
          </div>

          {currentOptions.map((option) => (
            <div key={option.key} className="mb-4">
              <label className="text-sm text-primary-foreground mb-1 block">
                {option.label}:
              </label>

              {option.type === "dropdown" ? (
                <select
                  value={formState[option.key]}
                  onChange={(e) =>
                    handleInputChange(option.key, e.target.value)
                  }
                  className="input"
                >
                  {option.values?.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              ) : option.type === "number" ? (
                <input
                  type="number"
                  value={formState[option.key]}
                  // this should never be null, when type is number.
                  min={option.min ?? undefined}
                  max={option.max ?? undefined}
                  onChange={(e) =>
                    handleInputChange(option.key, Number(e.target.value))
                  }
                  className="input"
                />
              ) : null}

              <p className="text-xs text-primary-foreground mt-1">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
