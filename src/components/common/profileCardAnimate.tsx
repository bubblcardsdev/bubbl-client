import { useEffect, useRef, useState } from 'react';

export default function ProfileCardAnimate({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isShrinking, setIsShrinking] = useState(false);
  const [width, setWidth] = useState<number>(100);
  const prevY = useRef<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentY = entry.boundingClientRect.y;
        console.log(entry.boundingClientRect.top,"//",entry.boundingClientRect.bottom);
        

        // Detect scroll direction
        if (prevY.current !== null) {
          if (currentY < prevY.current) {
            setScrollDirection("down");
          } else if (currentY > prevY.current) {
            setScrollDirection("up");
          }
        }
        prevY.current = currentY;

        // Still use ratio to determine visibility threshold
        const ratio = entry.intersectionRatio;
       setIsShrinking(ratio > 0.8);
      },
      { threshold: 0.8}
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Handle width change based on scroll direction and shrinking state
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (scrollDirection === "down" && isShrinking && width > 97) {
      interval = setInterval(() => {
        setWidth((prev) => {
          if (prev > 97) return prev - 1;
          if (interval) clearInterval(interval);
          return prev;
        });
      }, 100);
    }

    if (scrollDirection === "up" && width < 100) {
      interval = setInterval(() => {
        setWidth((prev) => {
          if (prev < 100) return prev + 1;
          if (interval) clearInterval(interval);
          return prev;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scrollDirection, isShrinking, width]);

  return (
    <div
      ref={ref}
      style={{ maxWidth: `${width}%` }}
      className="lg:transition-all duration-800 delay-100 ease-in-out mx-auto"
    >
      {children}
    </div>
  );
}
