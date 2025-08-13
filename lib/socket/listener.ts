import { Socket } from "socket.io-client";
import { registerCommonEvents } from "./events/common";
import { registerMazeDuelEvents } from "./events/mazeDuel";

export const setupListeners = (socket: Socket, gameMode: string) => {
  registerCommonEvents(socket);

  switch (gameMode) {
    case "maze-duel":
      registerMazeDuelEvents(socket);
      break;
  }
};
