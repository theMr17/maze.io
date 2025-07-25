"use client";
import { useEffect, useRef, useCallback } from "react";

type MazeCanvasProps = {
  maze: number[][];
  cellSize?: number;
};

export default function MazeCanvas({ maze, cellSize = 20 }: MazeCanvasProps) {
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
  }, [maze, cellSize, getCell]);

  return (
    <div className="flex justify-center overflow-auto">
      <canvas ref={canvasRef} />
    </div>
  );
}
