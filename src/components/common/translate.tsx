import { useEffect, useRef, useState } from "react";

function TranslateYwithFadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(entry.target); // Unobserve to stop watching
        }
      },
      { threshold: 0.9 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasAnimated]);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500  ${
        hasAnimated ? "animate-headerFadeIn" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
export default TranslateYwithFadeIn;
