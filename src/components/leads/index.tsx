"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { FaPlus, FaFilter, FaEllipsisV } from "react-icons/fa";

import Drawer from "../common/Drawer";
import {
  LeadsArrowIcon,
  SearchIcon,
  FilterIcon,
  LeadsTableMenuIcon,
  FullArrowIcon,
  LeadsLeftIcon,
} from "../common/icons";
import useWindowSize from "@/src/hooks/useWindowSize";

const leads = [
  {
    name: "Natali Craig",
    role: "Graphic designer",
    orderId: "#CM9801",
    connection: "Bubbl card 1",
    date: "Just now",
    avatar: "/IconSet.png",
  },
  {
    name: "Kate Morrison",
    role: "Front end developer",
    orderId: "#CM9803",
    connection: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/IconSet.png",
  },
  {
    name: "Drew Cano",
    role: "Designer",
    orderId: "#CM9803",
    connection: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/IconSet.png",
  },
  {
    name: "Orlando Diggs",
    role: "Designer",
    orderId: "#CM9804",
    connection: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/IconSet.png",
  },
  {
    name: "Andi Lane",
    role: "Chef",
    orderId: "#CM9805",
    connection: "Card 1",
    date: "Feb 2, 2023",
    avatar: "/IconSet.png",
  },
  {
    name: "Natali Craig",
    role: "Artist",
    orderId: "#CM9801",
    connection: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/IconSet.png",
  },
  {
    name: "Kate Morrison",
    role: "Media",
    orderId: "#CM9802",
    connection: "Bubbl card 1",
    date: "A minute ago",
    avatar: "/IconSet.png",
  },
  {
    name: "Drew Cano",
    role: "Client Project",
    orderId: "#CM9803",
    connection: "Bubbl card 1",
    date: "1 hour ago",
    avatar: "/IconSet.png",
  },
  {
    name: "Orlando Diggs",
    role: "Admin Dashboard",
    orderId: "#CM9804",
    connection: "Bubbl card 1",
    date: "Yesterday",
    avatar: "/IconSet.png",
  },
  {
    name: "Andi Lane",
    role: "App Landing Page",
    orderId: "#CM9805",
    connection: "Bubbl card 1",
    date: "Feb 2, 2023",
    avatar: "/IconSet.png",
  },
];

const parseDate = (dateStr: any) => {
  const map: any = {
    "Just now": new Date(),
    "A minute ago": new Date(Date.now() - 60 * 1000),
    "1 hour ago": new Date(Date.now() - 60 * 60 * 1000),
    "Yesterday": new Date(Date.now() - 24 * 60 * 60 * 1000),
  };
  if (map[dateStr]) return map[dateStr].getTime();
  const parsed: any = new Date(dateStr);
  return isNaN(parsed) ? 0 : parsed.getTime();
};

