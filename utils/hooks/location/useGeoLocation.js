import { useEffect, useState } from "react";

export default function useGeoLocation(check) {
  const [pos, setPos] = useState({});
  const [permittedStatus, setPermittedStatus] = useState(false);

  useEffect(() => {
    if (check) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
            setPermittedStatus(true);
          },
          (error) => {
            setPermittedStatus(false);
            alert("I need permission status!");
            console.log(error, error.message);
            return;
          }
        );
      } else {
        setPermittedStatus(false);
      }
    }
  }, [check]);

  return { pos, permittedStatus };
}
