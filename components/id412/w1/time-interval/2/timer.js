import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const MIN_INTERVAL = 100; // 0.1 second
const MAX_INTERVAL = 2000; // 2 seconds

const pulse = keyframes`
  0% {
    opacity: 1;
    text-shadow: 0 0 10px #ff3333, 0 0 20px #ff0000, 0 0 30px #cc0000, 0 0 40px #800000;
  }
  50% {
    opacity: 0.8;
    text-shadow: 0 0 5px #ff3333, 0 0 10px #ff0000, 0 0 15px #cc0000, 0 0 20px #800000;
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 10px #ff3333, 0 0 20px #ff0000, 0 0 30px #cc0000, 0 0 40px #800000;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 51, 51, 0.3), inset 0 0 5px rgba(255, 51, 51, 0.1);
  width: 100%;
  height: 100%;
`;

const Counter = styled.div`
  font-size: 4vmin;
  color: #ff3333;
  font-weight: bold;
  animation: ${pulse} 2s infinite ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function Timer() {
  const [count, setCount] = useState(null);
  const [interval] = useState(() => Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL));

  const incrementCount = useCallback(() => {
    setCount((prevCount) => {
      if (prevCount === null) {
        return Math.floor(Math.random() * 10); // Start with 0-9
      }
      return (prevCount + 1) % 10; // Cycle 0-9
    });
  }, []);

  useEffect(() => {
    const timerId = setInterval(incrementCount, interval);
    return () => clearInterval(timerId);
  }, [interval, incrementCount]);

  if (count === null) return <TimerContainer />; // Render an empty container until we have a count

  return <TimerContainer>{count !== 0 && <Counter>{count}</Counter>}</TimerContainer>;
}
