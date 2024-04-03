import { useEffect, useRef } from "react";

export default function useVariable(state) {
  const varRef = useRef(state);

  useEffect(() => {
    varRef.current = state;
  }, [state]);

  return varRef;
}
