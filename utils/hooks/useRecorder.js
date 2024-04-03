import { useState, useEffect, useRef } from "react";

const initialState = {
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);

  useEffect(() => {
    askPermission();
  }, []);

  function askPermission() {
    try {
      navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      console.log("permission error!");
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecorderState((prev) => ({ ...prev, initRecording: true, mediaStream: stream }));
    } catch (e) {
      console.log(e);
    }
  }

  function saveRecording(recorder) {
    if (recorder.state !== "inactive") recorder.stop();
    setRecorderState((prev) => ({ ...prev, initRecording: false }));
  }

  //recording Interval(Seconds)
  useEffect(() => {
    let recordingInterval = null;
    if (recorderState.initRecording) {
      recordingInterval = setInterval(() => {
        analyseAudio();
        setRecorderState((prev) => ({ ...prev, recordingSeconds: prev.recordingSeconds + 0.01 }));
      }, 10);
    } else {
      clearInterval(recordingInterval);
    }
    return () => clearInterval(recordingInterval);
  }, [recorderState.initRecording]);

  useEffect(() => {
    if (recorderState.mediaStream) {
      initAudioSetting(recorderState.mediaStream);
      setRecorderState((prev) => ({ ...prev, mediaRecorder: new MediaRecorder(prev.mediaStream) }));
    }
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;

    if (recorder && recorder.state === "inactive") {
      let chunk = [];
      recorder.start();
      recorder.ondataavailable = (e) => {
        chunk.push(e.data);
      };
      recorder.onstop = (e) => {
        let blob = new Blob(chunk, { type: "audio/ogg; codecs=opus" });
        chunk = [];

        const audioUrl = URL.createObjectURL(blob);
        setRecorderState((prev) => ({ ...prev, audio: audioUrl }));
      };
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  //analyser
  const analyserRef = useRef();
  const dataRef = useRef();

  async function initAudioSetting(stream) {
    if (!stream) return;

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();
    analyserRef.current = audioCtx.createAnalyser();
    analyserRef.current.fftSize = 512;
    dataRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
  }

  function analyseAudio() {
    analyserRef.current.getByteFrequencyData(dataRef.current);
  }

  return {
    recorderState,
    analyserRef,
    dataRef,
    startRecording: () => startRecording(),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
}
