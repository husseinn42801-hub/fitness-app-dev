import React, { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1000,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!end || end <= 0) {
      setCount(end || 0);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing curve: easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeOut * end);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
