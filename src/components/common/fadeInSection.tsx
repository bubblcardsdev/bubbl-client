import { useEffect, useRef, useState } from 'react';

export default function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
  const node = ref.current; // ✅ Save ref.current to a variable

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.3 }
  );

  if (node) observer.observe(node);

  return () => {
    if (node) observer.unobserve(node); // ✅ Use saved ref
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
