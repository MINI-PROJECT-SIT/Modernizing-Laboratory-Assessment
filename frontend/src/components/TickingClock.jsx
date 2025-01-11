import React, { useState, useEffect } from "react";

export function TickingClock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds + 1) % 60);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minuteRotation = (seconds / 60) * 360;
  const hourRotation = (seconds / 60 / 12) * 360;

  return (
    <div className="w-24 h-24 rounded-full border-4 border-green-600 relative">
      <div
        className="w-1 h-10 bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom"
        style={{
          transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
          transform: `translateX(-50%) translateY(-100%) rotate(${minuteRotation}deg)`,
        }}
      />
      <div
        className="w-1 h-8 bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom"
        style={{
          transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
          transform: `translateX(-50%) translateY(-100%) rotate(${hourRotation}deg)`,
        }}
      />
    </div>
  );
}
