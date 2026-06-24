import { useState, useEffect, useRef } from 'react';

export function useCountdown(seconds: number, onFinish: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const onFinishRef = useRef(onFinish);
  const wasActiveRef = useRef(seconds > 0);

  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  useEffect(() => {
    wasActiveRef.current = seconds > 0;
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (wasActiveRef.current) {
        wasActiveRef.current = false;
        onFinishRef.current();
      }
      return;
    }

    const id = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const display = `${minutes}:${String(secs).padStart(2, '0')}`;

  return { timeLeft, display };
}
