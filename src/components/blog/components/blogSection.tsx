"use client";
import BlogCard from "./blogCard";
const blogPosts = [
  {
    image: "/Blog1.png",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    role: "Design",
    heading: "5 Ways NFC Cards Help You Win More Clients",
    description: "ways of nfc",
    link:"/blog/2",
  },
  {
    image: "/Blog3.png",
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    role: "Design",
    heading: "5 Ways NFC Cards Help You Win More Clients",
    description: "ways of nfc",
    link:'/blog/3',
  },
  ];

export default function BlogSection() {
  return (
    <section className="bg-black text-white  ">
      <h2 className="text-3xl font-bold mb-2">From the blog</h2>
      <p className="text-gray-400 mb-10">
        The latest industry news, interviews, technologies, and resources.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post: any, idx: number) => (
          <BlogCard key={idx} {...post} />
        ))}
      </div>
      <div className="border-b mt-[36px]"></div>
      <div className="flex justify-center mt-[30px] ">
        <button className="bg-[#9747FF] text-white px-6 py-2 rounded-lg hover:bg-[#6F17EC] transition">
          View all posts
        </button>
      </div>
    </section>
  );
}
