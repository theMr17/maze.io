"use client";
import { useEffect, useRef, useCallback } from "react";

type Player = {
  row: number;
  col: number;
  isOwner: boolean;
  name: string;
};

type MazeCanvasProps = {
  maze: number[][];
  players?: Player[];
  cellSize?: number;
};

export default function MazeCanvas({
  maze,
  players = [],
  cellSize = 20,
}: MazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getCell = useCallback(
    (row: number, col: number) => maze[row]?.[col] ?? -1,
    [maze]
  );

  const isWall = (row: number, col: number) => getCell(row, col) === 1;

  const drawCenter = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      x + cellSize / 4,
      y + cellSize / 4,
      cellSize / 2,
      cellSize / 2
    );
  };

  const drawEdges = (
    ctx: CanvasRenderingContext2D,
    row: number,
    col: number,
    x: number,
    y: number
  ) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (!isWall(row - 1, col)) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellSize, y); // top
    }
    if (!isWall(row + 1, col)) {
      ctx.moveTo(x, y + cellSize);
      ctx.lineTo(x + cellSize, y + cellSize); // bottom
    }
    if (!isWall(row, col - 1)) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + cellSize); // left
    }
    if (!isWall(row, col + 1)) {
      ctx.moveTo(x + cellSize, y);
      ctx.lineTo(x + cellSize, y + cellSize); // right
    }

    ctx.stroke();
  };

  const drawThinnerWalls = (
    ctx: CanvasRenderingContext2D,
    row: number,
    col: number,
    x: number,
    y: number
  ) => {
    ctx.fillStyle = "#000000";

    // Top wall
    if (isWall(row - 1, col)) {
      ctx.fillRect(x + cellSize / 4, y, cellSize / 2, cellSize / 4);
    }

    // Bottom wall
    if (isWall(row + 1, col)) {
      ctx.fillRect(
        x + cellSize / 4,
        y + (3 * cellSize) / 4,
        cellSize / 2,
        cellSize / 4
      );
    }

    // Left wall
    if (isWall(row, col - 1)) {
      ctx.fillRect(x, y + cellSize / 4, cellSize / 4, cellSize / 2);
    }

    // Right wall
    if (isWall(row, col + 1)) {
      ctx.fillRect(
        x + (3 * cellSize) / 4,
        y + cellSize / 4,
        cellSize / 4,
        cellSize / 2
      );
    }

    // Corners
    if (
      isWall(row - 1, col) &&
      isWall(row, col - 1) &&
      isWall(row - 1, col - 1)
    ) {
      ctx.fillRect(x, y, cellSize / 4, cellSize / 4); // top-left
    }

    if (
      isWall(row - 1, col) &&
      isWall(row, col + 1) &&
      isWall(row - 1, col + 1)
    ) {
      ctx.fillRect(x + (3 * cellSize) / 4, y, cellSize / 4, cellSize / 4); // top-right
    }

    if (
      isWall(row + 1, col) &&
      isWall(row, col - 1) &&
      isWall(row + 1, col - 1)
    ) {
      ctx.fillRect(x, y + (3 * cellSize) / 4, cellSize / 4, cellSize / 4); // bottom-left
    }

    if (
      isWall(row + 1, col) &&
      isWall(row, col + 1) &&
      isWall(row + 1, col + 1)
    ) {
      ctx.fillRect(
        x + (3 * cellSize) / 4,
        y + (3 * cellSize) / 4,
        cellSize / 4,
        cellSize / 4
      ); // bottom-right
    }
  };

  const drawPlayers = (ctx: CanvasRenderingContext2D) => {
    players.forEach((player) => {
      const { row, col, isOwner, name } = player;
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;

      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, cellSize / 3, 0, Math.PI * 2);
      ctx.fillStyle = isOwner ? "red" : "black";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = `${cellSize}px Galindo`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.letterSpacing = "1.5px";

      // Outline first
      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.strokeText(name, x, y - cellSize / 3 - 2);

      // Fill on top
      ctx.fillStyle = "white";
      ctx.fillText(name, x, y - cellSize / 3 - 2);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // return if maze is empty or not valid
    if (!Array.isArray(maze) || maze.length === 0 || !Array.isArray(maze[0])) {
      canvas.width = 0;
      canvas.height = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    canvas.width = maze[0].length * cellSize;
    canvas.height = maze.length * cellSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        const cell = maze[row][col];
        const x = col * cellSize;
        const y = row * cellSize;

        ctx.fillStyle = "#00000000";
        ctx.fillRect(x, y, cellSize, cellSize);

        if (cell === 1) {
          drawCenter(ctx, x, y);
          drawEdges(ctx, row, col, x, y);
          drawThinnerWalls(ctx, row, col, x, y);
        }
      }
    }

    // Draw players last (on top of maze)
    drawPlayers(ctx);
  }, [maze, players, cellSize, getCell]);

  return (
    <div className="flex justify-center overflow-auto">
      <canvas ref={canvasRef} />
    </div>
  );
}
