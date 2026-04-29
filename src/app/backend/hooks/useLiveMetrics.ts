"use client";

import { useState, useEffect, useCallback } from "react";

export type SparkPoint = { time: number; value: number };

export function useLiveMetrics(baseValue: number, variance: number = 20) {
  const [data, setData] = useState<SparkPoint[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: baseValue + Math.floor(Math.random() * variance * 2 - variance),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(1),
        {
          time: prev[prev.length - 1].time + 1,
          value: baseValue + Math.floor(Math.random() * variance * 2 - variance),
        },
      ]);
    }, 2500);
    return () => clearInterval(interval);
  }, [baseValue, variance]);

  return data;
}

export function useAnimatedNumber(target: number, duration: number = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [target, duration]);

  return value;
}
