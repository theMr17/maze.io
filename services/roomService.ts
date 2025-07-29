import { ApiResponse } from "@/types/apiResponse";
import { GameMode } from "@/types/room";

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
