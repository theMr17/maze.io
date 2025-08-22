export interface GameModeOption {
  gameModeId: string;
  key: string;
  label: string;
  type: "dropdown" | "number";
  values: string[];
  min: number | null;
  max: number | null;
  defaultValue: string;
  description: string;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  options: GameModeOption[];
}

export interface RoomOption {
  id: string;
  gameModeId: string;
  name: string;
  value: string;
  roomId: string;
}

export interface RoomUser {
  id: string;
}

export interface Room {
  id: string;
  name: string;
  type: "Public" | "Private";
  selectedMode: string;
  createdBy: string;
  roomCode: string;
  createdAt: string;
  options: RoomOption[];
  users: RoomUser[];
}

export interface RoomInfoPayload {
  id: string;
  name: string;
  type: "Public" | "Private";
  selectedMode: string;
  createdBy: string;
  roomCode: string;
  createdAt: string;
  users: (RoomUser & { email: string | null; name: string | null })[];
  gameMode: GameMode; // game mode options is not sent currently
}

export interface StartMatchPayload {
  gameMode: string;
  playerMove: {
    row: number;
    col: number;
    tag: string;
  }[];
  grid: number[][];
}
