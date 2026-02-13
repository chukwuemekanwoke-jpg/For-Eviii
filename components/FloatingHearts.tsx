
import React, { useEffect, useState } from 'react';
import { HeartProps } from '../types';

const FloatingHearts: React.FC = () => {
  const [petals, setPetals] = useState<HeartProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPetal: HeartProps = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * (30 - 15) + 15}px`,
        duration: `${Math.random() * (12 - 7) + 7}s`,
        delay: '0s',
      };
      setPetals(prev => [...prev.slice(-25), newPetal]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal text-rose-200 select-none"
          style={{
            left: petal.left,
            fontSize: petal.size,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
