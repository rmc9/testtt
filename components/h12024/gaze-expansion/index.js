// EyeTrackingComponent.js
import React, { useEffect, useRef } from "react";
import * as S from "./styles";
// import useEyeTracking from "utils/hooks/tensorflow/useEyeTracking";

export default function EyeTracking() {
  const videoRef = useRef();
  // useEyeTracking({ videoRef });

  return (
    <div>
      <S.Video ref={videoRef} autoPlay="autoplay" loop playsinline muted preLoad="auto" />
    </div>
  );
}
