const PricingTable = () => {
    return (
        <div className=" flex items-center justify-center bg-black px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="bg-black text-white p-6 rounded-[6px] border border-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold ">Starter</h3>
                    <p className="text-gray-400 mt-2 ">For developers testing out <br/> Liveblocks locally.</p>
                    <p className="text-3xl font-bold mt-4 ">Free</p>
                    <button className="w-full mt-4 bg-[#0F0F10] hover:bg-gray-600 text-white py-2 px-4 rounded ">Start building for free</button>
                    <ul className="mt-6 space-y-2 text-gray-300 ">
                        <li>&#10003; WebSocket infrastructure</li>
                        <li>&#10003; Pre-built components</li>
                        <li>&#10003; Community support</li>
                    </ul>
                </div>
                <div className="bg-[#0F0F10] text-white p-6 rounded-[6px] border border-zinc-800   shadow-lg relative">
                    <span className="absolute top-4 right-4 bg-purple-600 text-xs text-white px-2 py-1 rounded-[10px] ">Most popular</span>
                    <h3 className="text-xl font-semibold ">Pro</h3>
                    <p className="text-gray-400 mt-2 ">For companies adding collaboration in production.</p>
                    <p className="text-3xl font-bold mt-4 ">₹199 <span className="text-lg font-normal ">/month</span></p>
                    <button className="w-full mt-4 bg-white text-black py-2 px-4 rounded">Sign up</button>
                    <ul className="mt-6 space-y-2 text-gray-300 ">
                        <li>&#10003; WebSocket infrastructure</li>
                        <li>&#10003; Pre-built components</li>
                        <li>&#10003; Email support</li>
                    </ul>
                </div>
                <div className="bg-black text-white p-6 rounded-[6px] border border-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold ">Enterprise</h3>
                    <p className="text-gray-400 mt-2 ">For organizations that need more support and compliance features.</p>
                    <p className="text-3xl font-bold mt-4 ">Custom</p>
                    <button className="w-full mt-4 bg-[#0F0F10] hover:bg-gray-600 text-white py-2 px-4 rounded">Contact us</button>
                    <ul className="mt-6 space-y-2 text-gray-300 ">
                        <li>&#10003; WebSocket infrastructure</li>
                        <li>&#10003; Pre-built components</li>
                        <li>&#10003; Premium support</li>
                        <li>&#10003; 99.9% Uptime SLA</li>
                        <li>&#10003; Private dedicated servers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PricingTable;
