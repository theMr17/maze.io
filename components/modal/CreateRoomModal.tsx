"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import ActionButton from "../button/ActionButton";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hardcoded temporarily, will be replaced with dynamic data later
interface GameMode {
  id: string;
  name: string;
  description: string;
  options: {
    key: string;
    label: string;
    type: "dropdown" | "number";
    values?: string[];
    min?: number;
    max?: number;
    default: string | number;
    description: string;
  }[];
}

const gameModeInfo: GameMode[] = [
  {
    id: "maze-duel",
    name: "Maze Duel",
    description: "1v1 battles in a small maze.",
    options: [
      {
        key: "mazeSize",
        label: "Maze Size",
        type: "dropdown",
        values: ["Small", "Medium", "Large"],
        default: "Medium",
        description: "Determines the overall complexity and area of the maze.",
      },
      {
        key: "playerCount",
        label: "Player Count",
        type: "number",
        min: 2,
        max: 2,
        default: 2,
        description: "Only 2 players for head-to-head matches.",
      },
      {
        key: "visibility",
        label: "Visibility Range",
        type: "dropdown",
        values: ["Low", "Medium", "High"],
        default: "High",
        description:
          "Controls how far players can see in the maze. Higher visibility makes it easier to spot opponents and navigate.",
      },
    ],
  },
  {
    id: "maze-royale",
    name: "Maze Royale",
    description: "Up to 10 players battle it out. Last player standing wins.",
    options: [
      {
        key: "mazeSize",
        label: "Maze Size",
        type: "dropdown",
        values: ["Medium", "Large", "Extra Large"],
        default: "Large",
        description: "Larger mazes support more players and hiding spaces.",
      },
      {
        key: "playerCount",
        label: "Player Count",
        type: "number",
        min: 2,
        max: 10,
        default: 6,
        description: "Choose player count (2 to 10).",
      },
      {
        key: "decayRate",
        label: "Visibility Decay Rate",
        type: "dropdown",
        values: ["Slow", "Normal", "Fast"],
        default: "Normal",
        description: "Controls how quickly player visibility fades.",
      },
      {
        key: "allowSpectators",
        label: "Allow Spectators",
        type: "dropdown",
        values: ["Yes", "No"],
        default: "Yes",
        description: "Choose whether others can watch the match.",
      },
    ],
  },
  {
    id: "tag-maze",
    name: "Tag Maze",
    description: "One player is 'It' and must tag others before time runs out.",
    options: [
      {
        key: "mazeSize",
        label: "Maze Size",
        type: "dropdown",
        values: ["Small", "Medium", "Large"],
        default: "Medium",
        description: "Affects mobility and strategy.",
      },
      {
        key: "playerCount",
        label: "Player Count",
        type: "number",
        min: 2,
        max: 8,
        default: 4,
        description: "Player count (2 to 8).",
      },
      {
        key: "tagTimer",
        label: "'It' Timer (sec)",
        type: "number",
        min: 30,
        max: 300,
        default: 120,
        description: "Duration the 'It' player has to tag someone.",
      },
      {
        key: "rotationMode",
        label: "Random 'It' Rotation",
        type: "dropdown",
        values: ["Every Round", "On Timeout", "Never"],
        default: "Every Round",
        description: "When the 'It' role rotates.",
      },
    ],
  },
];

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [roomName, setRoomName] = useState("Player1's Room");
  const [roomType, setRoomType] = useState("Public");
  const [selectedMode, setSelectedMode] = useState(gameModeInfo[0].id);
  const [formState, setFormState] = useState<Record<string, string | number>>(
    {}
  );

  useEffect(() => {
    const mode = gameModeInfo.find((m) => m.id === selectedMode);
    if (mode) {
      const defaultState: Record<string, string | number> = {};
      mode.options.forEach((opt) => {
        defaultState[opt.key] = opt.default;
      });
      setFormState(defaultState);
    }
  }, [selectedMode]);

  const handleInputChange = (key: string, value: string | number) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    const config = {
      roomName,
      roomType,
      selectedMode,
      options: formState,
    };

    try {
      // Replace with actual API or socket call
      console.log("Creating room with config:", config);
      // await api.createRoom(config)
      onClose();
    } catch (err) {
      console.error("Room creation failed:", err);
    }
  };

  const currentOptions =
    gameModeInfo.find((mode) => mode.id === selectedMode)?.options ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-2xl h-100 flex bg-primary-variant/80">
        <div className="flex flex-col md:w-2/5 overflow-y-auto">
          {gameModeInfo.map((mode) => (
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
                  min={option.min}
                  max={option.max}
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
