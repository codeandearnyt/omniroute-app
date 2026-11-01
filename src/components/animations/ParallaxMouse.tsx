import { useEffect, useRef, useState } from "react";

type ParallaxMouseProps = {
  factor?: number;
  className?: string;
};

export const ParallaxMouse: React.FC<ParallaxMouseProps> = ({
  factor = 20,
  className,
}) => {
  const xRef = useRef(0);
  const yRef = useRef(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const documentRect = document.documentElement.getBoundingClientRect();
      const mouseX = clientX - documentRect.left;
      const mouseY = clientY - documentRect.top;
      
      const centerX = documentRect.width / 2;
      const centerY = documentRect.height / 2;
      
      const deltaX = (mouseX - centerX) / centerX * factor;
      const deltaY = (mouseY - centerY) / centerY * factor;
      
      xRef.current = deltaX;
      yRef.current = deltaY;
      
      setPosition({
        x: deltaX,
        y: deltaY,
      });
    };

    const handleMouseLeave = () => {
      xRef.current = 0;
      yRef.current = 0;
      setPosition({ x: 0, y: 0 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [factor]);

  return (
    <div
      className={cn("relative", className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
};