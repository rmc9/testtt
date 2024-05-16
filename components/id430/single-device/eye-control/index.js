import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//utils
import useVideo from "utils/hooks/videos/useVideo";
import useFaceRecognition from "utils/hooks/face/useFaceRecognition";

//three
import { useSpring, a } from "@react-spring/three";
import * as easings from "d3-ease";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, FaceLandmarker, FaceControls, OrbitControls, useGLTF, Stats } from "@react-three/drei";

export default function Component() {
  const [faceResults, setFaceResults] = useState(null);

  return (
    <S.Container>
      <VideoComp setFaceResults={setFaceResults} />
      <Canvas>
        <ThreeScene faceResults={faceResults} />
      </Canvas>
    </S.Container>
  );
}

function VideoComp({ setFaceResults }) {
  const videoRef = useRef(null);
  const videoReady = useVideo({ video: videoRef ? videoRef.current : null });
  const faceResults = useFaceRecognition({
    videoReady,
    vidEl: videoRef.current,
    handleFaceResults: setFaceResults,
  });

  return (
    <video
      ref={videoRef}
      style={{
        position: "absolute",
        opacity: 0,
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

function ThreeScene({ faceResults }) {
  const { nodes, materials } = useGLTF("/assets/id430/faces/test1.glb");
  const meshRef = useRef();

  const [targetScale, setTargetScale] = useState([1, 1, 1]);
  const [targetRotation, setTargetRotation] = useState([0, 0, 0]);

  useEffect(() => {
    if (faceResults) {
      const scale = faceResults.mouth.height * 0.1;
      setTargetScale([scale, scale, scale]);
      setTargetRotation([scale, 0, 0]);
    }
  }, [faceResults]);

  const [scale, setScale] = useState([1, 1, 1]);

  console.log("target", targetScale);

  useSpring({
    from: { scale: [1, 1, 1] },
    to: {
      scale: targetScale,
    },
    config: { duration: 600, easing: easings.easeCubic },
    onChange: (value) => {
      const scale = value.value.scale;
      setScale(scale);
    },
  });

  console.log(scale);

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Environment preset="lobby" background />
      <mesh scale={targetScale} rotation={targetRotation}>
        <meshStandardMaterial color="red" />
        <boxGeometry args={[1, 1, 1]} />
      </mesh>

      {/* <a.mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow geometry={nodes.imageobj.geometry} material={nodes.imageobj.material} /> */}

      <Stats />
    </>
  );
}
