// EyeTrackingComponent.js
import React, { useEffect } from "react";

const EyeTracking = () => {
  useEffect(() => {
    let webgazer;
    try {
      // Dynamically import webgazer to ensure it's only loaded client-side
      import("webgazer").then((wg) => {
        webgazer = wg.default;

        webgazer
          .setGazeListener((data, elapsedTime) => {
            if (data == null) {
              return;
            }
            console.log(data, elapsedTime);
            // data.x and data.y will contain the x and y coordinates of the gaze position
          })
          .begin();

        webgazer.showVideoPreview(true).showPredictionPoints(true);
      });
    } catch (e) {
      console.log(e);
    }

    // Clean up
    return () => {
      if (webgazer) {
        webgazer.end();
      }
    };
  }, []);

  return (
    <div>
      <h2>Eye Tracking with WebGazer and React</h2>
    </div>
  );
};

export default EyeTracking;
