// // "use client";
// // import React, { useState, useEffect } from "react";

// // const SpinnerPage = () => {
// //   const [loading, setLoading] = useState(true);

// //   // Simulate loading (optional)
// //   useEffect(() => {
// //     const timer = setTimeout(() => setLoading(false), 5000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
// //       {/* Loader overlay */}
// //       {/* {loading && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
// //           <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
// //         </div>
// //       )} */}
// //       <div>
// //         <p>Loading</p>
// //          {loading && (
// //         <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin">
// //         </div>

// //       )}
// //       </div>

// //       {/* Page content */}

// //     </div>
// //   );
// // };

// // export default SpinnerPage;
// "use client";
// import React, { useState, useEffect } from "react";

// const SpinnerPage = () => {
//   const [loading, setLoading] = useState(true);

//   // Optional: simulate a delay for demonstration
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 5000); // remove if you want spinner to run indefinitely
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center  bg-gray-200 ">
//       {/* Spinner */}
//       {/* {loading && ( */}
//         <div className="flex flex-col   gap-1  w-[300px] h-[200px] items-center justify-center bg-white rounded-lg top-0">
//           <p className="text-gray-700 font-medium text-center">
//             You’re Almost Done!
//           </p>
//           <p className="text-gray-700 font-medium text-center">Redirecting to Payment </p>
//           <p className="text-gray-700 font-medium text-center">Confirmation</p>
//           <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-0"></div>
//         </div>
//       {/* )} */}

//       {/* Optional: Content to show after loading */}
//       {/* {!loading && (
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Payment Confirmed!
//           </h1>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default SpinnerPage;
"use client";
import React from "react";

const SpinnerPage = () => {
  return (
    <div className="relative  bg-gray-200 flex justify-center">
      {/* Spinner card */}
      <div className="flex flex-col items-center justify-center gap-0 bg-white rounded-lg p-6 w-[90%] max-w-sm mt-[150px] shadow-lg mb-14" >
        <p className="text-gray-700 font-medium text-center text-lg sm:text-base">
          You’re Almost Done!
        </p>
        <p className="text-gray-700 font-medium text-center text-lg sm:text-base">
          Redirecting to Payment
        </p>
        <p className="text-gray-700 font-medium text-center text-lg sm:text-base">
          Confirmation
        </p>

        <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mt-4"></div>
      </div>
    </div>
  );
};

export default SpinnerPage;
