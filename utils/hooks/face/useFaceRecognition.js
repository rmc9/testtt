import { useState, useEffect, useCallback, useRef } from "react";
import * as faceapi from "face-api.js";

const MODEL_URL = `https://operating-as-usual.vercel.app/INTERNETINENTAL/face-models`;

export default function useFaceRecognition({ videoReady, vidEl }) {
  const [faceAPILoaded, setFaceAPILoaded] = useState(false);
  const animationFrameId = useRef();

  useEffect(() => {
    async function loadFaceAPIModels() {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        setFaceAPILoaded(true);
      } catch (err) {
        console.error("Error loading models: ", err);
      }
    }

    loadFaceAPIModels();
  }, []);

  const prevTime = useRef();
  const faceLandmarkDetection = useCallback(async (vid) => {
    const now = Date.now();
    const deltaTime = now - prevTime.current;
    prevTime.current = now;

    if (deltaTime < 50) {
      animationFrameId.current.id = requestAnimationFrame(() => faceLandmarkDetection(vid));
      return;
    }

    try {
      const result = await faceapi.detectSingleFace(vid).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();
      if (result) {
        console.log(result.detection.box);
        console.log(result.landmarks);
      }
      animationFrameId.current.id = requestAnimationFrame(() => faceLandmarkDetection(vid));
    } catch (e) {
      console.error("Detection error:", e);
    }
  }, []);

  useEffect(() => {
    if (faceAPILoaded && vidEl && videoReady) {
      faceLandmarkDetection(vidEl);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current.id);
      }
    };
  }, [vidEl, videoReady, faceAPILoaded, faceLandmarkDetection]);
}
