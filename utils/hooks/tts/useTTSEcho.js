import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak, options = {}) {
  useEffect(() => {
    if (text.length > 0 && speak) {
      getTTS(text);
    }
  }, [text, speak]);

  async function getTTS(text) {
    try {
      const res = await axios.post("/api/google/tts", { text, options });

      let data = res.data;
      console.log(data);

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      for (let i = 0; i < 10; i++) {
        (function (i) {
          const sound = new Audio("data:audio/wav;base64," + data);
          const source = audioCtx.createMediaElementSource(sound);
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = (1 + i) ** -1.7;
          source.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          setTimeout(() => {
            sound.play();
          }, 300 * i);

          if (i === 0) {
            sound.onended = () => {
              setSpeak(false);
            };
          }
        })(i);
      }
    } catch (e) {
      console.log(e, e.response.data);
    }
  }
}
