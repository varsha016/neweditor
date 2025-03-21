// "use client"
// import React, { useRef, useState, useEffect } from 'react';
// import { FaMicrophone, FaStop, FaSave, FaPrint, FaDownload, FaOpenid, FaFile } from 'react-icons/fa';
// import { HiOutlineDocumentText } from 'react-icons/hi';

// const Header = ({ isRecording, fileName, templates, selectedTemplate, handleTemplateSelect, handlePrint, handleFileUpload, startVoiceTyping, stopVoiceTyping, downloadPDF, saveToFile, handleButtonClick, isDropdownVisible, dropdownRef, buttonRef, handleLanguageChange, language, languageOptions, handleFontChange, fonts, selectedFont }) => {
//     const fileInputRef = useRef(null);

//     const handleButtonClickSave = () => {
//         fileInputRef.current.click(); // ✅ Best way to trigger the hidden file input
//     };

//     useEffect(() => {
//         console.log(selectedTemplate, "Updated selectedTemplate");
//     }, [selectedTemplate]);

//     return (
//         <header className="flex items-center justify-between text-white bg-black px-6 py-4 shadow-lg">
//             <h1 className="text-4xl animate-pulse font-bold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                 <HiOutlineDocumentText className="text-4xl text-gray-500 animate-pulse" />
//                 Code Editor
//             </h1>
//             <div className="relative flex items-center gap-4 z-50">
//                 <div className="relative">
//                     <button
//                         ref={buttonRef}
//                         className="px-4 py-2 rounded shadow-md hover:bg-purple-500 bg-purple-600 text-white focus:ring focus:ring-purple-300 transition-all duration-300 flex items-center gap-2"
//                         onClick={handleButtonClick}
//                     >
//                         Options
//                     </button>
//                     {isDropdownVisible && (
//                         <div
//                             ref={dropdownRef}
//                             className="absolute right-0 w-48 mt-2 bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
//                         >
//                             <div className="p-2">
//                                 <div className="mb-4">
//                                     <label htmlFor="language" className="mr-2 font-bold">
//                                         Select Language:
//                                     </label>
//                                     <select
//                                         id="language"
//                                         value={language}
//                                         onChange={handleLanguageChange}
//                                         className="border px-2 py-1 text-gray-700 w-full"
//                                     >
//                                         {languageOptions?.map((option) => (
//                                             <option key={option.code} value={option.code}>
//                                                 {option.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div className="mb-4">
//                                     <label htmlFor="font" className="mr-2 font-bold">
//                                         Select Font:
//                                     </label>
//                                     <select
//                                         id="font"
//                                         value={selectedFont}
//                                         onChange={handleFontChange}
//                                         className="border px-2 py-1 text-gray-700 w-full"
//                                     >
//                                         {fonts?.map((font) => (
//                                             <option key={font} value={font}>
//                                                 {font}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className='mb-4'>
//                                     <label htmlFor="templates" className="mr-2 font-bold">
//                                         Select Templates:
//                                     </label>
//                                     <select
//                                         id="templates"
//                                         value={selectedTemplate}
//                                         onChange={(e) => handleTemplateSelect(e.target.value)}
//                                         className="mb-4 p-2 border rounded-md text-gray-700 w-full"
//                                     >
//                                         <option value="">Select a Template</option>
//                                         {Object.keys(templates).map((key) => (
//                                             <option key={key} value={key} className="border px-2 py-1 text-gray-700 w-full">
//                                                 {key}
//                                             </option>
//                                         ))}
//                                     </select>

//                                 </div>

//                                 <button
//                                     className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
//                                     onClick={downloadPDF}
//                                 >
//                                     <FaDownload className="mr-2 inline" />
//                                     Download
//                                 </button>


