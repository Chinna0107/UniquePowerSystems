import React, { useRef, useState } from 'react';

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  key?: any;
  options?: {
    max?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
  };
}

export default function Tilt({ children, className = '', options = {} }: TiltProps) {
  const { max = 10, perspective = 1000, scale = 1.02, speed = 400 } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 400ms cubic-bezier(0.03,0.98,0.52,0.99)',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to the card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Normalised coordinates (-0.5 to 0.5)
    const normX = x / width;
    const normY = y / height;

    // Rotation values based on max setting
    const rotateX = -(normY * max).toFixed(2);
    const rotateY = (normX * max).toFixed(2);

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'none', // Direct mapping on mouse move for instantaneous high-end response
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`,
    });
  };

  return (
    <div
      id="tilt-card-wrapper"
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
