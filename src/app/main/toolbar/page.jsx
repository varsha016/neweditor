// "use client"
// import React from 'react';
// import { FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaParagraph } from 'react-icons/fa';

// const Toolbar = ({ executeCommand, fontSize, handleFontSizeChange, fontSizes, editor, handleAddParagraph }) => {
//     // console.log(fontSizes, "fontSizesfontSizesfontSizesfontSizes");

//     return (<>
//         <div className="toolbar bg-purple-300 p-2 pl-8  flex items-center space-x-2 border-b rounded-md">
//             {editor && <>
//                 {/* <button
//                     onClick={() => executeCommand('undo')}
//                     className="p-2 hover:bg-gray-200">
//                     <FaUndo className="text-lg" />
//                 </button>
//                 <button
//                     onClick={() => executeCommand('redo')}
//                     className="p-2 hover:bg-gray-200">
//                     <FaRedo className="text-lg" />
//                 </button> */}
//                 <select
//                     value={fontSize}
//                     onChange={handleFontSizeChange}
//                     className="px-4 py-2 border rounded-md"
//                 >
//                     {fontSizes?.map((size) => (
//                         <option key={size} value={size}>
//                             {size}px
//                         </option>
//                     ))}
//                 </select>


//                 <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200">
//                     <FaBold className="text-lg" />
//                 </button>
//                 <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200">
//                     <FaItalic className="text-lg" />
//                 </button>
//                 <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200">
//                     <FaUnderline className="text-lg" />
//                 </button>
//                 <button
//                     onClick={handleAddParagraph}
//                     className="p-2 hover:bg-gray-200"
//                 >
//                     <FaParagraph className="text-lg" />
//                 </button>


//             </>}
//             {/* <button
//                 onClick={() => executeCommand('undo')}
//                 className="p-2 hover:bg-gray-200">
//                 <FaUndo className="text-lg" />
//             </button>
//             <button
//                 onClick={() => executeCommand('redo')}
//                 className="p-2 hover:bg-gray-200">
//                 <FaRedo className="text-lg" />
//             </button>
//             <select
//                 value={fontSize}
//                 onChange={handleFontSizeChange}
//                 className="px-4 py-2 border rounded-md"
//             >
//                 {fontSizes?.map((size) => (
//                     <option key={size} value={size}>
//                         {size}px
//                     </option>
//                 ))}
//             </select>


//             <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200">
//                 <FaBold className="text-lg" />
//             </button>
//             <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200">
//                 <FaItalic className="text-lg" />
//             </button>
//             <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200">
//                 <FaUnderline className="text-lg" />
//             </button> */}
//         </div>
//     </>

//     );
// };

// export default Toolbar;

"use client";
import React, { useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaParagraph, FaPencilAlt } from "react-icons/fa";

const Toolbar = ({ executeCommand, fontSize, handleFontSizeChange, fontSizes, editor, handleAddParagraph }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleToolbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="ml-4 sm:ml-6 md:ml-12 lg:ml-24">
            <div
                className={`flex items-center border-b rounded-full bg-purple-300 p-2 transition-all duration-500 ease-in-out`}
                style={{
                    width: isExpanded ? "100%" : "3rem", // Smooth width transition
                    maxWidth: isExpanded ? "32rem" : "3rem", // Max width to control expansion
                    overflow: "hidden",
                    height: "3rem",
                }}
            >
                <button onClick={toggleToolbar} className="p-2 hover:bg-gray-200 rounded-full">
                    <FaPencilAlt className="text-lg" />
                </button>

                <div
                    className={`flex flex-wrap items-center space-x-2 ml-2 transition-opacity duration-500 ease-in-out`}
                    style={{
                        opacity: isExpanded ? 1 : 0, // Smooth fade effect
                        pointerEvents: isExpanded ? "auto" : "none", // Disable interaction when closed
                        width: isExpanded ? "100%" : "0", // Expands smoothly with width
                    }}
                >
                    <select
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        className="px-2 py-1 border rounded-md text-sm sm:px-4 sm:py-2"
                    >
                        {fontSizes?.map((size) => (
                            <option key={size} value={size}>
                                {size}px
                            </option>
                        ))}
                    </select>

                    <button onClick={() => executeCommand("bold")} className="p-2 hover:bg-gray-200">
                        <FaBold className="text-lg" />
                    </button>
                    <button onClick={() => executeCommand("italic")} className="p-2 hover:bg-gray-200">
                        <FaItalic className="text-lg" />
                    </button>
                    <button onClick={() => executeCommand("underline")} className="p-2 hover:bg-gray-200">
                        <FaUnderline className="text-lg" />
                    </button>
                    <button onClick={handleAddParagraph} className="p-2 hover:bg-gray-200">
                        <FaParagraph className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;