//                                 <button
//                                     onClick={handlePrint}
//                                     className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
//                                 >
//                                     <FaPrint className="mr-2 inline" />
//                                     Print
//                                 </button>
//                                 <button
//                                     className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
//                                     onClick={saveToFile}
//                                 >
//                                     <FaSave className="mr-2 inline" />
//                                     Save
//                                 </button>
//                                 <div className="flex flex-col">
//                                     <button
//                                         className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
//                                         onClick={handleButtonClickSave}
//                                     >
//                                         <FaFile className="mr-2 inline" />
//                                         Open File
//                                     </button>

//                                     {/* Hidden File Input */}
//                                     <input
//                                         type="file"
//                                         ref={fileInputRef}
//                                         className="hidden"
//                                         onChange={handleFileUpload}
//                                     />
//                                 </div>


//                                 {/* <input
//                                     type="file"
//                                     accept=".txt, .html"
//                                     onChange={handleFileUpload}
//                                     className="hidden"
//                                 /> */}
//                                 {/* {fileName && <p>Opened File: {fileName}</p>} */}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <button
//                     className={`flex items-center gap-2 px-4 py-2 rounded shadow-md transition-all duration-300 ${isRecording
//                         ? 'bg-red-500 hover:bg-red-600 focus:ring focus:ring-red-300'
//                         : 'hover:bg-purple-500 bg-purple-600 focus:ring focus:ring-purple-300'}`}
//                     onClick={isRecording ? stopVoiceTyping : startVoiceTyping}
//                 >
//                     {isRecording ? <FaStop /> : <FaMicrophone />}
//                     {isRecording ? 'Stop' : 'Start'} Voice Typing
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;



