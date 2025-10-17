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

    videoEl.addEventListener("timeupdate", updateProgress);

    return () => {
      videoEl.removeEventListener("timeupdate", updateProgress);
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
      <div className="relative w-full h-[calc(100dvh-60px)]">
        {progress === 100 && (
          <TranslateYwithFadeIn key="header">
            <div className="flex justify-center">
              <h1 className="text-white text-4xl text-center absolute top-16 font-semibold px-6">
                Network Smarter. Instantly.
              </h1>
            </div>
          </TranslateYwithFadeIn>
        )}
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-[calc(100dvh-60px)] object-cover"
          ref={videoRef}
        >
          <source src="/HomePageIcons/Hero3D.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-[10%] left-[50%] translate-x-[-50%]">
          {progress < 100 ? (
            <TranslateYwithFadeIn key="bar">
              <progress
                className="w-[200px] h-[6px] rounded-full overflow-hidden "
                value={progress}
                max={100}
              ></progress>
            </TranslateYwithFadeIn>
          ) : (
            <TranslateYwithFadeIn key="button">
              {" "}
              <button
                className=" px-6 py-2 bg-[#9747FF] text-white text-base rounded-[10px] hover:bg-purple-500 transition-colors"
                onClick={() => router.push("/shop")}
              >
                Shop now
              </button>{" "}
            </TranslateYwithFadeIn>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
