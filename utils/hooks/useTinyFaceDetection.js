import * as faceapi from "face-api.js";
import { useEffect, useState, useRef } from "react";

export default function useTinyFaceDetection({ vidEl }) {
  const [faceAPILoaded, setFaceAPILoaded] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadFaceAPIModels();
  }, []);

  async function loadFaceAPIModels() {
    /// /assets/models
    const MODEL_URL = `https://operating-as-usual.vercel.app/INTERNETINENTAL/face-models`;
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    setFaceAPILoaded(true);
  }

  useEffect(() => {
    if (faceAPILoaded && vidEl) {
      faceLandmarkDetection(vidEl);
    }
  }, [vidEl, faceAPILoaded]);

  //animation frame
  const thenTimeRef = useRef(Date.now());
  const animationFrameRef = useRef(null);

  async function faceLandmarkDetection(vid) {
    //animationframe
    animationFrameRef.current = requestAnimationFrame(() => {
      faceLandmarkDetection(vid);
    });

    const now = Date.now();
    const then = thenTimeRef.current;
    const delta = now - then;

    if (delta > 100) {
      thenTimeRef.current = now;
    } else {
      return;
    }

    try {
      const result = await faceapi.detectAllFaces(vid, new faceapi.TinyFaceDetectorOptions({ minConfidence: 0.1 }));
      setResult(result);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    return () => animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return result;
}