"use client";
import React, { useRef, useState, useEffect } from "react";
import {
    FaMicrophone,
    FaStop,
    FaSave,
    FaPrint,
    FaDownload,
    FaFile,
    FaRemoveFormat,
    FaUpload,
    FaEdit,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

const Header = ({
    isRecording,
    fileName,
    templates,
    handleRemoveTemplate,
    selectedTemplate,
    handleTemplateSelect,
    handlePrint,
    handleFileUpload,
    startVoiceTyping,
    stopVoiceTyping,
    downloadPDF,
    saveToFile,
    handleButtonClick,
    isDropdownVisible,
    dropdownRef,
    buttonRef,
    handleLanguageChange,
    language,
    languageOptions,
    handleFontChange,
    fonts,
    selectedFont,
    editor,
    // handleUpdateAndSave
}) => {
    const fileInputRef = useRef(null);

    const handleButtonClickSave = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        console.log(selectedTemplate, "Updated selectedTemplate");
    }, [selectedTemplate]);


    return (
        <header className="flex flex-wrap items-center justify-between bg-black px-4 sm:px-6 py-3 shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                <HiOutlineDocumentText className="text-gray-500 animate-pulse" />
                Text Editor
            </h1>

            <div className="relative flex items-center gap-2 sm:gap-4">
                <div className="relative">
                    <button
                        ref={buttonRef}
                        className="px-3 sm:px-4 py-2 rounded shadow-md hover:bg-purple-500 bg-purple-600 text-white focus:ring focus:ring-purple-300 transition-all duration-300 flex items-center gap-2"
                        onClick={handleButtonClick}
                    >
                        Options
                    </button>

                    {isDropdownVisible && (
                        <div
                            ref={dropdownRef}
                            className="z-10 absolute right-0 mt-2 w-40 sm:w-48 bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
                        >
                            <div className="p-3 space-y-3">
                                <div>
                                    <label htmlFor="language" className="block text-sm font-bold">
                                        Select Language:
                                    </label>
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={handleLanguageChange}
                                        className="border px-2 py-1 text-gray-700 w-full rounded-md"
                                    >
                                        {languageOptions?.map((option) => (
                                            <option key={option.code} value={option.code}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="font" className="block text-sm font-bold">
                                        Select Font:
                                    </label>
                                    <select
                                        id="font"
                                        value={selectedFont}
                                        onChange={handleFontChange}
                                        className="border px-2 py-1 text-gray-700 w-full rounded-md"
                                    >
                                        {fonts?.map((font) => (
                                            <option key={font} value={font}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="templates" className="block text-sm font-bold">
                                        Select Template:
                                    </label>
                                    <select
                                        id="templates"
                                        value={selectedTemplate}
                                        onChange={(e) => handleTemplateSelect(e.target.value)}
                                        className="p-2 border rounded-md text-gray-700 w-full"
                                    >
                                        <option value="">Select a Template</option>
                                        {Object.keys(templates)?.map((key) => (
                                            <option key={key} value={key}>
                                                {key}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                {/* <button
                                    className="w-full text-left px-3 py-2 hover:bg-purple-500 focus:outline-none rounded-md"
                                    onClick={downloadPDF}
                                >
                                    <FaDownload className="mr-2 inline" />
                                    Download
                                </button> */}
                                <button
                                    className={`w-full text-left px-3 py-2 focus:outline-none rounded-md ${!editor?.getText().trim() ? "bg-gray-300 cursor-not-allowed" : "hover:bg-purple-500"
                                        }`}
                                    disabled={!editor?.getText().trim()} // Disable if no text
                                    onClick={downloadPDF}
                                >
                                    <FaDownload className="mr-2 inline" />
                                    Download
                                </button>

                                <button
                                    onClick={handlePrint}
                                    className={`w-full text-left px-3 py-2 focus:outline-none rounded-md ${!editor?.getText().trim() ? "bg-gray-300 cursor-not-allowed" : "hover:bg-purple-500"
                                        }`}
                                    disabled={!editor?.getText().trim()} // Disable if no text
                                // className="w-full text-left px-3 py-2 hover:bg-purple-500 focus:outline-none rounded-md"
                                >
                                    <FaPrint className="mr-2 inline" />
                                    Print
                                </button>

                                <button
                                    // className="w-full text-left px-3 py-2 hover:bg-purple-500 focus:outline-none rounded-md"
                                    onClick={saveToFile}
                                    className={`w-full text-left px-3 py-2 focus:outline-none rounded-md ${!editor?.getText().trim() ? "bg-gray-300 cursor-not-allowed" : "hover:bg-purple-500"
                                        }`}
                                    disabled={!editor?.getText().trim()} // Disable if no text
                                >
                                    <FaSave className="mr-2 inline" />
                                    Save
                                </button>

                                <div>
                                    <button
                                        className="w-full text-left px-3 py-2 hover:bg-purple-500 focus:outline-none rounded-md"
                                        onClick={handleButtonClickSave}
                                    >
                                        <FaFile className="mr-2 inline" />
                                        Open File
                                    </button>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                    {/* <button
                                        className="w-full text-left px-3 py-2 hover:bg-purple-500 focus:outline-none rounded-md"
                                        onClick={handleUpdateAndSave}
                                    >
                                        <FaUpload className="mr-2 inline" />
                                        Update
                                    </button> */}
                                    <button
                                        className="w-full text-left px-3 py-2 hover:bg-purple-500 focus:outline-none rounded-md"
                                        onClick={handleRemoveTemplate}
                                    >
                                        <FaRemoveFormat className="mr-2 inline" />
                                        Remove
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    className={`flex text-white items-center gap-2 px-3 sm:px-4 py-2 rounded shadow-md transition-all duration-300 ${isRecording
                        ? "bg-red-500 hover:bg-red-600 focus:ring focus:ring-red-300 "
                        : "hover:bg-purple-500 bg-purple-600 focus:ring focus:ring-purple-300"
                        }`}
                    onClick={isRecording ? stopVoiceTyping : startVoiceTyping}
                >
                    {isRecording ? <FaStop /> : <FaMicrophone />}
                    {isRecording ? "Stop" : "Start"} Voice Typing
                </button>
            </div>
        </header>
    );
};

export default Header;
