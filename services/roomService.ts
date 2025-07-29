import { ApiResponse } from "@/types/apiResponse";
import { GameMode, Room } from "@/types/room";

export async function getGameModes(): Promise<ApiResponse<GameMode[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/game/modes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch game modes");

  const json = await res.json();
  return json;
}

export async function createRoom(
  name: string,
  type: "Public" | "Private",
  selectedMode: string | null,
  options: Record<string, string | number>
): Promise<Room> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/room/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        selectedMode,
        options: Object.entries(options).map(([name, value]) => ({
          name,
          value,
        })),
      }),
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Room creation failed");

  const json = await res.json();
  return json;
}

export async function joinRoom(code: string): Promise<ApiResponse<Room>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/room/join?code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Room joining failed");

  const json = await res.json();
  return json;
}
