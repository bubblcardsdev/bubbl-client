import { useState } from "react";
import SlideBar from "../../common/SlideBar";
import TreeRow from "../../common/TreePopping";
import Image from "next/image";
import FadeInSection from "../../common/fadeInSection";
import TranslateYwithFadeIn from "../../common/translate";

const Networking = () => {
  const [employee, setEmployee] = useState<number>(10);
  const [cost, setCost] = useState<number>(1000);
  const [totalPercent, setTotalPercent] = useState<number>(9900);

  function handleEmployeeCount(data: number) {
    if (data < 1) {
      setEmployee(10);
      // When resetting to default, we should also check the cost
      setTotalPercent(cost <= 1000 ? 9900 : cost); // Set default percent immediately
    } else {
      setEmployee(() => {
        const newEmployee = data * 50;
        const newTotal = newEmployee * cost;
        const newPercent = newTotal - newTotal * 0.01;

        // Check both new values, not the old ones
        if (newEmployee <= 10 && cost <= 1000) {
          setTotalPercent(9900);
        } else {
          setTotalPercent(newPercent);
        }
        return newEmployee;
      });
    }
  }

  function handlePricingCost(data: number) {
    console.log("/goesin", data);

    if (data <= 1) {
      setCost(1000);
      // When resetting to default, we should also check the employee count
      if (employee <= 10) setTotalPercent(9900); // Set default percent immediately
    } else {
      setCost(() => {
        const newCost = data * 500;
        const newTotal = newCost * employee;
        const newPercent = newTotal - newTotal * 0.01;

        // Check both new values, not the old ones
        if (employee <= 10 && newCost <= 1000) {
          setTotalPercent(9900);
        } else {
          setTotalPercent(newPercent);
        }
        return newCost;
      });
    }
  }
  return (
    <div className="w-full bg-[#ffffff] px-8 py-12 min-h-[100vh] flex overflow-hidden">
      <div className="w-full max-w-[1300px] m-auto">
        <TranslateYwithFadeIn>
          <h4 className="text-black text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
            Networking Made <span className="text-[#76C535]">Eco friendly</span>
          </h4>
        </TranslateYwithFadeIn>

        <TranslateYwithFadeIn>
          <h3 className="text-center text-[#828282] text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed xs:mb-12 sm:mb-16">
            Step into the eco-friendly future of networking with Bubbl&apos;s
            digital business cards.
          </h3>
        </TranslateYwithFadeIn>



        <FadeInSection>

          <div className="flex flex-col lg:flex-row w-full justify-center gap-[5%] items-center">
            {/* first box - responsive version */}
            <div className="group border-2 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full lg:w-1/2 rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] bg-[linear-gradient(37deg,_#F5F5F5_56.86%,_#C1FFA1_100.03%)] overflow-hidden cursor-pointer mb-5 lg:mb-0">
              <div className="p-[8%] lg:p-[10%] text-3xl sm:text-4xl md:text-5xl text-shadow font-bold">
                <h1 className="text-shadow">Connect</h1>
                <h1>
                  {" "}
                  <span className="text-[#76C535]"> Sustainably</span> with
                </h1>
                <h1>Bubbl.cards</h1>
              </div>
              <Image
                src="/HomePageIcons/earthImg.png"
                className="transform-y-[40%] translate-x-[10%] group-hover:scale-[106%] duration-[900ms] w-full h-auto"
                alt="earth"
                width={2596}
                height={2771}
                priority
              />
            </div>

            {/* second box - responsive version */}
            <div className="border-2 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full lg:w-1/2 rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] bg-[linear-gradient(37deg,_#F5F5F5_56.86%,_#C1FFA1_100.03%)] overflow-hidden">
              {/* Wallet section with proper alignment */}
              <div className="flex justify-between items-center px-[5%] lg:px-[8%] pt-[5%] lg:pt-[9%]">
                <span className="text-[#76C535] text-2xl sm:text-3xl md:text-4xl font-bold">
                  Wallet
                </span>
                <div className="flex items-center gap-2">
                  <div className="shrink-0 px-[6%]">
                    <Image
                      src="/HomePageIcons/Vector.png"
                      height={30}
                      width={30}
                      alt="wallet"
                    />
                  </div>
                  <div className="flex flex-col text-[#76C535]">
                    <span className="text-xs sm:text-sm font-semibold">
                      You Save
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-bold">
                      {totalPercent}/year
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-[5%] lg:px-[8%] text-3xl sm:text-4xl md:text-5xl py-[2%] font-bold">
                <div className="flex w-full mb-[4%] sm:mb-[2%]">
                  <div className="flex flex-col gap-1 w-[70%]">
                    <h3 className="pb-2 sm:pb-5 md:pb-3 text-[#828282] text-xs sm:text-sm font-semibold max-w-3xl">
                      No of employees in company
                    </h3>
                    <SlideBar onDataChange={handleEmployeeCount} />
                  </div>
                  <input
                    className="w-[25%] sm:w-[20%] h-[30px] ml-[5%] mt-[5%] sm:mt-[5%] rounded-lg outline-none pointer-events-none text-[#76C535] text-xs sm:text-base pl-[2%]"
                    value={employee}
                    readOnly
                  />
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col gap-1 w-[70%]">
                    <h3 className="pb-2 sm:pb-5 md:pb-3 text-[#828282] text-xs sm:text-sm font-semibold max-w-3xl">
                      Printing cost (per 500 cards)
                    </h3>
                    <SlideBar onDataChange={handlePricingCost} />
                  </div>
                  <input
                    className="w-[25%] sm:w-[20%] h-[30px] ml-[5%] mt-[5%] sm:mt-[5%] rounded-lg border-none outline-none pointer-events-none text-[#76C535] text-xs sm:text-base pl-[2%]"
                    value={`${cost} INR`}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mt-2 sm:mt-0">
                <h1 className="text-[#76C535] text-sm sm:text-base text-center font-semibold">
                  You Saved:
                </h1>
                <h2 className="text-xl sm:text-2xl text-[#76C535] font-bold text-center">
                  {Math.floor(employee / 100) + " "}Trees
                </h2>
              </div>

              <TreeRow count={Math.floor(employee / 100)} />
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Networking;
