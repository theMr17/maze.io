import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { Socket } from "socket.io-client";

export const registerCommonEvents = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.COMMON.JOINED_ROOM, () => {
    console.log("Player joined:", socket.id);
  });

  socket.on(SOCKET_EVENTS.COMMON.LEFT_ROOM, () => {
    console.log("Player left:", socket.id);
  });

  socket.on(SOCKET_EVENTS.COMMON.START_MATCH, () => {
    console.log("Match started");
  });
};
