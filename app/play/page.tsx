"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const Play = () => {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");

  return <div>Game Page: {roomCode}</div>;
};

export default Play;
