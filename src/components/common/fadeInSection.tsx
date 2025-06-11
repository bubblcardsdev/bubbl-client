import { useEffect, useRef, useState } from 'react';

export default function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(entry.target); // Unobserve to stop watching
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ${
        hasAnimated ? 'animate-fadeIn' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
