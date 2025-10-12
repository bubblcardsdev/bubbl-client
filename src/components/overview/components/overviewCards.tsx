"use client";
import Image from "next/image";
import { JSX, memo, useMemo } from "react";

type OverviewData = {
  totalProfiles: number;
  totalDevices: number;
  totalTapCountLast7days: number;
};

interface Props {
  overviewData?: Partial<OverviewData> | null;
  greetingName?: string;
}

const numberFmt = new Intl.NumberFormat("en-IN"); // tweak locale as needed

type Card = {
  title: string | JSX.Element;
  value: number;
  img: string;
  alt: string;
};

const OverviewCard = memo(function OverviewCard({ card }: { card: Card }) {
  return (
    <article
      className="bg-gradient-to-r from-[#1f1f1f] to-[#3b2d4d] rounded-2xl px-6 overflow-hidden
                 flex flex-row justify-between min-h-[140px] sm:min-h-[150px] relative
                 group hover:border border-[#B97CFF]/20"
    >
      {/* Text */}
      <div className="pt-6 flex flex-col justify-between max-w-[50%]">
        <h3 className="text-[13px] sm:text-[18px] text-white mb-3">
          {card.title}
        </h3>
        <p className="text-3xl sm:text-4xl font-semibold text-[#B97CFF] mb-6">
          {numberFmt.format(card.value)}
        </p>
      </div>

      {/* Image */}
      <div
        className="flex items-end justify-end relative shrink-0
             basis-[50%] "
      >
        <Image
          src={card.img}
          alt={card.alt}
          width={500}
          height={500}
          priority={false}
          sizes="(min-width:1024px) 150px, (min-width:640px) 150px, 120px"
          className="w-[120px] xl:w-[150px] absolute bottom-0 right-0 object-contain pointer-events-none select-none"
        />
      </div>
    </article>
  );
});

const Dashboard = ({ overviewData, greetingName = "there" }: Props) => {
  const safeData: OverviewData = {
    totalProfiles: overviewData?.totalProfiles || 0,
    totalDevices: overviewData?.totalDevices || 0,
    totalTapCountLast7days: overviewData?.totalTapCountLast7days || 0,
  };

  const cards: Card[] = useMemo(
    () => [
      {
        title: "No. of Profiles",
        value: safeData.totalProfiles,
        img: "/over2.png",
        alt: "Profiles overview illustration",
      },
      {
        title: "No. of Devices",
        value: safeData.totalDevices,
        img: "/over1.png",
        alt: "Devices overview illustration",
      },
      {
        title: (
          <div>
            Total Taps <br />
            (Last 7 days)
          </div>
        ),
        value: safeData.totalTapCountLast7days,
        img: "/over3.png",
        alt: "Tap activity overview illustration",
      },
    ],
    [safeData]
  );

  return (
    <div className="text-white px-4 sm:px-6 lg:px-0 py-6 space-y-8">
      {/* Greeting Section */}
      <header>
        <h1 className="text-xl sm:text-2xl font-semibold">
          Hi {greetingName},
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Customize your profile to reflect your professional identity
        </p>
      </header>

      {/* Overview Cards */}
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="sr-only">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card:Card, i:number) => (
            <OverviewCard key={i} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
