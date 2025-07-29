"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import ActionButton from "../button/ActionButton";
import { joinRoom } from "@/services/roomService";
import { useRouter } from "next/navigation";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PublicRoom {
  code: string;
  hostName: string;
  players: number;
  maxPlayers: number;
  mode: string;
}

const mockRooms: PublicRoom[] = [
  {
    code: "AX4D2F",
    hostName: "MazeKing",
    players: 3,
    maxPlayers: 6,
    mode: "Tag Maze",
  },
  {
    code: "J9K3L1",
    hostName: "QuickFox",
    players: 2,
    maxPlayers: 2,
    mode: "Maze Duel",
  },
  {
    code: "M7N9P0",
    hostName: "BattleBunny",
    players: 10,
    maxPlayers: 20,
    mode: "Maze Royale",
  },
  {
    code: "Z8Q7W3",
    hostName: "ShadowRunner",
    players: 1,
    maxPlayers: 2,
    mode: "Maze Duel",
  },
  {
    code: "K2H6L4",
    hostName: "TagHunter",
    players: 6,
    maxPlayers: 10,
    mode: "Tag Maze",
  },
  {
    code: "B3R8N5",
    hostName: "ZoneWarrior",
    players: 15,
    maxPlayers: 20,
    mode: "Maze Royale",
  },
  {
    code: "N7L2Y9",
    hostName: "GhostChaser",
    players: 7,
    maxPlayers: 8,
    mode: "Tag Maze",
  },
  {
    code: "D1M9T3",
    hostName: "MiniMaze",
    players: 1,
    maxPlayers: 6,
    mode: "Tag Maze",
  },
  {
    code: "U6K8P2",
    hostName: "MazeBot",
    players: 5,
    maxPlayers: 5,
    mode: "Maze Duel",
  },
  {
    code: "T4V3X1",
    hostName: "KingOfZones",
    players: 19,
    maxPlayers: 20,
    mode: "Maze Royale",
  },
  {
    code: "L5Q0R8",
    hostName: "TrapMaster",
    players: 0,
    maxPlayers: 2,
    mode: "Maze Duel",
  },
  {
    code: "Y2W7S9",
    hostName: "TagStorm",
    players: 3,
    maxPlayers: 10,
    mode: "Tag Maze",
  },
];

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ isOpen, onClose }) => {
  const [roomCode, setRoomCode] = useState("");
  const [rooms, setRooms] = useState<PublicRoom[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // TODO: Replace with API/socket call to fetch public rooms
      setRooms(mockRooms);
    }
  }, [isOpen]);

  const handleJoin = async (code: string) => {
    try {
      const res = await joinRoom(code);

      const roomCode = res.data.roomCode;
      router.push(`/lobby?code=${roomCode}`);

      onClose();
    } catch (err) {
      console.error("Room joining failed:", err);
    }
    onClose();
  };

  const handlePrivateJoin = () => {
    if (roomCode.length === 6) {
      handleJoin(roomCode);
    } else {
      alert("Room code must be 6 characters long.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-3xl h-100 flex">
        <div className="flex flex-col md:w-3/5 space-y-2 overflow-y-auto p-6 scrollbar-hide bg-tertiary-variant">
          {rooms.length === 0 ? (
            <div className="text-sm text-center m-auto">
              No public rooms available.
            </div>
          ) : (
            rooms.map((room) => (
              <div
                key={room.code}
                className="flex items-center justify-between bg-tertiary-variant-2 p-3 rounded hover:brightness-110 cursor-pointer"
                onClick={() => handleJoin(room.code)}
              >
                <div>
                  <div className="font-medium text-secondary-foreground">
                    {room.hostName}&apos;s Room
                  </div>
                  <div className="text-xs">
                    {room.mode} • {room.players}/{room.maxPlayers} • Code:{" "}
                    {room.code}
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">Join</span>
              </div>
            ))
          )}
        </div>

        <div className="md:w-2/5 space-y-4 flex flex-col justify-center p-6">
          <h3 className="text-lg font-bold text-primary-foreground">
            Join a Private Room
          </h3>
          <label htmlFor="room-code" className="flex flex-col items-start">
            <span className="text-sm text-primary-foreground">
              Got a room code from a friend? Enter it here!
            </span>
            <input
              id="room-code"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              className="input uppercase tracking-widest"
              aria-label="Room Code"
            />
          </label>

          <ActionButton
            onClick={handlePrivateJoin}
            className="bg-secondary text-secondary-foreground border-2 border-border"
            variant="light"
          >
            Join
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default JoinRoomModal;
