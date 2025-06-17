import { useRouter } from "next/router";
import TranslateYwithFadeIn from "../../common/translate";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    const updateProgress = () => {
      if (videoEl.duration) {    
        const percentage = (videoEl.currentTime / videoEl.duration) * 100;
        setProgress(percentage);
      }
    };

    videoEl.addEventListener('timeupdate', updateProgress);

    return () => {
      videoEl.removeEventListener('timeupdate', updateProgress);
    };
  }, []);
  
  
  return (
   <>
   <style>
  {`
    progress::-webkit-progress-bar {
      background-color:gary /* gray-50 */
      border-radius: 9999px;
    }

    progress::-webkit-progress-value {
      background-color: #9747FF;
      border-radius: 9999px;
      transition: width 0.5s ease-in-out; 
    }

    progress::-moz-progress-bar {
      background-color: #9747FF;
      border-radius: 9999px;
      transition: width 0.5s ease-in-out;
    }
  `}
</style>
 <div className="relative w-full h-screen">
  <video
  autoPlay
  muted
  playsInline
  className="w-full h-screen object-cover"
  ref={videoRef}
>
<source  src="/HomePageIcons/Hero3D.mp4" type="video/mp4" />
 Your browser does not support the video tag.
</video>
   {progress < 100 ?(<TranslateYwithFadeIn key="bar"><div className="flex justify-center ">
  <progress className="w-[200px] h-[6px] rounded-full overflow-hidden  absolute translate-y-[-300%]" value={progress} max={100}></progress>
      </div> </TranslateYwithFadeIn>) : ( <TranslateYwithFadeIn key="button"> <button
      className="absolute md:bottom-[5%] bottom-[10%] left-[50%] translate-x-[-50%] xs:translate-y-[-50%] md:translate-y-[-15%] px-6 py-2 bg-[#9747FF] text-white text-base rounded-[10px] hover:bg-purple-500 transition-colors"
      onClick={() => router.push("/shop")}
    >
      Shop now
    </button> </TranslateYwithFadeIn>)} 
  
   
  
    </div>
    </>
   
  );
};

export default HeroSection;
