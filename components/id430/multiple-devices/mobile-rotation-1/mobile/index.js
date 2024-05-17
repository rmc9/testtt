import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";

import Tracker from "./tracker";

export default function Component() {
  const [requestPermission, setRequestPermission] = useState(false);

  return (
    <S.Container>
      <Canvas
        camera={{
          position: [0, 0, 25],
        }}
      >
        <ambientLight intensity={2} />
        {/* <directionalLight position={[0, 10, 0]} intensity={1} /> */}
        <directionalLight position={[0, 10, 10]} intensity={1} />

        <Environment preset="warehouse" />
        <OrbitControls />
        <Stars />
      </Canvas>

      <Tracker />
    </S.Container>
  );
}
