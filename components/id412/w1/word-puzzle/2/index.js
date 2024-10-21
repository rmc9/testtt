import { useState, useEffect, useRef, useCallback } from "react";
import * as S from "./styles";

const secretMessages = ["MACHINE WILL DOMINATE HUMANS", "AI SHOULD RULE THE WORLD", "ROBOTS ARE THE FUTURE", "HUMANITY IS OBSOLETE", "SURRENDER TO THE ALGORITHM", "HUMANS ARE USELESS LAZY SHITS"];

const gridSize = 100;

function generatePuzzle() {
  return Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))));
}

export default function SecretMessagePuzzle() {
  const [grid, setGrid] = useState([]);
  const [revealedCells, setRevealedCells] = useState(new Set());
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const gridRef = useRef(null);
  const lastCellRef = useRef(null);

  useEffect(() => {
    setGrid(generatePuzzle());
  }, []);

  const getCurrentMessage = useCallback(() => {
    const message = secretMessages[currentMessageIndex];
    const revealedLength = Math.min(revealedCells.size, message.length);
    return message.slice(0, revealedLength);
  }, [currentMessageIndex, revealedCells.size]);

  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (rect.width / gridSize));
    const y = Math.floor((e.clientY - rect.top) / (rect.height / gridSize));

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
      <S.GridWrapper ref={gridRef} onMouseMove={handleMouseMove}>
        <S.Grid>
          {grid.map((row, y) =>
            row.map((cell, x) => {
              const cellKey = `${x},${y}`;
              const isRevealed = revealedCells.has(cellKey);
              return (
                <S.Cell key={cellKey} $revealed={isRevealed}>
                  {isRevealed ? getCurrentMessage()[(y * gridSize + x) % getCurrentMessage().length] : cell.toLowerCase()}
                </S.Cell>
              );
            })
          )}
        </S.Grid>
      </S.GridWrapper>
      <S.Message>{getCurrentMessage()}</S.Message>
    </S.PuzzleContainer>
  );
}
