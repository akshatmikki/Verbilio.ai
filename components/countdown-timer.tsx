'use client';
import React, { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date('2025-06-15T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6 justify-center text-white text-center mt-8">
      {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
        <div
          key={unit}
          className="bg-[#111] px-3 py-1 rounded-xl shadow-md shadow-blue-500/20 backdrop-blur-sm border border-blue-500/10"
        >
          <div className="text-3xl font-extrabold text-blue-400">{timeLeft[unit]}</div>
          <div className="uppercase text-xs tracking-widest text-gray-300 mt-1">{unit}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;