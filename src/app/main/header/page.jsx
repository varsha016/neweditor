"use client"
import React, { useRef, useState } from 'react';
import { FaMicrophone, FaStop, FaSave } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';

const Header = ({ isRecording, startVoiceTyping, stopVoiceTyping, downloadPDF, saveToFile, handleButtonClick, isDropdownVisible, dropdownRef, buttonRef, handleLanguageChange, language, languageOptions, handleFontChange, fonts, selectedFont }) => {
    return (
        <header className="flex items-center justify-between text-white bg-black px-6 py-4 shadow-lg">
            <h1 className="text-4xl animate-pulse font-bold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                <HiOutlineDocumentText className="text-4xl text-gray-500 animate-pulse" />
                Code Editor
            </h1>
            <div className="relative flex items-center gap-4 z-50">
                <div className="relative">
                    <button
                        ref={buttonRef}
                        className="px-4 py-2 rounded shadow-md hover:bg-purple-500 bg-purple-600 text-white focus:ring focus:ring-purple-300 transition-all duration-300 flex items-center gap-2"
                        onClick={handleButtonClick}
                    >
                        Options
                    </button>
                    {isDropdownVisible && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 w-48 mt-2 bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
                        >
                            <div className="p-2">
                                <div className="mb-4">
                                    <label htmlFor="language" className="mr-2 font-bold">
                                        Select Language:
                                    </label>
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={handleLanguageChange}
                                        className="border px-2 py-1 text-gray-700 w-full"
                                    >
                                        {languageOptions?.map((option) => (
                                            <option key={option.code} value={option.code}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="font" className="mr-2 font-bold">
                                        Select Font:
                                    </label>
                                    <select
                                        id="font"
                                        value={selectedFont}
                                        onChange={handleFontChange}
                                        className="border px-2 py-1 text-gray-700 w-full"
                                    >
                                        {fonts?.map((font) => (
                                            <option key={font} value={font}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
                                    onClick={downloadPDF}
                                >
                                    Download as PDF
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
                                    onClick={saveToFile}
                                >
                                    <FaSave className="mr-2 inline" />
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded shadow-md transition-all duration-300 ${isRecording
                        ? 'bg-red-500 hover:bg-red-600 focus:ring focus:ring-red-300'
                        : 'hover:bg-purple-500 bg-purple-600 focus:ring focus:ring-purple-300'}`}
                    onClick={isRecording ? stopVoiceTyping : startVoiceTyping}
                >
                    {isRecording ? <FaStop /> : <FaMicrophone />}
                    {isRecording ? 'Stop' : 'Start'} Voice Typing
                </button>
            </div>
        </header>
    );
};

export default Header;