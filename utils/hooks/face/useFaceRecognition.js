import { useState, useEffect, useCallback, useRef } from "react";
import * as faceapi from "face-api.js";

const MODEL_URL = `https://operating-as-usual.vercel.app/INTERNETINENTAL/face-models`;

export default function useFaceRecognition({ videoReady, vidEl, handleFaceResults = () => {} }) {
  const [faceAPILoaded, setFaceAPILoaded] = useState(false);
  const animationFrameId = useRef();

  const [results, setResults] = useState(null);

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

    animationFrameId.current = requestAnimationFrame(() => faceLandmarkDetection(vid));

    if (deltaTime < 50) {
      return;
    }

    try {
      //   const result = await faceapi.detectSingleFace(vid).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();
      const result = await faceapi.detectSingleFace(vid).withFaceLandmarks();

      if (result) {
        const landmarks = result.landmarks;
        let data = {
          //   jawOutline: landmarks.getJawOutline(),
          //   nose: landmarks.getNose(),
          mouth: landmarks.getMouth(),
          leftEye: landmarks.getLeftEye(),
          rightEye: landmarks.getRightEye(),
          leftEyeBrow: landmarks.getLeftEyeBrow(),
          rightEyeBrow: landmarks.getRightEyeBrow(),
        };

        // console.log(data);
        //data looks like this
        //for data create bounding from points and return

        const boundedData = {
          //   jawOutline: getBoundingFromPoints(data.jawOutline),
          //   nose: getBoundingFromPoints(data.nose),
          mouth: getBoundingFromPoints(data.mouth),
          leftEye: getBoundingFromPoints(data.leftEye),
          rightEye: getBoundingFromPoints(data.rightEye),
          leftEyeBrow: getBoundingFromPoints(data.leftEyeBrow),
          rightEyeBrow: getBoundingFromPoints(data.rightEyeBrow),
        };

        setResults(boundedData);
        handleFaceResults(boundedData);
      }
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
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [vidEl, videoReady, faceAPILoaded, faceLandmarkDetection]);

  return results;
}

function getBoundingFromPoints(points, marginRatio = 0) {
  const x = points.map((p) => p.x);
  const y = points.map((p) => p.y);
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);
  const width = (maxX - minX) * (1 + marginRatio);
  const height = (maxY - minY) * (1 + marginRatio);
  const xStart = (minX + maxX) / 2 - width / 2;
  const yStart = (minY + maxY) / 2 - height / 2;

  return {
    x: xStart,
    y: yStart,
    width,
    height,
    xMid: xStart + width / 2,
    yMid: yStart + height / 2,
  };
}
