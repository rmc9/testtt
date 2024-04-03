import axios from "axios";
import { useEffect, useState } from "react";

export default function useTTS(text, speak, setSpeak, changeOnEnded = false, options = {}) {
  useEffect(() => {
    if (speak && text && text.length > 0) {
      getTTS(text);
    }
  }, [text, speak]);

  async function getTTS(text) {
    try {
      const res = await axios.post("/api/google/tts", { text, options });
      let data = res.data;
      const snd = new Audio("data:audio/wav;base64," + data);
      snd.play();

      if (changeOnEnded) {
        snd.onended = () => {
          setSpeak(false);
        };
      } else {
        setSpeak(false);
      }
    } catch (e) {
      console.log(e, e.response.data);
    }
  }
}
