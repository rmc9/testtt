import { useState, useEffect } from "react";

export default function useDeviceMotion({ requestPermission }) {
  const [permission, setPermission] = useState(false);
  const [acc, setAcc] = useState({
    x: 0,
    y: 0,
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  function motionDetector(e) {
    try {
      setAcc({
        x: e.acceleration.x,
        y: e.acceleration.y,
        z: e.acceleration.z,
        alpha: e.rotationRate.alpha,
        beta: e.rotationRate.beta,
        gamma: e.rotationRate.gamma,
        interval: e.interval,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (requestPermission) {
      permissionGrant();
    }
  }, [requestPermission]);

  function permissionGrant() {
    try {
      if (typeof DeviceMotionEvent.requestPermission !== "function") {
        setPermission(true);
        return;
      }
      DeviceMotionEvent.requestPermission()
        .then((res) => {
          if (res === "granted") {
            setPermission(true);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Your device is not supported");
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (permission) {
      window.addEventListener("devicemotion", motionDetector);
      return () => {
        window.removeEventListener("devicemotion", motionDetector);
      };
    }
  }, [permission]);

  return { permission, acc };
}
