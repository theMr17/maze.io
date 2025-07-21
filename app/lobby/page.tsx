"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const Lobby = () => {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");

  return <div>Lobby Page: {roomCode}</div>;
};

export default Lobby;
