import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const MIN_INTERVAL = 100; // 0.1 second
const MAX_INTERVAL = 2000; // 2 seconds

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111;
  border-radius: 50%;
  box-shadow: 0 0 0.3rem 0 rgba(255, 255, 255, 0.5);

  width: 100%;
  height: 100%;
`;

const Counter = styled.div`
  font-size: 3vmin;
  color: #00ff00;
  font-weight: bold;
`;

export default function Timer() {
  const [count, setCount] = useState(null);
  const [interval] = useState(() => Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL));

  const incrementCount = useCallback(() => {
    setCount((prevCount) => {
      if (prevCount === null) {
        return Math.floor(Math.random() * 10);
      }
      return (prevCount + 1) % 10;
    });
  }, []);

  useEffect(() => {
    const timerId = setInterval(incrementCount, interval);
    return () => clearInterval(timerId);
  }, [interval, incrementCount]);

  if (count === null) return <TimerContainer />; // Render an empty container until we have a count

  return <TimerContainer>{count !== 0 && <Counter>{count}</Counter>}</TimerContainer>;
}
