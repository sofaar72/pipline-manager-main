import React, { useEffect, useState } from "react";

export const ProgressCircular = ({
  size = 120,
  strokeWidth = 10,
  duration = 5000, // in milliseconds
  target = 100,
  circleColor = "#e5e7eb",
  progressColor = "#3b82f6",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepTime = 20;
    const increment = (target / duration) * stepTime;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [duration, target]);

  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={circleColor}
        strokeWidth={6}
        fill="none"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={progressColor}
        strokeWidth={6}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        // strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={12}
        fill="#fff"
      >
        {Math.floor(progress)}%
      </text>
    </svg>
  );
};
