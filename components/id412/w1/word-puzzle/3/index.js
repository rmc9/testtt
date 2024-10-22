import { useState, useEffect, useRef, useCallback } from "react";
import * as S from "./styles";

const secretMessages = ["MACHINE WILL DOMINATE HUMANS", "AI SHOULD RULE THE WORLD", "ROBOTS ARE THE FUTURE", "HUMANITY IS OBSOLETE", "SURRENDER TO THE ALGORITHM", "HUMANS ARE USELESS LAZY SHITS"];

const gridSize = 100;
const cellSize = 10; // px
const canvasSize = gridSize * cellSize;

function generatePuzzle() {
  return Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))));
}

export default function SecretMessagePuzzle() {
  const [grid, setGrid] = useState([]);
  const [revealedCells, setRevealedCells] = useState(new Set());
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const canvasRef = useRef(null);
  const lastCellRef = useRef(null);

  useEffect(() => {
    setGrid(generatePuzzle());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "8px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellKey = `${x},${y}`;
        const isRevealed = revealedCells.has(cellKey);
        ctx.fillStyle = isRevealed ? "red" : "white";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.fillStyle = isRevealed ? "white" : "black";
        const char = isRevealed ? getCurrentMessage()[(y * gridSize + x) % getCurrentMessage().length] : cell.toLowerCase();
        ctx.fillText(char, (x + 0.5) * cellSize, (y + 0.5) * cellSize);
      });
    });
  }, [grid, revealedCells, currentMessageIndex]);

  const getCurrentMessage = useCallback(() => {
    const message = secretMessages[currentMessageIndex];
    const revealedLength = Math.min(revealedCells.size, message.length);
    return message.slice(0, revealedLength);
  }, [currentMessageIndex, revealedCells.size]);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      const cellKey = `${x},${y}`;
      if (cellKey !== lastCellRef.current) {
        lastCellRef.current = cellKey;
        setRevealedCells((prev) => {
          const newSet = new Set(prev);
          newSet.add(cellKey);
          if (newSet.size % 10 === 0) {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % secretMessages.length);
          }
          return newSet;
        });
      }
    }
  }, []);

  return (
    <S.PuzzleContainer>
      <S.CanvasWrapper>
        <canvas ref={canvasRef} width={canvasSize} height={canvasSize} onMouseMove={handleMouseMove} />
      </S.CanvasWrapper>
      <S.Message>{getCurrentMessage()}</S.Message>
    </S.PuzzleContainer>
  );
}
