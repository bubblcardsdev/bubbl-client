"use client";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/router";
interface BlogCardProps {
  image: string;
  author: string;
  date: string;
  role: string;
  heading: string;
  description: string;
  link?: string;
}
export default function BlogCard({
  image,
  author,
  date,
  role,
  heading,
  description,
  link,
}: BlogCardProps) {
  const router = useRouter();
  const handleNavigate = (path?:string) => {
    if(path){
    router.push(path);
    }
  };
  return (
    <div role="button"  onClick={()=>{handleNavigate(link)}}className=" rounded-lg overflow-hidden shadow-md mt-4">
      <Image
        src={image}
        alt="blog image"
        height={500}
        width={500}
        className="w-full h-48 object-cover"
      />
      <div className="px-4 py-3 text-sm flex justify-between text-[#000] bg-white rounded-[0_0px_5px_5px]">
        <span className="font-semibold">
          {author} <br /> <span className="font-normal">{date}</span>
        </span>
        <span className="font-semibold">{role}</span>
      </div>
      <div className=" pb-3 text-white text-[20px] mt-6">{heading}</div>
      <div className=" pb-3 text-gray-300 text-sm">{description}</div>
      <div className=" pb-4">
        <Link
          href="#"
          className="text-[#9747FF] text-sm font-medium hover:underline"
        >
          Read post →
        </Link>
      </div>
    </div>
  );
}
