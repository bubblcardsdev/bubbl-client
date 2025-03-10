"use client"
import React, { useState } from 'react'
import PricingPlan from '../plans/pricingPlans/pricingPlans'
import Footer from '../footerPage/footerPage'
function Plans() {
  const [planIndex, setPlanIndex] = useState(0)
  const data = [
    {
      name: 'Base price',
      free: 'Free',
      pro: '₹720/month',
      custom: 'Custom'
    },
    {
      name: 'Monthly active users included',
      free: '50',
      pro: '6,000',
      custom: 'Custom'
    },
    {
      name: 'Monthly active users overage rate',
      free: '-',
      pro: '₹0.12 per user',
      custom: 'Custom'
    },
    {
      name: 'Monthly active users cap',
      free: '50',
      pro: '25,000',
      custom: 'Unlimited'
    },
    {
      name: 'Simultaneous connections per room',
      free: '10',
      pro: '50',
      custom: 'Custom'
    },
    {
      name: 'Simultaneous connections per project',
      free: '1,000',
      pro: '100,000',
      custom: 'Unlimited'
    },
    {
      name: 'Projects',
      free: '2',
      pro: '100',
      custom: '100'
    },
    {
      name: 'Comments',
      free: '✓',
      pro: '✓',
      custom: '✓'
    },
    {
      name: 'Mentions',
      free: '✓',
      pro: '✓',
      custom: '✓'
    },
    {
      name: 'Resolve threads',
      free: '✓',
      pro: '✓',
      custom: '✓'
    },
    {
      name: 'Emoji reactions',
      free: '✓',
      pro: '✓',
      custom: '✓'
    },
    {
      name: 'Custom metadata',
      free: '✓',
      pro: '✓',
      custom: '✓'
    },
  ]

  const selectedIndex = (index) => {
    setPlanIndex(index)
  }
  return (
    <div className='bg-black '>
      <div className='py-20 lg:px-16 md:px-14 sm:px-10 xs:px-1  flex flex-col gap-y-16 max-w-[1300px] mx-auto'>
        <section id="plansBlackBg" className='flex flex-col justify-center'>
          <div className=' text-center'>
            <p className='text-[#9747FF] inter p-4 text-2xl'>Pricings</p>
            <p className='text-white text-5xl font-bold inter '>Level up with Bubbl pro </p>
            <p className='text-gray-400  mt-8 inter'>Use the core product for free, forever. </p>
          </div>
        </section>
        <PricingPlan />
        {/* table */}
        <section id="plansBlackBg" className=" bg-black text-gray-300 lg:block md:block sm:hidden xs:hidden">
          <div className="max-w-7xl mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 ">
                  <th className="p-4 text-left"></th>
                  <th className="p-4 text-left">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white inter">Starter</h2>
                      <a href="#" className="text-sm text-gray-400 hover:text-white inline-flex items-center inter">
                        Start building for free
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th className="p-4 text-left bg-[#0F0F10] rounded-t-lg">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white">Pro</h2>
                      <a href="#" className="text-sm text-gray-400 hover:text-white inline-flex items-cente inter">
                        Sign up
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th className="p-4 text-left">
                    <div className="space-y-2 ">
                      <h2 className="text-xl font-semibold text-white inter">Enterprise</h2>
                      <a href="#" className="text-sm text-gray-400 hover:text-white inline-flex items-center inter">
                        Contact us
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Base price</td>
                  <td className="p-4 inter">Free</td>
                  <td className="p-4 bg-[#1D1D1D] inter">₹720/month</td>
                  <td className="p-4 inter">Custom</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Monthly active users included</td>
                  <td className="p-4 inter">50</td>
                  <td className="p-4 bg-[#1D1D1D] inter">6,000</td>
                  <td className="p-4 inter">Custom</td>
                </tr>
                <tr className="border-b inter border-zinc-800 ">
                  <td className="p-4 inter">Monthly active users overage rate</td>
                  <td className="p-4 inter">-</td>
                  <td className="p-4 inter bg-[#1D1D1D]">₹0.12 per user</td>
                  <td className="p-4 inter">Custom</td>
                </tr>
                <tr className="border-b border-zinc-800  inter">
                  <td className="p-4 inter">Monthly active users cap</td>
                  <td className="p-4 inter">50</td>
                  <td className="p-4 inter bg-[#1D1D1D]">25,000</td>
                  <td className="p-4 inter">Unlimited</td>
                </tr>
                <tr className="border-b inter border-zinc-800 ">
                  <td className="p-4 inter">Simultaneous connections per room</td>
                  <td className="p-4 inter">10</td>
                  <td className="p-4 inter bg-[#1D1D1D]">50</td>
                  <td className="p-4 inter">Custom</td>
                </tr>
                <tr className="border-b inter border-zinc-800 ">
                  <td className="p-4 inter">Simultaneous connections per project</td>
                  <td className="p-4 inter">1,000</td>
                  <td className="p-4 inter bg-[#1D1D1D]">100,000</td>
                  <td className="p-4 inter">Unlimited</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Projects</td>
                  <td className="p-4 inter">2</td>
                  <td className="p-4 inter bg-[#1D1D1D]">100</td>
                  <td className="p-4 inter">100</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="mr-2 inter">Comments</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </td>
                  <td className="p-4">✓</td>
                  <td className="p-4 bg-[#1D1D1D]">✓</td>
                  <td className="p-4">✓</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Mentions</td>
                  <td className="p-4">✓</td>
                  <td className="p-4 bg-[#1D1D1D]">✓</td>
                  <td className="p-4">✓</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Resolve threads</td>
                  <td className="p-4">✓</td>
                  <td className="p-4 bg-[#1D1D1D]">✓</td>
                  <td className="p-4">✓</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Emoji reactions</td>
                  <td className="p-4">✓</td>
                  <td className="p-4 bg-[#1D1D1D]">✓</td>
                  <td className="p-4">✓</td>
                </tr>
                <tr className="border-b border-zinc-800 ">
                  <td className="p-4 inter">Custom metadata</td>
                  <td className="p-4">✓</td>
                  <td className="p-4 bg-[#1D1D1D]">✓</td>
                  <td className="p-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* moblie response */}
        <section id="plansBlackBg" className="min-h-screen bg-black text-gray-300 lg:hidden md:hidden sm:block xs:block">
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr >
                  <th className="p-4 text-left"></th>
                  {planIndex == 0 && <th className="p-4 text-center">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white inter">Starter</h2>
                      <a href="#" className="text-sm text-gray-400 hover:text-white inline-flex items-center inter">
                        Start building for free
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </th>}
                  {planIndex == 1 && <th className="p-4 text-center rounded-t-lg">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white">Pro</h2>
                      <a href="#" className="text-sm text-gray-400 hover:text-white inline-flex items-cente inter">
                        Sign up
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </th>}
                  {planIndex == 2 && <th className="p-4 text-center">
                    <div className="space-y-2 ">
                      <h2 className="text-xl font-semibold text-white inter">Enterprise</h2>
                      <a href="#" className="text-sm text-gray-400 hover:text-white inline-flex items-center inter">
                        Contact us
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </th>}
                </tr>
              </thead>
              <tbody>
                {data && data?.length > 0 && data?.map((value, index) => {
                  return (
                    <tr key={index} >
                      <td className="p-4 inter">{value?.name}</td>
                      {planIndex == 0 && <td className="p-4 inter text-center">{value?.free}</td>}
                      {planIndex == 1 && <td className="p-4 inter text-center">{value?.pro}</td>}
                      {planIndex == 2 && <td className="p-4 inter text-center">{value?.custom}</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
        <div className='lg:hidden md:hidden sm:flex xs:flex justify-between items-center sm:px-4 xs:px-[5px] xs:gap-x-2'>
          <button onClick={() => selectedIndex(0)} style={{ background: planIndex == 0 ? 'rgba(130,130,130,0.3)' : '' }} className='border border-[rgba(130,130,130,0.3)] py-1 xs:w-full sm:px-14 rounded-md text-white'> Free</button>
          <button onClick={() => selectedIndex(1)} style={{ background: planIndex == 1 ? 'rgba(130,130,130,0.3)' : '' }} className='border border-[rgba(130,130,130,0.3)] py-1 xs:w-full sm:px-14 rounded-md text-white'>Pro</button>
          <button onClick={() => selectedIndex(2)} style={{ background: planIndex == 2 ? 'rgba(130,130,130,0.3)' : '' }} className='border border-[rgba(130,130,130,0.3)] py-1 xs:w-full sm:px-14 rounded-md text-white'>Pro+</button>
        </div>
        {/* search */}
        <section id="plansBlackBg" className=" bg-black flex items-center justify-center ">
          <div className="bg-[#0B0B0B] py-20 rounded-xl lg:px-10 md:px-10 sm:px-4 xs:px-4 w-full ">
            <div className=" flex gap-14 lg:flex-row md:flex-row sm:flex-col xs:flex-col justify-around items-center">
              <div className=''>
                <h2 className="text-2xl text-white inter">
                  Join 2,000+ Bubbl Community
                </h2>
                <p className="text-gray-400 pt-2 text-left w-full inter">
                  Stay in the loop with everything you need to know.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div >
                  <input
                    type="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 inter bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-400 inter">
                    We care about your data in our{' '}
                    <a href="#" className="underline hover:text-gray-300 inter">
                      privacy policy
                    </a>
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-2 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors inter"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* footer */}
      <Footer />

    </div >
  )
}

export default Plans