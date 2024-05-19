import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";
import * as THREE from "three";
import { extend, Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import useSocket from "utils/hooks/socket/id430/mobile-scroll/useSocketScreen";

//qr code
import { QRCodeSVG } from "qrcode.react";
const QR_URL = "https://experiential-experiences-904af20e61d8.herokuapp.com/id430/multiple-devices/mobile-scroll/mobile";

export default function Component() {
  const socket = useSocket({
    handleNewScroll,
  });

  const [scrollPoses, setScrollPoses] = useState([]);

  function handleNewScroll(data) {
    //do a similar thing with scrollposes
    setScrollPoses((arr) => {
      let copied = [...arr];
      const index = copied.findIndex((item) => item.mobileId === data.mobileId);
      if (index !== -1) {
        copied[index].scrollPos = data.scrollPos;
        copied[index].colorHue = data.colorHue;
      } else {
        copied.push({
          mobileId: data.mobileId,
          scrollPos: data.scrollPos,
          colorHue: data.colorHue,
        });
      }
      return copied;
    });
  }

  console.log(scrollPoses);

  return (
    <S.Container>
      <S.ThreeContainer>
        <Canvas>
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 10, 10]} intensity={1} color="white" />

          <Environment preset="dawn" />
          {scrollPoses.map((el, i) => (
            <El key={i} scrollPos={el.scrollPos} position={[(i - scrollPoses.length / 2) * 1, 0, 0]} colorHue={el.colorHue} />
          ))}

          <OrbitControls />
        </Canvas>
      </S.ThreeContainer>

      <S.QRContainer>
        <QRCodeSVG value={QR_URL} size={150} bgColor="transparent" fgColor="white" />
      </S.QRContainer>
    </S.Container>
  );
}

function El({ scrollPos, position, colorHue }) {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x = scrollPos * Math.PI * 3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={new THREE.Color(`hsl(${colorHue}, 100%, 50%)`)} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}
