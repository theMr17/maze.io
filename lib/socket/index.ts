import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (roomId: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      withCredentials: true,
      autoConnect: false,
      query: { roomId },
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket(roomId) first.");
  }
  return socket;
};
