import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { Socket } from "socket.io-client";

export const registerMazeDuelEvents = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.MAZE_DUEL.SELECT_GOAL, (data) => {
    console.log("Opponent goal selected", data);
  });

  socket.on(SOCKET_EVENTS.MAZE_DUEL.PLAYER_MOVE, (data) => {
    console.log("Player moved", data);
  });

  socket.on(SOCKET_EVENTS.MAZE_DUEL.PLAYER_REACHED_GOAL, (data) => {
    console.log("Goal reached", data);
  });

  socket.on(SOCKET_EVENTS.MAZE_DUEL.MATCH_TIMEOUT, () => {
    console.log("Time ran out");
  });
};
