import { useRouter } from "next/router";

/**
 * Full-screen 404 (Not Found) React page that displays responsive background video and a "Back to Home" button.
 *
 * Renders mobile and desktop background videos ("/video/m_404_v2.mp4" for small screens, "/video/404_v2.mp4" for md+)
 * that autoplay, loop, and are muted. A centered action button at the lower portion of the viewport navigates to the
 * root path ("/") using the Next.js router when clicked.
 *
 * @returns The NotFound page as a React element.
 */
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover md:hidden"
        style={{ objectPosition: "center center" }}
      >
        <source src="/video/m_404_v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
        style={{ objectPosition: "center center" }}
      >
        <source src="/video/404_v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-[20%] left-0 right-0 flex justify-center">
        <button
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
