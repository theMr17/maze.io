"use client";

import { createContext, useContext, useRef, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  connectToRoom: (roomId: string) => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectToRoom = (roomId: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      withCredentials: true,
      autoConnect: true,
      query: { roomId },
    });

    setSocket(socketRef.current);
  };

  const disconnect = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setSocket(null);
  };

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectToRoom, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("useSocket must be used within SocketProvider");
  return socket;
};
