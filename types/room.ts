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
