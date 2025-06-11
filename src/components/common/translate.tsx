import { useEffect, useRef, useState } from "react";



function TranslateYwithFadeIn({children}:{children:React.ReactNode}){

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
      { threshold: 0.9 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500  ${
        hasAnimated ? 'animate-headerFadeIn' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );



}
export default TranslateYwithFadeIn