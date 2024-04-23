import { prepareModel } from "./prepareModel";
import { prepareVideo } from "./prepareVideo";
import { useState, useEffect } from "react";

export default function useEyeTracking({ videoRef }) {
  const [detector, setDetector] = useState(null);

  useEffect(() => {
    prepareModel({ detector, setDetector });
  }, []);

  //prepare video

  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (videoRef && videoRef.current) {
      prepareVideo({ videoRef, setVideoReady });
    }
  }, [videoRef]);

  useEffect(() => {
    if (detector && videoReady) {
      detectFace();
    }
  }, [detector, videoReady, canvasRef]);

  const detectFace = async () => {
    try {
      let result = await detector.estimateFaces(videoRef.current);
      console.log(result);
    } catch (e) {
      console.log(e);
    }

    animationRef.current = window.requestAnimationFrame(detectFace);
  };
}
