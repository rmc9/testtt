import React, { useState, useEffect } from "react";
import * as S from "./styles";

const MAX_COUNT = 100;
const INTERVAL = 1000; // 1 second

export default function TimeIntervalVisual() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount >= MAX_COUNT ? 0 : prevCount + 1));
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <S.Container>
      <S.Counter>{count}</S.Counter>
    </S.Container>
  );
}
