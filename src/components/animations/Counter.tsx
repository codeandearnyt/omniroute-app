import { useEffect, useRef, useState } from "react";

type CounterProps = {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  separator?: boolean;
};

export const Counter: React.FC<CounterProps> = ({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  separator = true,
}) => {
  const [current, setCurrent] = useState(0);
  const startTime = useRef(Date.now());
  const isMounted = useRef(true);

  useEffect(() => {
    const animate = () => {
      if (!isMounted.current) return;

      const elapsed = Date.now() - startTime.current.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.round(target * eased);
      setCurrent(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      isMounted.current = false;
    };
  }, [target, duration]);

  // Format number with commas if separator is true
  const formatNumber = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator ? "," : "");

  return (
    <span>
      {prefix}{formatNumber(current)}{suffix}
    </span>
  );
};