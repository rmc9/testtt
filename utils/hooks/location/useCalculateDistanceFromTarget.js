import { useEffect, useState } from "react";
import useGeoLocation from "utils/hooks/location/useGeoLocation";

export default function useCalculateDistanceFromTarget({ target }) {
  const [distance, setDistance] = useState(0);
  const { pos: current } = useGeoLocation(true);

  useEffect(() => {
    if (target && current) {
      const distance = getDistance(target, current);
      setDistance(distance);
    }
  }, [target, current]);

  return Math.round(distance / 10) / 100;
}

function getDistance(pointA, pointB) {
  const lat1 = pointA.lat / (180 / Math.PI);
  const lng1 = pointA.lng / (180 / Math.PI);
  const lat2 = pointB.lat / (180 / Math.PI);
  const lng2 = pointB.lng / (180 / Math.PI);
  const distance = 1609.344 * 3963 * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1));
  return distance;
}
