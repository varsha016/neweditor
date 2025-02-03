



"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    FaMicrophone, FaStop, FaRulerCombined, FaSave, FaAngleLeft, FaAngleRight,
    FaRedo, FaUndo, FaTable, FaMinus, FaPlus, FaUnderline, FaItalic, FaBold,
    FaAlignRight, FaAlignCenter, FaAlignLeft, FaPalette
} from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

const languageOptions = [
    { code: "en-US", name: "English", fonts: ["Arial", "Times New Roman", "Georgia", "Verdana", "Courier New"] },
    { code: "es-ES", name: "Spanish", fonts: ["Arial", "Georgia", "Helvetica", "Times New Roman", "Verdana"] },
    { code: "fr-FR", name: "French", fonts: ["Garamond", "Arial", "Georgia", "Courier New", "Times New Roman"] },
    { code: "hi-IN", name: "Hindi", fonts: ["Mangal", "Lohit Devanagari", "Noto Sans Devanagari", "Samyak Devanagari", "Kokila"] },
    { code: "mr-IN", name: "Marathi", fonts: ["Mangal", "Lohit Devanagari", "Noto Sans Devanagari", "Samyak Devanagari", "Shree Devanagari 714"] }
];

const Editor = () => {
    const router = useRouter();
    const [text, setText] = useState('');
    const [language, setLanguage] = useState(languageOptions[0].code);
    const [orientation, setOrientation] = useState('portrait');
    const [pageSize, setPageSize] = useState({ width: 21.0, height: 29.7 });
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [fileName, setFileName] = useState('');
    const [margins, setMargins] = useState({ top: 1, bottom: 2, left: 1, right: 1 });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [paginatedPages, setPaginatedPages] = useState([""]);
    const [fontSize, setFontSize] = useState(16);
    const [alignment, setAlignment] = useState('left');
    const [fonts, setFonts] = useState(languageOptions[0].fonts);
    const [selectedFont, setSelectedFont] = useState(fonts[0]);
    const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: text,
        onUpdate: ({ editor }) => {
            const updatedText = editor.getHTML();
            setText(updatedText);
            paginateText(updatedText);
        },
    });


    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleButtonClick = () => setIsDropdownVisible((prev) => !prev);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.lang = language;
            recognitionInstance.onresult = (event) => {
                const latestResult = event.results[event.results.length - 1];
                if (latestResult.isFinal) {
                    const transcript = latestResult[0].transcript.trim();
                    if (editor) {
                        editor.commands.focus();
                        editor.commands.insertContent(transcript + '\n');
                    }
                }
            };
            setRecognition(recognitionInstance);
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    }, [language, editor]);

    const startVoiceTyping = () => {
        if (recognition) {
            recognition.start();
            setIsRecording(true);
        }
    };

    const stopVoiceTyping = () => {
        if (recognition) {
            recognition.stop();
            setIsRecording(false);
        }
    };

    const paginateText = (text) => {
        const lineHeight = fontSize * 1.2; // Line height
        const maxLinesPerPage = Math.floor((pageSize.height * 37.8) / lineHeight); // Max lines per page
        const maxCharsPerLine = Math.floor((pageSize.width * 37.8) / (fontSize * 0.5)); // Max characters per line

        const words = text.split(" "); // Split words by spaces
        let currentPage = []; // Array to hold current page content
        let pages = []; // Array to hold all pages
        let line = ""; // Holds current line

        words.forEach((word) => {
            // Check if the word fits on the current line
            if ((line + word).length <= maxCharsPerLine) {
                line += word + " "; // Add word to the line
            } else {
                currentPage.push(line.trim()); // Push current line to current page
                line = word + " "; // Start new line with the current word

                // If the page is full, push it to the pages array
                if (currentPage.length >= maxLinesPerPage) {
                    pages.push(currentPage.join("\n"));
                    currentPage = [];
                }
            }
        });

        if (line.trim()) currentPage.push(line.trim()); // Add remaining text
        if (currentPage.length) pages.push(currentPage.join("\n")); // Push the last page

        // Update the pages state
        setPaginatedPages(pages);

        // Update the editor content dynamically to reflect the pagination
        if (editor) {
            editor.commands.setContent(pages.join("\n\n"));
        }
    };


    const downloadPDF = async () => {
        if (!isVerified) {
            alert("You must verify your email before downloading.");
            navigateToVerificationPage();
            return;
        }

        const doc = new jsPDF({
            orientation: orientation,
            unit: "cm",
            format: [pageSize.width, pageSize.height],
        });

        // Loop through each page and add it to the PDF
        for (let i = 0; i < paginatedPages.length; i++) {
            if (i > 0) doc.addPage();
            const pageElement = document.querySelector(`.editor-page:nth-child(${i + 1})`);

            if (pageElement) {
                const canvas = await html2canvas(pageElement, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL("image/png");
                doc.addImage(
                    imgData,
                    "PNG",
                    margins.left,
                    margins.top,
                    pageSize.width - margins.left - margins.right,
                    pageSize.height - margins.top - margins.bottom
                );
            }
        }

        doc.save("document.pdf");
    };



    const saveToFile = () => {
        if (!isVerified) {
            alert("You must verify your email before saving.");
            navigateToVerificationPage();
            return;
        }

        if (!paginatedPages.length) {
            alert("No content to save.");
            return;
        }

        const formattedText = paginatedPages
            .map((page, index) => `--- Page ${index + 1} ---\n${page}`)
            .join("\n\n");

        const blob = new Blob([formattedText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "document.txt";
        link.click();
        URL.revokeObjectURL(url);
    };

    const executeCommand = (command) => {
        if (!editor) return;

        switch (command) {
            case 'undo': editor.chain().focus().undo().run(); break;
            case 'redo': editor.chain().focus().redo().run(); break;
            case 'font-increase': setFontSize((prev) => prev + 1); break;
            case 'font-decrease': setFontSize((prev) => (prev > 1 ? prev - 1 : prev)); break;
            case 'bold': editor.chain().focus().toggleBold().run(); break;
            case 'italic': editor.chain().focus().toggleItalic().run(); break;
            case 'underline': editor.chain().focus().toggleUnderline().run(); break;
            default: console.warn(`Command ${command} is not supported.`);
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        const selectedLanguageOption = languageOptions.find((option) => option.code === selectedLanguage);
        if (selectedLanguageOption) {
            setFonts(selectedLanguageOption.fonts);
            setSelectedFont(selectedLanguageOption.fonts[0]);
        }
    };

    const handleFontChange = (e) => setSelectedFont(e.target.value);

    useEffect(() => {
        const verified = localStorage.getItem("isVerified") === "true";
        setIsVerified(verified);
    }, []);

    const navigateToVerificationPage = () => router.push('/user');

    return (
        <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
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
                                            {languageOptions.map((option) => (
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
                                            {fonts.map((font) => (
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

            <div className="flex h-screen w-full">
                <aside
                    className={`transition-all font-[Proxima Nova] font-bold duration-500 ease-in-out ${isLeftSidebarVisible ? "w-80" : "w-40"}
        hover:bg-purple-500 bg-purple-600 shadow-lg p-4`}
                >
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-200">
                            <FaRulerCombined className="text-pink-300" /> Page Layout
                        </h2>
                        <button
                            onClick={() => setIsLeftSidebarVisible((prev) => !prev)}
                            className="text-white"
                        >
                            {isLeftSidebarVisible ? <FaAngleLeft /> : <FaAngleRight />}
                        </button>
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-gray-200 font-medium text-lg">Page Size (cm):</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                className="w-1/2 px-2 py-2 rounded shadow-lg"
                                placeholder="Width"
                                value={pageSize.width || ''}
                                onChange={(e) => {
                                    const width = parseFloat(e.target.value);
                                    if (width > 0) {
                                        setPageSize((prev) => ({ ...prev, width }));
                                    }
                                }}
                            />
                            <input
                                type="number"
                                className="w-1/2 px-2 py-2 rounded shadow-lg"
                                placeholder="Height"
                                value={pageSize.height || ''}
                                onChange={(e) => {
                                    const height = parseFloat(e.target.value);
                                    if (height > 0) {
                                        setPageSize((prev) => ({ ...prev, height }));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-200 font-medium text-lg">Margins (cm):</label>
                        <div className="flex flex-col gap-2">
                            {["top", "bottom", "left", "right"].map((side) => (
                                <div key={side} className="flex justify-between">
                                    <label className="text-gray-200 capitalize">{side}:</label>
                                    <input
                                        type="number"
                                        className="w-1/3 px-2 py-2 rounded shadow-lg"
                                        value={margins[side]}
                                        onChange={(e) =>
                                            setMargins((prev) => ({ ...prev, [side]: parseFloat(e.target.value) }))
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <main
                    className={`transition-all duration-300  rounded-lg shadow-lg ${isLeftSidebarVisible ? "w-4/5" : "w-screen"
                        } p-4`}
                >
                    <div className='bg-gray-900'>
                        <header className="bg-gray-800 text-white p-4 flex justify-between">
                            <h2 className="text-lg font-bold text-purple-100">Awesome code editor with Toolbar</h2>
                        </header>

                        <div className="toolbar bg-purple-300 p-2 pl-8  flex items-center space-x-2 border-b">
                            <button onClick={() => executeCommand('undo')} className="p-2 hover:bg-gray-200">
                                <FaUndo className="text-lg" />
                            </button>
                            <button onClick={() => executeCommand('redo')} className="p-2 hover:bg-gray-200">
                                <FaRedo className="text-lg" />
                            </button>
                            <button onClick={() => executeCommand('font-increase')} className="p-2 hover:bg-gray-200">
                                <FaPlus className="text-lg" />
                            </button>
                            <button onClick={() => executeCommand('font-decrease')} className="p-2 hover:bg-gray-200">

                                <FaMinus className="text-lg" />
                            </button>

                            <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200">
                                <FaBold className="text-lg" />
                            </button>
                            <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200">
                                <FaItalic className="text-lg" />
                            </button>
                            <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200">
                                <FaUnderline className="text-lg" />
                            </button>
                        </div>
                        <div className="editor-container flex flex-wrap justify-center p-4">
                            {paginatedPages?.map((pageContent, index) => (
                                <div
                                    key={index}
                                    className="editor-page bg-white border shadow-lg mb-4 p-6 rounded-lg relative"
                                    style={{
                                        width: `${pageSize.width}cm`,
                                        height: `${pageSize.height}cm`,
                                        fontSize: `${fontSize}px`,
                                        fontFamily: selectedFont,
                                        padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
                                        overflow: "hidden",
                                        pageBreakAfter: "always", // Add page break after each page
                                    }}
                                >
                                    <span className="absolute top-1 right-1 text-gray-400">Page {index + 1}</span>
                                    <EditorContent editor={editor} content={pageContent} />
                                </div>
                            ))}
                        </div>





                    </div>
                </main>
            </div>
        </div>
    );
};

export default Editor;