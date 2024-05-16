import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Text3D, Center, Stars } from "@react-three/drei";

import useMousePos from "utils/hooks/useMousePos";

export default function Component() {
  return (
    <S.Container>
      <Canvas
        //camera position
        camera={{
          position: [0, 0, 20],
        }}
      >
        <ambientLight />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <ScrollControls
          pages={80}
          //stylye scrollbar hide
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <InnerEl />
        </ScrollControls>
      </Canvas>
    </S.Container>
  );
}

function InnerEl() {
  const scroll = useScroll();

  const [scrollPos, setScrollPos] = useState(0);

  useFrame(() => {
    const pos = scroll.range(0, 1);
    setScrollPos(pos);
  });

  return (
    <>
      <group>
        {new Array(21).fill(0).map((_, i) => {
          return new Array(21).fill(0).map((_, j) => (
            <mesh key={100 * i + j} position={[(i - 10) * 1.5 * scrollPos, (j - 10) * 1.5 * scrollPos, 0]} rotation={[scrollPos * 4 * Math.PI, scrollPos * 6 * Math.PI, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshNormalMaterial color={new THREE.Color(`hsl(${scrollPos * 360}, 100%, 50%)`)} />
            </mesh>
          ));
        })}
      </group>
    </>
  );
}
