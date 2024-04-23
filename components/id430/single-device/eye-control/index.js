import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//utils
import useVideo from "utils/hooks/videos/useVideo";
import useFaceRecognition from "utils/hooks/face/useFaceRecognition";

//three
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, FaceLandmarker, FaceControls, OrbitControls, useGLTF, Stats } from "@react-three/drei";

export default function Component() {
  return (
    <S.Container>
      <VideoComp />
      <Canvas></Canvas>
    </S.Container>
  );
}

function VideoComp() {
  const videoRef = useRef(null);
  const videoReady = useVideo({ video: videoRef ? videoRef.current : null });
  const faceRecognition = useFaceRecognition({
    videoReady,
    vidEl: videoRef.current,
  });

  return (
    <video
      ref={videoRef}
      style={{
        position: "absolute",
        // opacity: 0,
      }}
      type="video/mp4"
      autoPlay="autoplay"
      loop
      playsInline
      muted
      preload="auto"
      controls={false}
    />
  );
}

function ThreeScene() {
  const { nodes, materials } = useGLTF("/assets/id430/faces/test1.glb");

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Environment preset="lobby" background />
      <mesh castShadow receiveShadow geometry={nodes.imageobj.geometry} material={nodes.imageobj.material} />

      <Stats />
    </>
  );
}
