const PricingTable = () => {
    return (
        <div className=" flex items-center justify-center bg-black px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Starter Plan */}
                <div className="bg-black text-white p-6 rounded-lg border border-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold inter">Starter</h3>
                    <p className="text-gray-400 mt-2 inter">For developers testing out Liveblocks locally.</p>
                    <p className="text-3xl font-bold mt-4 inter">Free</p>
                    <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded inter">Start building for free</button>
                    <ul className="mt-4 space-y-2 text-gray-300 inter">
                        <li>&#10003; WebSocket infrastructure</li>
                        <li>&#10003; Pre-built components</li>
                        <li>&#10003; Community support</li>
                    </ul>
                </div>
                {/* Pro Plan */}
                <div className="bg-[#1D1D1D] text-white p-6 rounded-lg border border-zinc-800   shadow-lg relative">
                    <span className="absolute top-4 right-4 bg-purple-600 text-xs text-white px-2 py-1 rounded-[10px] inter">Most popular</span>
                    <h3 className="text-xl font-semibold inter">Pro</h3>
                    <p className="text-gray-400 mt-2 inter">For companies adding collaboration in production.</p>
                    <p className="text-3xl font-bold mt-0 inter">₹199 <span className="text-lg font-normal inter">/month</span></p>
                    <button className="w-full mt-3 bg-white text-black py-2 px-4 rounded inter">Sign up</button>
                    <ul className="mt-4 space-y-2 text-gray-300 inter">
                        <li>&#10003; WebSocket infrastructure</li>
                        <li>&#10003; Pre-built components</li>
                        <li>&#10003; Email support</li>
                    </ul>
                </div>
                {/* Enterprise Plan */}
                <div className="bg-black text-white p-6 rounded-lg border border-zinc-800 shadow-lg">
                    <h3 className="text-xl font-semibold inter">Enterprise</h3>
                    <p className="text-gray-400 mt-2 inter">For organizations that need more support and compliance features.</p>
                    <p className="text-3xl font-bold mt-2 inter">Custom</p>
                    <button className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded inter">Contact us</button>
                    <ul className="mt-4 space-y-2 text-gray-300 inter">
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