const sortData = (data: any, field: any, ascending: any) => {
  return [...data].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    if (field === "date") {
      aValue = parseDate(aValue);
      bValue = parseDate(bValue);
    } else {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });
};

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAction, setIsOpenAction] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [ascending, setAscending] = useState(true);
  const [sortedLeads, setSortedLeads] = useState(sortData(leads, "name", true));
  const { width } = useWindowSize();

  const handleSort = (field: any) => {
    const isAscending = field === sortField ? !ascending : true;
    setSortField(field);
    setAscending(isAscending);
    setSortedLeads(sortData(sortedLeads, field, isAscending));
  };

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const leadsPerPage = 5;
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const toggleCheckbox = (id: number) => {
    const updated = new Set(selectedLeads);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedLeads(updated);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpenAction(null);
      }
    };

    if (isOpenAction !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenAction]);


  console.log(width);
  return (
    <div className="">
      {/* <div className="bg-[#ccc] w-full"> */}
      <div className=" p-2 bg-[#2B2B2B] rounded-md items-center justify-between mt-[10px] lg:flex md:flex sm:hidden xs:hidden ">
        <div className="flex items-center  px-2 py-1.5 rounded-xl w-full max-w-[200px] border-2 border-[#393939] bg-[#232323]">
          <SearchIcon className="text-gray-400 mr-2" color={"#2B2B2B"} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-white placeholder-[#4F4F4F] w-full"
          />
        </div>
        <div className="flex items-center space-x-2 ml-4 gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a]"
          >
            <FilterIcon className="w-6 h-6" />
          </button>
          <div className="p-2 rounded-md bg-[#2B2B2B] text-white hover:bg-[#3a3a3a] flex">
            <span role="button" onClick={() => handleSort("name")}>
              <LeadsArrowIcon />
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 rounded-md bg-[#4F4F4F] text-white text-sm hover:bg-[#505050]"
          >
            + Add lead
          </button>
        </div>
      </div>
      <div className="w-full max-w-full mx-auto mt-4 rounded overflow-hidden lg:block md:block sm:hidden xs:hidden">
        <table className="w-full text-sm text-left text-white">
          <thead className="bg-[#1C1C1C] text-[#777777] text-[14px] border-b-2 border-[#494949]">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  className="accent-[#9747FF] appearance-none h-[16px] w-[17px] rounded-md border border-[#494949] bg-transparent checked:bg-[#D6D3FB] checked:border-none checked:text-black flex items-center justify-center checked:after:content-['✓'] checked:after:text-[12px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-cente"
                />
              </th>
              <th className="p-2">User</th>
              <th className="p-2">Role</th>
              <th className="p-2">Order ID</th>
              <th className="p-2">Connected with</th>
              <th className="p-2">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#323232]">
            {paginatedLeads.map((lead: any, index: number) => {
              const realIndex = (currentPage - 1) * leadsPerPage + index;
              return (

                <tr
                  key={index}
                  className="group hover:bg-[#282828] transition-colors"
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      className={`
               accent-[#9747FF] appearance-none h-[16px] w-[17px] rounded-md border border-[#535353] bg-transparent checked:bg-[#D6D3FB] checked:border-none checked:text-black flex items-center justify-center checked:after:content-['✓'] checked:after:text-[12px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-cente
                ${selectedLeads.has(index)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                        }
                transition-opacity duration-200
              `}
                      checked={selectedLeads.has(index)}
                      onChange={() => toggleCheckbox(index)}
                    />
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={lead?.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {lead?.name}
                  </td>
                  <td className="p-2">{lead?.role}</td>
                  <td className="p-2">{lead?.orderId}</td>
                  <td className="p-2">{lead?.connection}</td>
                  <td className="p-2 flex items-center gap-2">
                    <CalendarDays className="w-3 h-4 text-gray-400" />{" "}
                    {lead?.date}
                  </td>
                  <td
                    className={`
                    w-[100px]
                accent-black
               ${selectedLeads.has(index) || isOpenAction === index + 1
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"}

                transition-opacity duration-200
              `}
                  >
                    <div ref={popoverRef} className="w-full relative flex items-center justify-center">
                      <LeadsTableMenuIcon className="cursor-pointer " onClick={() => setIsOpenAction(isOpenAction === index+1 ? null : index+1)} />
                      {isOpenAction && isOpenAction == index+1 && <div className="min-w-20 rounded-md py-2 px-5 bg-black absolute top-4 z-10">
                        <p>Edit</p>
                        <p>View</p>
                      </div>}

                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-center ${currentPage === 1 ? "bg-[#444] text-gray-500 cursor-not-allowed" : "bg-[#282828] text-white"}`}
          >
            <LeadsLeftIcon />
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${page === currentPage ? "bg-white text-black" : "hover:text-white"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black"}`}
          >
            Next
            <FullArrowIcon color={currentPage === totalPages ? "#999" : "#000"} />
          </button>
        </div>
      </div>
      {/* </div> */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // title="Edit  Profile"
        // title="view profile"
        className="lg:w-96 md:w-96 sm:w-full xs:w-full"
      // width={width && width <= 576 ? "100%" : "550px"}
      >
        {/* <div className="">
          <div className=" h-[180px] w-full flex justify-center items-center px-4 ">
            <Image
              src="/IconSet.png"
              alt=""
              width={200}
              height={200}
              className="w-24 h-24 rounded-full  "
            />
          </div>
          <form className="w-full">
            <div className="flex flex-col space-y-2 mt-[15px] text-sm px-4 text-[12px] ">
              <label className="text-[#828282]">Name</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Company</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Position</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Phone Number</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Email</label>
              <input
                className="bg-[#262626] text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Location</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Website</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Where you met</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Linked in</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text-[14px]"
              />
            </div>
            <div className="flex gap-6 sticky bottom-0 h-[80px] items-center w-full px-4 justify-between bg-[#000]">
              <button
                type="submit"
                className="bg-[#39393957] hover:bg-[#9747FF] text-white py-2 px-[20px]  rounded-lg w-1/2 text-[14px]"
              >
                cancel
              </button>
              <button
                type="submit"
                className="bg-[#9747FF] hover:bg-[#252525] text-white py-2 px-[20px] rounded-lg w-1/2 text-[14px]"
              >
                save
              </button>
            </div>
          </form>
        </div> */}
        <div className=" ">
          <div className=" h-[180px] w-full flex justify-center items-center px-4  flex-col  mt-10">
            <Image
              src="/IconSet.png"
              alt=""
              width={500}
              height={500}
              className="w-[200px] h-[200px] rounded-full object-contain mb-4"
            />
            <p className="text-[30px] mb-0">Jordan Miller</p>
            <p className="">Bubbl cards</p>
          </div>
          <form className="w-full ">
            <div className="flex flex-col space-y-2 mt-[120px] text-sm px-5  text-[12px] ">
              <label className="text-[#828282]">Position</label>
              <input
                className="bg-[#262626]  text-white p-[10px] rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Phone Number</label>
              <input
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Email</label>
              <input
                className="bg-[#262626] text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Location</label>
              <input
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Website</label>
              <input
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Where you met</label>
              <input
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text"
              />
              <label className="text-[#828282]">Linked in</label>
              <input
                className="bg-[#262626]  text-white p-[10px]  rounded-md outline-none"
                type="text-[14px]"
              />
            </div>
            <div className="flex gap-6 sticky bottom-0 h-[80px] items-center w-full px-4 justify-between bg-[#000]">
              <button
                type="submit"
                className="bg-[#39393957] hover:bg-[#9747FF] text-white py-2 px-[20px]  rounded-lg w-1/2 text-[14px]"
              >
                cancel
              </button>
              <button
                type="submit"
                className="bg-[#9747FF] hover:bg-[#252525] text-white py-2 px-[20px] rounded-lg w-1/2 text-[14px]"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </Drawer>
      {/* mobile responsive leads screens */}
      <div className="w-full text-white px-4 py-6 lg:hidden md:hidden sm:block xs:block ">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-3xl font-bold">Leads</h1>
          {/* <button className="flex items-center gap-2 bg-[#2E2E2E] px-4 py-2 rounded-xl text-sm font-medium">
            <FaPlus /> Add
          </button> */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 rounded-md bg-[#4F4F4F] text-white text-sm hover:bg-[#505050]"
          >
            + Add
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5 justify-between">
          <div className="flex items-center  px-2 py-1.5 rounded-xl w-full   border-[#393939] bg-[#232323]">
            <SearchIcon className="text-gray-400 mr-2" color={"#2B2B2B"} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm text-white placeholder-[#4F4F4F] w-full"
            />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 hover:bg-[#2E2E2E] rounded-xl  "
          >
            <FilterIcon />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/card.png"
                alt="Chris Taylor"
                width={100}
                height={100}
                className="rounded-full w-10 h-10"
              />
              <div>
                <p className="font-semibold text-white leading-4">
                  Chris Taylor
                </p>
                <p className="text-sm text-gray-400">Microsoft</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>18/01/2024</span>
              <FaEllipsisV className="text-gray-500" />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/card.png"
                alt="Alex Parker"
                width={40}
                height={40}
                className="rounded-full  w-10 h-10"
              />
              <div>
                <p className="font-semibold text-white leading-4">
                  Alex Parker
                </p>
                <p className="text-sm text-gray-400">Accenture</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>24/02/2024</span>
              <FaEllipsisV className="text-gray-500" />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/card.png"
                alt="Jordan Blake"
                width={40}
                height={40}
                className="rounded-full  w-10 h-10"
              />
              <div>
                <p className="font-semibold text-white leading-4">
                  Jordan Blake
                </p>
                <p className="text-sm text-gray-400">H&M</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>16/03/2024</span>
              <FaEllipsisV className="text-gray-500" />
            </div>
          </div>

          <div className="flex items-center justify-between  pb-4 border-b border-b-gray-700">
            <div className="flex items-center gap-3 ">
              <Image
                src="/card.png"
                alt="Jessie Lane"
                width={40}
                height={40}
                className="rounded-full  w-10 h-10"
              />
              <div className="">
                <p className="font-semibold text-white leading-4">
                  Jessie Lane
                </p>
                <p className="text-sm text-gray-400">Zara</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>02/01/2024</span>
              <FaEllipsisV className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40  "
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed bottom-0  w-full overflow-auto lg:hidden md:hidden sm:block xs:block  left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="bg-[#1f1f1f] text-white rounded-t-2xl p-4">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4 sticky top-0" />
          <div className=" flex flex-col">
            <p className="text-[12px] text-gray-300 mb-4  fixed">Filter by:</p>
            <p className="text-sm font-medium mt-[30px]">Date Range</p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-3">
            <button className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm">
              Today
            </button>
            <button className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm">
              This Week
            </button>
            <button className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm">
              This Month
            </button>
            <button className="bg-[#2a2a2a] px-3 py-[12px] rounded-lg text-sm">
              Custom
            </button>
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium mt-2">Lead Type</div>
            <div className="relative mt-3 w-full">
              <select className="bg-[#2a2a2a] text-white p-3 pr-10 rounded-lg w-full text-sm border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option className="bg-[#9747FF] text-white hover:bg-[#9e76d2]">
                  Lead Capture Form
                </option>
                <option>Manual Entry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium mt-3">Amount</div>
            {/* <select className="bg-[#2a2a2a] text-white p-3 rounded w-full text-sm mt-3">
              <option className="">Newest - oldest</option>
              <option>Oldest - newest</option>
            </select> */}
            <div className="relative mt-3 w-full">
              <select className="bg-[#2a2a2a] text-white p-3 pr-10 rounded-lg w-full text-sm border border-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option className="bg-[#9747FF] text-white hover:bg-[#9e76d2]">
                  Newest - oldest
                </option>
                <option>Oldest - newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm  ">
            <button className="text-purple-400">Reset All</button>
            <button className="bg-[#9747FF] text-white px-2 py-2 rounded-lg ">
              Apply Filters(2)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Leads;