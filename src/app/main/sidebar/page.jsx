
"use client"
import { useState, useEffect } from 'react';
import { FaRulerCombined, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Sidebar = ({
    isLeftSidebarVisible,
    setIsLeftSidebarVisible,
    orientation,
    setOrientation,
    selectedSize,
    handlePageSizeChange,

    margins,
    setMargins,
    downloadDraftFile,
    handleAddParagraph,
    pageSizes,
    // isTyping
}) => {
    const [clientMargins, setClientMargins] = useState(null);
    console.log("Parent Props:", {
        isLeftSidebarVisible,
        orientation,
        selectedSize,
        margins,
        pageSizes,
    });
    // Using useEffect to defer initialization until after the component mounts
    useEffect(() => {


        setClientMargins(margins); // Set margins once the component has mounted
    }, [margins]);

    if (clientMargins === null) {
        return null; // Prevent rendering until clientMargins is set
    }

    return (
        <aside className={`transition-all font-[Proxima Nova] font-bold duration-500 ease-in-out ${isLeftSidebarVisible ? "w-80" : "w-40"} hover:bg-purple-500 bg-purple-600 shadow-lg p-4`}>
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-200">
                    <FaRulerCombined className="text-pink-300" /> Page Layout
                </h2>
                <button onClick={() => setIsLeftSidebarVisible((prev) => !prev)} className="text-white">
                    {isLeftSidebarVisible ? <FaAngleLeft /> : <FaAngleRight />}
                </button>
            </div>

            {/* Orientation Selection */}
            <div className="mb-4">
                <label className="block text-white font-medium text-lg">Orientation:</label>
                <select
                    className="w-full text-gray-400 outline-none px-2 py-2 rounded shadow-lg"
                    id="orientation"
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                >
                    <option className="text-lg" value="portrait">
                        Portrait
                    </option>
                    <option className="text-lg" value="landscape">
                        Landscape
                    </option>
                </select>
            </div>


            {/* Page Size Selection */}
            <div className="mb-4">
                <label className="block text-gray-200 font-medium text-lg">Page Size (cm):</label>
                <div className="flex gap-2">
                    <select value={selectedSize} onChange={handlePageSizeChange} className="p-2 border rounded-md w-full">
                        {Object?.keys(pageSizes || {})?.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Margins Inputs */}
            <div className="mb-4">
                <label className="block text-gray-200 font-medium text-lg">Margins (cm):</label>
                <div className="flex flex-col gap-2">
                    {["top", "bottom", "left", "right"]?.map((side) => (
                        <div key={side} className="flex justify-between">
                            <label className="text-gray-200 capitalize">{side}:</label>
                            <input
                                type="number"
                                className="w-1/3 px-2 py-2 rounded shadow-lg"
                                value={clientMargins[side]}
                                onChange={(e) => setMargins((prev) => ({ ...prev, [side]: parseFloat(e.target.value) }))}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="mb-4">
                {/* <button
                    onClick={downloadDraftFile}
                    disabled={isTyping}
                    className={`mt-4 px-6 py-2 rounded-lg shadow-md transition-all duration-300 w-full sm:w-auto text-center ${isTyping ? "bg-gray-400 cursor-not-allowed" : "bg-white hover:bg-purple-300 text-slate-600"
                        }`}
                >
                    Restore
                </button> */}

                {/* <button
                    onClick={downloadDraftFile}
                    className="mt-4 px-6 py-2 text-slate-600 bg-white rounded-lg shadow-md hover:bg-purple-300 transition-all duration-300 w-full sm:w-auto text-center"
                >
                    Restore
                </button> */}

            </div>
        </aside>
    );
};

export default Sidebar;




// "use client";
// import { useState, useEffect } from "react";
// import { FaRulerCombined, FaAngleLeft, FaAngleRight } from "react-icons/fa";

// const Sidebar = ({
//     isLeftSidebarVisible,
//     setIsLeftSidebarVisible,
//     orientation,
//     setOrientation,
//     selectedSize,
//     handlePageSizeChange,
//     margins,
//     setMargins,
//     pageSizes,
// }) => {
//     const [clientMargins, setClientMargins] = useState(null);

//     useEffect(() => {
//         if (margins) {
//             setClientMargins(margins); // Set margins once the component has mounted
//         }
//     }, [margins]);

//     if (clientMargins === null) {
//         return null; // Prevent rendering until clientMargins is set
//     }

//     return (
//         <aside
//             className={`transition-all font-[Proxima Nova] font-bold duration-500 ease-in-out ${isLeftSidebarVisible ? "w-80" : "w-40"
//                 } hover:bg-purple-500 bg-purple-600 shadow-lg p-4`}
//         >
//             <div className="flex justify-between">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-200">
//                     <FaRulerCombined className="text-pink-300" /> Page Layout
//                 </h2>
//                 <button
//                     onClick={() => setIsLeftSidebarVisible((prev) => !prev)}
//                     className="text-white"
//                 >
//                     {isLeftSidebarVisible ? <FaAngleLeft /> : <FaAngleRight />}
//                 </button>
//             </div>

//             {/* Orientation Selection */}
//             <div className="mb-4">
//                 <label className="block text-white font-medium text-lg">Orientation:</label>
//                 <select
//                     className="w-full text-gray-400 outline-none px-2 py-2 rounded shadow-lg"
//                     id="orientation"
//                     value={orientation}
//                     onChange={(e) => setOrientation(e.target.value)}
//                 >
//                     <option className="text-lg" value="portrait">
//                         Portrait
//                     </option>
//                     <option className="text-lg" value="landscape">
//                         Landscape
//                     </option>
//                 </select>
//             </div>

//             {/* Page Size Selection */}
//             <div className="mb-4">
//                 <label className="block text-gray-200 font-medium text-lg">Page Size (cm):</label>
//                 <div className="flex gap-2">
//                     <select
//                         value={selectedSize}
//                         onChange={handlePageSizeChange}
//                         className="p-2 border rounded-md w-full"
//                     >
//                         {Object?.keys(pageSizes || {})?.map((size) => (
//                             <option key={size} value={size}>
//                                 {size}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Margins Inputs */}
//             <div className="mb-4">
//                 <label className="block text-gray-200 font-medium text-lg">Margins (cm):</label>
//                 <div className="flex flex-col gap-2">
//                     {["top", "bottom", "left", "right"]?.map((side) => (
//                         <div key={side} className="flex justify-between">
//                             <label className="text-gray-200 capitalize">{side}:</label>
//                             <input
//                                 type="number"
//                                 className="w-1/3 px-2 py-2 rounded shadow-lg"
//                                 value={clientMargins[side]}
//                                 onChange={(e) =>
//                                     setMargins((prev) => ({
//                                         ...prev,
//                                         [side]: parseFloat(e.target.value),
//                                     }))
//                                 }
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;