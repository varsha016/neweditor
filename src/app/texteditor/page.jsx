

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     FaMicrophone, FaStop, FaRulerCombined, FaSave, FaAngleLeft, FaAngleRight,
//     FaRedo, FaUndo, FaTable, FaMinus, FaPlus, FaUnderline, FaItalic, FaBold,
//     FaAlignRight, FaAlignCenter, FaAlignLeft, FaPalette
// } from 'react-icons/fa';
// import { HiOutlineDocumentText } from 'react-icons/hi';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useRouter } from 'next/navigation';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Bold from "@tiptap/extension-bold";
// import Italic from "@tiptap/extension-italic";
// import Underline from '@tiptap/extension-underline';
// import useDisableCopy from '../hook/page';
// // import FontSize from '../fontsize/page';
// import TextStyle from "@tiptap/extension-text-style"; // Required for font-size

// const languageOptions = [
//     { code: "hi-IN", name: "Hindi", fonts: ["Mangal", "Lohit Devanagari", "Noto Sans Devanagari", "Samyak Devanagari", "Kokila"] },
//     { code: "mr-IN", name: "Marathi", fonts: ["Mangal", "Lohit Devanagari", "Noto Sans Devanagari", "Samyak Devanagari", "Shree Devanagari 714"] },
//     { code: "bn-IN", name: "Bengali", fonts: ["SolaimanLipi", "Noto Sans Bengali", "Bangla Sangam MN", "Lohit Bengali", "Siyam Rupali"] },
//     { code: "ta-IN", name: "Tamil", fonts: ["Latha", "Noto Sans Tamil", "TAMu_Kalyani", "Lohit Tamil", "Karthika"] },
//     { code: "te-IN", name: "Telugu", fonts: ["Gautami", "Lohit Telugu", "Pothana2000", "Noto Sans Telugu", "Vemana2000"] },
//     { code: "gu-IN", name: "Gujarati", fonts: ["Shruti", "Lohit Gujarati", "Noto Sans Gujarati", "Samyak Gujarati", "Rekha"] },
//     { code: "kn-IN", name: "Kannada", fonts: ["Tunga", "Lohit Kannada", "Noto Sans Kannada", "Mallige", "Akshar Unicode"] },
//     { code: "ml-IN", name: "Malayalam", fonts: ["Kartika", "AnjaliOldLipi", "Noto Sans Malayalam", "Meera", "Rachana"] },
//     { code: "pa-IN", name: "Punjabi", fonts: ["Raavi", "Lohit Punjabi", "Noto Sans Gurmukhi", "Amrit Kurti", "Gurmukhi MN"] },
//     { code: "or-IN", name: "Odia", fonts: ["Utkal", "Lohit Odia", "Noto Sans Oriya", "Kalinga", "Oriya MN"] }
// ];
// // pagesizelogic start
// const pageSizes = {
//     A3: { width: 29.7, height: 42 }, // A3 size in cm
//     A4: { width: 21, height: 29.7 }, // A4 size in cm
//     A5: { width: 14.8, height: 21 }, // A5 size in cm
//     A6: { width: 10.5, height: 14.8 }, // A6 size in cm
//     Letter: { width: 21.6, height: 27.9 }, // Letter size in cm
//     Legal: { width: 21.6, height: 35.6 }, // Legal size in cm
//     Tabloid: { width: 27.9, height: 43.2 }, // Tabloid size in cm
// };

// const Editor = () => {
//     const router = useRouter();
//     const [text, setText] = useState('');
//     const [language, setLanguage] = useState(languageOptions[0].code);
//     const [orientation, setOrientation] = useState('portrait');
//     const [pageSize, setPageSize] = useState({ width: 21.0, height: 29.7 });
//     const [isRecording, setIsRecording] = useState(false);
//     const [recognition, setRecognition] = useState(null);
//     const [fileName, setFileName] = useState('');
//     const [margins, setMargins] = useState({ top: 1, bottom: 1, left: 1, right: 1 });
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [isVerified, setIsVerified] = useState(false);
//     const [paginatedPages, setPaginatedPages] = useState([""]);
//     // const [fontSize, setFontSize] = useState(16);
//     const [alignment, setAlignment] = useState('left');
//     const [fonts, setFonts] = useState(languageOptions[0].fonts);
//     const [selectedFont, setSelectedFont] = useState(fonts[0]);
//     const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);
//     const [lines, setLines] = useState([]);

//     const editor = useEditor({
//         extensions: [StarterKit.configure({ history: true }), Bold, Italic, Underline, TextStyle,],
//         content: text,
//         onUpdate: ({ editor }) => {
//             const updatedHTML = editor.getHTML();
//             // const updatedPlainText = editor.getText();
//             let cleanedText = updatedHTML.replace(/<\/?p>/g, "").trim();
//             // const plainText = updatedHTML.replace(/<\/p>/g, "\n").replace(/<[^>]*>?/gm, ""); // Convert to clean text
//             // setLines(plainText.split("\n"));
//             setText(cleanedText);
//             paginateText(cleanedText);
//             saveDraftToBrowser(cleanedText); // Auto-save text in browser
//         },
//     });


//     const [isDraftRestored, setIsDraftRestored] = useState(false);
//     // const editor = useEditor({
//     //     extensions: [StarterKit, Underline, TextStyle, FontSize],
//     //     content: text,
//     //     onUpdate: ({ editor }) => {
//     //         const updatedText = editor.getHTML(); // Keep HTML formatting
//     //         // const plainText = editor.getText(); // Get plain text if needed separately
//     //         setText(updatedText); // Store HTML text to keep formatting
//     //         // console.log("Plain Text:", plainText); // Use this for word count or other processing
//     //         paginateText(updatedText); // Use plain text if needed for pagination
//     //         // localStorage.setItem("draftText", updatedText); // Auto-save draft
//     //         saveDraftToBrowser(updatedText); // Auto-save text in browser
//     //         // paginateText(plainText); // Use plain text if needed for pagination
//     //     },
//     // });
//     // Restore draft only when the user returns

//     const saveDraftToBrowser = (textContent) => {
//         localStorage.setItem("draftText", textContent);
//     };



//     // ✅ Restore the draft automatically when user reopens the browser
//     useEffect(() => {
//         const savedDraft = localStorage.getItem("draftText");
//         if (savedDraft && !isDraftRestored) {
//             setText(savedDraft);
//             editor?.commands.setContent(savedDraft);
//             setIsDraftRestored(true);
//         }
//     }, [editor, isDraftRestored]);




//     // ✅ Allow user to download the draft as a text file (optional)
//     const downloadDraftFile = () => {

//         const blob = new Blob([text], { type: "text/plain" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "browser_draft.txt";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     };



//     const [fontSize, setFontSize] = useState(16); // Default font size
//     const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 34];



//     const handleFontSizeChange = (e) => {
//         const newSize = parseInt(e.target.value);
//         setFontSize(newSize);

//         if (editor) {
//             editor.chain().focus().setFontSize(`${newSize}px`).run(); // Apply font size change
//         }
//     };

//     const dropdownRef = useRef(null);
//     const buttonRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//                 buttonRef.current && !buttonRef.current.contains(event.target)) {
//                 setIsDropdownVisible(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleButtonClick = () => setIsDropdownVisible((prev) => !prev);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognitionInstance = new SpeechRecognition();
//             recognitionInstance.continuous = true;
//             recognitionInstance.lang = language;
//             recognitionInstance.onresult = (event) => {
//                 const latestResult = event.results[event.results.length - 1];
//                 if (latestResult.isFinal) {
//                     const transcript = latestResult[0].transcript.trim();
//                     if (editor) {
//                         editor.commands.focus();
//                         editor.commands.insertContent(transcript + '\n');
//                     }
//                 }
//             };
//             setRecognition(recognitionInstance);
//         } else {
//             alert('Speech recognition is not supported in this browser.');
//         }
//     }, [language, editor]);

//     const startVoiceTyping = () => {
//         if (recognition) {
//             recognition.start();
//             setIsRecording(true);
//         }
//     };

//     const stopVoiceTyping = () => {
//         if (recognition) {
//             recognition.stop();
//             setIsRecording(false);
//         }
//     };



//     const paginateText = (text) => {
//         const lineHeight = fontSize * 1.2; // Approximate line height
//         const maxLinesPerPage = Math.floor((pageSize.height * 24.8) / lineHeight); // Max lines per page
//         const maxCharsPerLine = Math.floor((pageSize.width * 37.8) / (fontSize * 0.5)); // Max characters per line

//         const words = text.split(" "); // Split text into words
//         let currentPage = []; // Holds lines for the current page
//         let pages = [...paginatedPages]; // Preserve existing pages
//         let line = ""; // Holds the current line
//         let lastPageIndex = pages.length - 1;

//         if (!pages.length) pages.push(""); // Ensure at least one page exists

//         words.forEach((word) => {
//             if ((line + word).length <= maxCharsPerLine) {
//                 line += word + " "; // Add the word to the current line
//             } else {
//                 currentPage.push(line.trim());
//                 line = word + " "; // Start a new line

//                 if (currentPage.length >= maxLinesPerPage) {
//                     pages[lastPageIndex] = currentPage.join("\n");
//                     pages.push(""); // Create a new empty page
//                     lastPageIndex++;
//                     currentPage = [];
//                 }
//             }
//         });

//         if (line.trim()) currentPage.push(line.trim());

//         if (currentPage.length > 0) {
//             pages[lastPageIndex] = currentPage.join("\n");
//         }

//         setPaginatedPages(pages);
//     };

//     // Update only the last page instead of resetting all content
//     useEffect(() => {
//         if (editor && paginatedPages.length) {
//             editor.commands.setContent(paginatedPages[paginatedPages.length - 1]);
//         }
//     }, [paginatedPages, editor]);



//     const downloadPDF = async () => {
//         if (!isVerified) {
//             alert("You must verify your email before downloading.");
//             navigateToVerificationPage();
//             return;
//         }

//         const doc = new jsPDF({
//             orientation: orientation,
//             unit: "cm",
//             format: [pageSize.width, pageSize.height],
//         });

//         // Loop through each page and add it to the PDF
//         for (let i = 0; i < paginatedPages.length; i++) {
//             if (i > 0) doc.addPage();
//             const pageElement = document.querySelector(`.editor-page:nth-child(${i + 1})`);

//             if (pageElement) {
//                 const canvas = await html2canvas(pageElement, { scale: 2, useCORS: true });
//                 const imgData = canvas.toDataURL("image/png");
//                 doc.addImage(
//                     imgData,
//                     "PNG",
//                     margins.left,
//                     margins.top,
//                     pageSize.width - margins.left - margins.right,
//                     pageSize.height - margins.top - margins.bottom
//                 );
//             }
//         }

//         doc.save("document.pdf");
//     };



//     const saveToFile = () => {
//         if (!isVerified) {
//             alert("You must verify your email before saving.");
//             navigateToVerificationPage();
//             return;
//         }

//         if (!paginatedPages.length) {
//             alert("No content to save.");
//             return;
//         }

//         const formattedText = paginatedPages
//             ?.map((page, index) => `--- Page ${index + 1} ---\n${page}`)
//             .join("\n\n");

//         const blob = new Blob([formattedText], { type: "text/plain" });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         // link.download = fileName || "document.txt";
//         link.download = fileName || "document.doc";
//         link.click();
//         URL.revokeObjectURL(url);
//     };

//     const executeCommand = (command) => {
//         console.log(command, "varsha12");

//         if (!editor) return;

//         switch (command) {
//             case 'undo': editor.chain().focus().undo().run(); break;
//             case 'redo': editor.chain().focus().redo().run(); break;
//             // case 'font-increase': setFontSize((prev) => prev + 1); break;
//             // case 'font-decrease': setFontSize((prev) => (prev > 1 ? prev - 1 : prev));
//             // break;
//             case 'bold': editor.chain().focus().toggleBold().run(); break;
//             case 'italic': editor.chain().focus().toggleItalic().run(); break;
//             case 'underline': editor.chain().focus().toggleUnderline().run(); break;
//             default: console.warn(`Command ${command} is not supported.`);
//         }
//     };


//     const handleLanguageChange = (e) => {
//         const selectedLanguage = e.target.value;
//         setLanguage(selectedLanguage);
//         const selectedLanguageOption = languageOptions.find((option) => option.code === selectedLanguage);
//         if (selectedLanguageOption) {
//             setFonts(selectedLanguageOption.fonts);
//             setSelectedFont(selectedLanguageOption.fonts[0]);
//         }
//     };

//     const handleFontChange = (e) => setSelectedFont(e.target.value);

//     useEffect(() => {
//         const verified = localStorage.getItem("isVerified") === "true";
//         console.log(verified, "verified   setIsVerified(true); // Update state");

//         setIsVerified(verified);
//     }, []);


//     const navigateToVerificationPage = () => router.push('/user');

//     // user can't start copy text

//     useDisableCopy(isVerified);
//     // user can't  end copy text




//     const [selectedSize, setSelectedSize] = useState("A4"); // Default size

//     const handlePageSizeChange = (e) => {
//         const newSize = e.target.value;
//         setSelectedSize(newSize);
//         setPageSize(pageSizes[newSize]); // Update page size in parent state
//     };
//     // pagesizelogic end
//     // add para logic
//     // Function to add a new paragraph (adds a blank space)
//     const handleAddParagraph = () => {
//         if (!editor) return;

//         editor.commands.insertContent("<br><br>"); // ✅ Works for adding paragraph spacing

//     };
//     // end  para logic

//     return (
//         <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">

//             <header className="flex items-center justify-between text-white bg-black px-6 py-4 shadow-lg">
//                 <h1 className="text-4xl animate-pulse font-bold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                     <HiOutlineDocumentText className="text-4xl text-gray-500 animate-pulse" />
//                     Code Editor
//                 </h1>
//                 <div className="relative flex items-center gap-4 z-50">
//                     <div className="relative">


//                         <button
//                             ref={buttonRef}
//                             className="px-4 py-2 rounded shadow-md hover:bg-purple-500 bg-purple-600 text-white focus:ring focus:ring-purple-300 transition-all duration-300 flex items-center gap-2"
//                             onClick={handleButtonClick}
//                         >
//                             Options
//                         </button>
//                         {isDropdownVisible && (
//                             <div
//                                 ref={dropdownRef}
//                                 className="absolute right-0 w-48 mt-2 bg-purple-600 text-white rounded-lg shadow-lg transition-all duration-300"
//                             >
//                                 <div className="p-2">
//                                     <div className="mb-4">
//                                         <label htmlFor="language" className="mr-2 font-bold">
//                                             Select Language:
//                                         </label>
//                                         <select
//                                             id="language"
//                                             value={language}
//                                             onChange={handleLanguageChange}
//                                             className="border px-2 py-1 text-gray-700 w-full"
//                                         >
//                                             {languageOptions?.map((option) => (
//                                                 <option key={option.code} value={option.code}>
//                                                     {option.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     <div className="mb-4">
//                                         <label htmlFor="font" className="mr-2 font-bold">
//                                             Select Font:
//                                         </label>
//                                         <select
//                                             id="font"
//                                             value={selectedFont}
//                                             onChange={handleFontChange}
//                                             className="border px-2 py-1 text-gray-700 w-full"
//                                         >
//                                             {fonts?.map((font) => (
//                                                 <option key={font} value={font}>
//                                                     {font}
//                                                 </option>
//                                             ))}
//                                         </select>

//                                     </div>

//                                     <button
//                                         className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
//                                         onClick={downloadPDF}
//                                     >
//                                         Download as PDF
//                                     </button>
//                                     <button
//                                         className="w-full text-left px-4 py-2 hover:bg-purple-500 focus:outline-none"
//                                         onClick={saveToFile}
//                                     >
//                                         <FaSave className="mr-2 inline" />
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <button
//                         className={`flex items-center gap-2 px-4 py-2 rounded shadow-md transition-all duration-300 ${isRecording
//                             ? 'bg-red-500 hover:bg-red-600 focus:ring focus:ring-red-300'
//                             : 'hover:bg-purple-500 bg-purple-600 focus:ring focus:ring-purple-300'}`}
//                         onClick={isRecording ? stopVoiceTyping : startVoiceTyping}
//                     >
//                         {isRecording ? <FaStop /> : <FaMicrophone />}
//                         {isRecording ? 'Stop' : 'Start'} Voice Typing
//                     </button>
//                 </div>
//             </header>

//             <div className="flex h-screen w-full">
//                 <aside
//                     className={`transition-all font-[Proxima Nova] font-bold duration-500 ease-in-out ${isLeftSidebarVisible ? "w-80" : "w-40"}
//         hover:bg-purple-500 bg-purple-600 shadow-lg p-4`}
//                 >
//                     <div className="flex justify-between">
//                         <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-200">
//                             <FaRulerCombined className="text-pink-300" /> Page Layout
//                         </h2>
//                         <button
//                             onClick={() => setIsLeftSidebarVisible((prev) => !prev)}
//                             className="text-white"
//                         >
//                             {isLeftSidebarVisible ? <FaAngleLeft /> : <FaAngleRight />}
//                         </button>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-white font-medium text-lg">Orientation:</label>
//                         <select
//                             className="w-full text-gray-400 outline-none px-2 py-2 rounded shadow-lg"
//                             id="orientation"
//                             value={orientation}
//                             onChange={(e) => setOrientation(e.target.value)}
//                         >
//                             <option className="text-lg" value="portrait">
//                                 Portrait
//                             </option>
//                             <option className="text-lg" value="landscape">
//                                 Landscape
//                             </option>
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-200 font-medium text-lg">Page Size (cm):</label>
//                         <div className="flex  gap-2">

//                             <select
//                                 value={selectedSize}
//                                 onChange={handlePageSizeChange}
//                                 className="p-2 border rounded-md w-full"
//                             >
//                                 {Object.keys(pageSizes)?.map((size) => (
//                                     <option key={size} value={size}>
//                                         {size}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-200 font-medium text-lg">Margins (cm):</label>
//                         <div className="flex flex-col gap-2">
//                             {["top", "bottom", "left", "right"]?.map((side) => (
//                                 <div key={side} className="flex justify-between">
//                                     <label className="text-gray-200 capitalize">{side}:</label>
//                                     <input
//                                         type="number"
//                                         className="w-1/3 px-2 py-2 rounded shadow-lg"
//                                         value={margins[side]}
//                                         onChange={(e) =>
//                                             setMargins((prev) => ({ ...prev, [side]: parseFloat(e.target.value) }))
//                                         }
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='mb-4 '>
//                         <button
//                             onClick={downloadDraftFile}
//                             className="mt-4 px-6 py-2 text-slate-600 bg-white rounded-lg shadow-md hover:bg-purple-300  transition-all duration-300 w-full sm:w-auto text-center"
//                         >
//                             Download Draft
//                         </button>
//                         <button
//                             onClick={handleAddParagraph}
//                             className="mt-4 px-6 py-2 text-slate-600 bg-white rounded-lg shadow-md hover:bg-purple-300  transition-all duration-300 w-full sm:w-auto text-center"
//                         >
//                             Add Paragraph
//                         </button>
//                     </div>


//                 </aside>

//                 <main
//                     className={`transition-all duration-300  rounded-lg shadow-lg ${isLeftSidebarVisible ? "w-4/5" : "w-screen"
//                         } p-4`}
//                 >
//                     <div className='bg-gray-900'>
//                         <header className="bg-gray-800 text-white p-4 flex justify-between">
//                             <h2 className="text-lg font-bold text-purple-100">Awesome code editor with Toolbar</h2>
//                         </header>

//                         <div className="toolbar bg-purple-300 p-2 pl-8  flex items-center space-x-2 border-b">
//                             <button
//                                 onClick={() => executeCommand('undo')}
//                                 // onClick={() => editor && editor.chain().focus().undo().run()}
//                                 className="p-2 hover:bg-gray-200">
//                                 <FaUndo className="text-lg" />
//                             </button>
//                             <button
//                                 onClick={() => executeCommand('redo')}
//                                 // onClick={() => editor && editor.chain().focus().redo().run()}
//                                 className="p-2 hover:bg-gray-200">
//                                 <FaRedo className="text-lg" />
//                             </button>
//                             <select
//                                 value={fontSize}
//                                 onChange={handleFontSizeChange}
//                                 className="px-4 py-2 border rounded-md"
//                             >
//                                 {fontSizes?.map((size) => (

//                                     <option key={size} value={size}>
//                                         {size}px
//                                     </option>
//                                 ))}
//                             </select>

//                             <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200">
//                                 <FaBold className="text-lg" />
//                             </button>
//                             <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200">
//                                 <FaItalic className="text-lg" />
//                             </button>
//                             <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200">
//                                 <FaUnderline className="text-lg" />
//                             </button>
//                         </div>




//                         {/*
//                         <div className="editor-container flex flex-wrap justify-center p-4">
//                             {paginatedPages?.map((pageContent, index) => (
//                                 <div
//                                     key={index}
//                                     className="editor-page bg-white border shadow-lg mb-4 p-6 rounded-lg relative"
//                                     style={{
//                                         width: `${pageSize.width}cm`,
//                                         height: `${pageSize.height}cm`,
//                                         fontSize: `${fontSize}px`,
//                                         fontFamily: selectedFont,
//                                         padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
//                                         overflow: "hidden",
//                                         pageBreakAfter: "always",

//                                     }}
//                                 >
//                                     <span className="absolute top-1 right-1 text-gray-400">Page {index + 1}</span>
//                                     {index === paginatedPages.length - 1 ? (
//                                         <EditorContent editor={editor} />
//                                     ) : (
//                                         <p className="whitespace-pre-wrap">{pageContent}</p>
//                                     )}

//                                 </div>
//                             ))}
//                         </div> */}

//                         <div className="editor-container flex flex-wrap justify-center p-4">
//                             {paginatedPages?.map((pageContent, index) => (
//                                 <div
//                                     key={index}
//                                     className="editor-page bg-white border shadow-lg mb-4 p-6 rounded-lg relative flex"
//                                     style={{
//                                         width: `${pageSize.width}cm`,
//                                         height: `${pageSize.height}cm`,
//                                         fontSize: `${fontSize}px`,
//                                         fontFamily: selectedFont,
//                                         padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
//                                         overflow: "hidden",
//                                         pageBreakAfter: "always",
//                                     }}
//                                 >
//                                     {/* Line Numbers */}
//                                     {/* <div className=" p-2 text-right w-10">
//                                         {lines?.map((_, lineIndex) => (
//                                             <div key={lineIndex} className="text-gray-800">
//                                                 {lineIndex + 1}
//                                             </div>
//                                         ))}
//                                     </div> */}

//                                     {/* Main Editor Content */}
//                                     <div className="flex-1">
//                                         <span className="absolute top-1 right-1 text-gray-400">
//                                             Page {index + 1}
//                                         </span>

//                                         {index === paginatedPages.length - 1 ? (
//                                             <EditorContent editor={editor} />
//                                         ) : (
//                                             <p className="whitespace-pre-wrap">{pageContent}</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </main>
//             </div>


//         </div>
//     );
// };

// export default Editor;














"use client"

import React, { useState, useEffect, useRef, useLayoutEffect, } from 'react';

import { HiOutlineDocumentText } from 'react-icons/hi';
// import { jsPDF } from 'jspdf';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from '@tiptap/extension-underline';
import TextStyle from "@tiptap/extension-text-style"; // Required for font-size
import useDisableCopy from '../hook/page';



import Header from '../main/header/page';
import Sidebar from '../main/sidebar/page';
import Toolbar from '../main/toolbar/page';
import templates from '../main/templates';
import EditorComponent from '../main/editorComponent/page';

const languageOptions = [
    { code: "en-IN", name: "English", fonts: ["Arial", "Times New Roman", "Calibri", "Verdana", "Georgia"] },
    { code: "hi-IN", name: "Hindi", fonts: ["Mangal", "Lohit Devanagari", "Noto Sans Devanagari", "Samyak Devanagari", "Kokila"] },
    { code: "mr-IN", name: "Marathi", fonts: ["Mangal", "Lohit Devanagari", "Noto Sans Devanagari", "Samyak Devanagari", "Shree Devanagari 714"] },
    { code: "bn-IN", name: "Bengali", fonts: ["SolaimanLipi", "Noto Sans Bengali", "Bangla Sangam MN", "Lohit Bengali", "Siyam Rupali"] },
    { code: "ta-IN", name: "Tamil", fonts: ["Latha", "Noto Sans Tamil", "TAMu_Kalyani", "Lohit Tamil", "Karthika"] },
    { code: "te-IN", name: "Telugu", fonts: ["Gautami", "Lohit Telugu", "Pothana2000", "Noto Sans Telugu", "Vemana2000"] },
    { code: "gu-IN", name: "Gujarati", fonts: ["Shruti", "Lohit Gujarati", "Noto Sans Gujarati", "Samyak Gujarati", "Rekha"] },
    { code: "kn-IN", name: "Kannada", fonts: ["Tunga", "Lohit Kannada", "Noto Sans Kannada", "Mallige", "Akshar Unicode"] },
    { code: "ml-IN", name: "Malayalam", fonts: ["Kartika", "AnjaliOldLipi", "Noto Sans Malayalam", "Meera", "Rachana"] },
    { code: "pa-IN", name: "Punjabi", fonts: ["Raavi", "Lohit Punjabi", "Noto Sans Gurmukhi", "Amrit Kurti", "Gurmukhi MN"] },
    { code: "or-IN", name: "Odia", fonts: ["Utkal", "Lohit Odia", "Noto Sans Oriya", "Kalinga", "Oriya MN"] }
];
// pagesizelogic start
const pageSizes = {
    A3: { width: 29.7, height: 42 }, // A3 size in cm
    A4: { width: 21, height: 29.7 }, // A4 size in cm
    A5: { width: 14.8, height: 21 }, // A5 size in cm
    A6: { width: 10.5, height: 14.8 }, // A6 size in cm
    Letter: { width: 21.6, height: 27.9 }, // Letter size in cm
    Legal: { width: 21.6, height: 35.6 }, // Legal size in cm
    Tabloid: { width: 27.9, height: 43.2 }, // Tabloid size in cm
};



const Editor = () => {


    const [selectedSize, setSelectedSize] = useState("A4");
    const [isDraftRestored, setIsDraftRestored] = useState(false);


    const router = useRouter();
    const [text, setText] = useState('');
    const [language, setLanguage] = useState(languageOptions[0].code);

    const [orientation, setOrientation] = useState('portrait');
    const [pageSize, setPageSize] = useState({ width: 21.0, height: 29.7 });
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [fileName, setFileName] = useState("");
    const [margins, setMargins] = useState({ top: 1, bottom: 1, left: 1, right: 1 });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [paginatedPages, setPaginatedPages] = useState([""]);

    const [alignment, setAlignment] = useState('left');
    const [fonts, setFonts] = useState(languageOptions[0].fonts);
    const [selectedFont, setSelectedFont] = useState(fonts[0]);
    const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);

    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 34];
    const [fontSize, setFontSize] = useState(fontSizes[16]); // Default font size


    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const printRef = useRef();

    // const editor = useEditor({
    //     extensions: [StarterKit, Underline, TextStyle],
    //     content: text,
    //     onUpdate: ({ editor }) => {
    //         const newHTML = editor.getHTML();
    //         if (newHTML !== text) {
    //             const previousPos = editor.state.selection.anchor; // Save cursor position
    //             setText(newHTML); // Update the text state

    //             // Restore cursor position after state and pagination updates
    //             setTimeout(() => {
    //                 editor.commands.setTextSelection(previousPos); // Restore cursor position
    //             }, 0);
    //         }
    //     },
    // });

    const pageRef = useRef([]);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const isUpdating = useRef(false); // Track content updates

    const editor = useEditor({
        extensions: [StarterKit, Underline, TextStyle],
        content: paginatedPages[currentPageIndex],
        onUpdate: ({ editor }) => {
            if (!isUpdating.current) {
                updatePagination(editor.getHTML());
                setTimeout(checkOverflow, 100); // Small delay to avoid flickering
            }
        },
    });

    useEffect(() => {
        if (editor) {
            checkOverflow();
        }
    }, [paginatedPages, currentPageIndex]);

    const checkOverflow = () => {
        const page = pageRef.current[currentPageIndex];
        const maxHeight = pageSize.height * 37.8; // Convert cm to px

        if (!page || isUpdating.current) return;

        const content = editor.getHTML();
        const words = content.split(" ");
        let pageContent = "";
        let overflowContent = "";

        let testDiv = document.createElement("div");
        testDiv.style.visibility = "hidden";
        testDiv.style.position = "absolute";
        testDiv.style.width = page.offsetWidth + "px";
        testDiv.style.padding = page.style.padding;
        testDiv.style.fontSize = `${fontSize}px`;
        testDiv.style.lineHeight = "1.5";
        document.body.appendChild(testDiv);

        for (let word of words) {
            testDiv.innerHTML = pageContent + word + " ";
            if (testDiv.scrollHeight > maxHeight) {
                overflowContent += word + " ";
            } else {
                pageContent += word + " ";
            }
        }

        document.body.removeChild(testDiv);

        if (overflowContent.trim()) {
            isUpdating.current = true; // Set flag to avoid infinite loop

            setPaginatedPages((prev) => {
                const updatedPages = [...prev];
                updatedPages[currentPageIndex] = pageContent.trim();
                updatedPages.push(overflowContent.trim());
                return updatedPages;
            });

            setTimeout(() => {
                setCurrentPageIndex((prev) => prev + 1);
                editor.commands.setContent(overflowContent.trim());
                isUpdating.current = false; // Reset flag
            }, 100);
        }
    };
    useEffect(() => {
        // Retrieve content from localStorage on component mount
        const savedContent = localStorage.getItem("editorContent");
        if (savedContent) {
            setText(savedContent);
            editor?.commands.setContent(savedContent);
        }
    }, []);

    useEffect(() => {
        // Save content to localStorage whenever text updates
        if (text) {
            localStorage.setItem("editorContent", text);
        }
    }, [text]);

    const updatePagination = (content) => {
        setPaginatedPages((prev) => {
            const updatedPages = [...prev];
            updatedPages[currentPageIndex] = content;
            localStorage.setItem("editorContent", updatedPages.join(" "));
            return updatedPages;
        });
    };

    // const updatePagination = (content) => {
    //     setPaginatedPages((prev) => {
    //         const updatedPages = [...prev];
    //         updatedPages[currentPageIndex] = content;
    //         return updatedPages;
    //     });
    // };


    // download in pdf
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

        try {
            // Loop through each page and capture its content as an image
            for (let i = 0; i < paginatedPages.length; i++) {
                if (i > 0) doc.addPage(); // Add a new page for subsequent pages

                // Select the page by using refs or class selector
                const pageElement = pageRef.current[i];

                if (pageElement) {
                    // Ensure proper canvas scaling and cross-origin handling
                    const canvas = await html2canvas(pageElement, {
                        scale: 2, // High scale for better quality
                        useCORS: true, // Allow cross-origin images
                        logging: true,
                    });

                    const imgData = canvas.toDataURL("image/png");

                    // Calculate image width and height based on PDF page size
                    const imgWidth = pageSize.width - margins.left - margins.right;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    // Add image to PDF
                    doc.addImage(imgData, "PNG", margins.left, margins.top, imgWidth, imgHeight);
                    doc.text(`Page ${i + 1}`, pageSize.width - margins.right - 2, pageSize.height - margins.bottom);
                }
            }

            // Save the PDF
            doc.save("document.pdf");

            // Clear content after download with confirmation
            const confirmClear = window.confirm("Do you want to clear the text for new typing?");
            if (confirmClear) {
                setText(""); // Clear text state
                editor?.commands.setContent(""); // Clear TipTap content
            }
        } catch (error) {
            console.error("PDF Download Error:", error);
            alert("Failed to download the PDF. Please try again.");
        }
    };



    // const downloadPDF = async () => {
    //     const pdf = new jsPDF();
    //     const pageElements = document.querySelectorAll(".editor-page");

    //     for (let i = 0; i < pageElements.length; i++) {
    //         const canvas = await html2canvas(pageElements[i]);
    //         const imgData = canvas.toDataURL("image/png");
    //         const imgWidth = 210; // A4 width
    //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //         if (i > 0) {
    //             pdf.addPage();
    //         }
    //         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    //     }

    //     pdf.save("Document.pdf");
    // };



    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.lang = language;
            recognitionInstance.onresult = (event) => {
                const latestResult = event.results[event.results.length - 1];
                if (latestResult.isFinal) {
                    let transcript = latestResult[0].transcript.trim(); // Trim extra spaces

                    if (editor) {
                        editor.commands.focus();

                        // Get the last inserted text node
                        const currentContent = editor.getHTML();

                        // Extract the last visible character (ignoring HTML tags)
                        const plainText = editor.getText().trim();
                        const lastChar = plainText.slice(-1);

                        // Define a regex to check if last character is a Hindi or English letter
                        const letterRegex = /[\p{L}\p{N}]/u;

                        // If last character is a letter, insert space before new speech text
                        if (letterRegex.test(lastChar)) {
                            editor.commands.insertContent(" " + transcript);
                        } else {
                            editor.commands.insertContent(transcript);
                        }
                    }
                }
            };
            setRecognition(recognitionInstance);
        } else {
            alert("Speech recognition is not supported in this browser.");
        }
    }, [language, editor]);



    const [paragraphCount, setParagraphCount] = useState(1);

    const handleAddParagraph = () => {
        if (!editor) return;

        // Insert a numbered paragraph with continuous numbering
        const content = `<p style='margin-top: 0px;'>${paragraphCount}. &nbsp;&nbsp;&nbsp;&nbsp;</p>`;
        editor.commands.insertContent(content);

        // Move cursor to the newly inserted paragraph
        editor.commands.focus();
        editor.commands.setTextSelection(editor.state.doc.content.size - 1);

        // Increment paragraph count
        setParagraphCount(paragraphCount + 1);
    };




    const handlePageSizeChange = (e) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);
        setPageSize(pageSizes[newSize]);
    };

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


    useEffect(() => {
        const verified = localStorage.getItem("isVerified") === "true";

        setIsVerified(verified);
    }, []);

    const saveToFile = () => {
        if (!isVerified) {
            alert("You must verify your email before saving.");
            navigateToVerificationPage();
            return;
        }

        if (!paginatedPages || paginatedPages.length === 0) {
            alert("No content to save.");
            return;
        }

        console.log("Saving Paginated Pages:", paginatedPages); // Debugging

        // Wrap content in minimal HTML structure for Word
        const formattedText = paginatedPages
            ?.map((page, index) => `<h3>Page ${index + 1}</h3><p>${page}</p>`)
            .join("<br/><br/>");

        const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            ${formattedText}
        </body>
        </html>`;

        const blob = new Blob([htmlContent], { type: "application/msword" }); // Use MS Word MIME type
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "document.doc"; // Save as .doc
        link.click();
        URL.revokeObjectURL(url);

        // ✅ Clear the editor content after saving
        // ✅ Show confirmation before clearing the editor
        const confirmClear = window.confirm("Do you want to clear the text for new typing?");
        if (confirmClear) {
            setText(""); // Clear text state
            editor?.commands.setContent(""); // Clear TipTap editor content
        }
    };

    const [fileContent, setFileContent] = useState("");
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;

            setText(fileContent); // Set content in state

            setTimeout(() => {
                if (editor) {
                    editor.commands.setContent(fileContent, false);
                    editor.commands.setTextSelection(0); // Cursor always at top
                }
            }, 0);
        };
        reader.readAsText(file);
    };







    const [isTyping, setIsTyping] = useState(false);

    // // Detect typing activity in the editor
    const handleTyping = (textContent) => {
        setIsTyping(true);


        localStorage.setItem("isTyping", "true");
        saveDraftToBrowser(textContent); // Save the draft while typing
    };

    // // Save in draft (updated)
    const saveDraftToBrowser = (textContent) => {
        const plainText = textContent
            .replace(/<\/?strong>/g, "") // Remove <strong> tags
            .replace(/<\/?b>/g, "") // Remove <b> tags
            .replace(/<\/?u>/g, "") // Remove <u> tags
            .replace(/<\/?i>/g, "") // Remove <i> tags
            .replace(/<\/?em>/g, "") // Remove <em> tags
            .replace(/<\/?p>/g, "\n") // Convert <p> to new lines
            .replace(/<\/?br>/g, "\n") // Convert <br> to new lines
            .replace(/&nbsp;/g, " ") // Convert HTML spaces to normal spaces
            .trim(); // Remove extra spaces

        localStorage.setItem("draftText", plainText);
    };






    const handleFontSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setFontSize(newSize);
        if (editor) {
            editor
                .chain()
                .focus()
                .setMark("textStyle", { fontSize: `${newSize}px` }) // Correct way to apply font size
                .run();
        }
    };



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

    // ✅ Use `useEffect` to ensure `localStorage` runs only on the client

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLanguage = localStorage.getItem("selectedLanguage");
            const storedFont = localStorage.getItem("selectedFont");

            if (storedLanguage) {
                setLanguage(storedLanguage);
            }

            if (storedFont) {
                setSelectedFont(storedFont);
            }
        }
    }, []);

    useEffect(() => {
        const selectedLanguageOption = languageOptions.find((option) => option.code === language);
        if (selectedLanguageOption) {
            setFonts(selectedLanguageOption.fonts);

            // ✅ Get stored font from localStorage instead of resetting it
            const storedFont = localStorage.getItem("selectedFont");

            // ✅ Keep previously selected font if it exists in the new language, otherwise reset to first font
            if (storedFont && selectedLanguageOption.fonts.includes(storedFont)) {
                setSelectedFont(storedFont);
            } else {
                setSelectedFont(selectedLanguageOption.fonts[0]);
                localStorage.setItem("selectedFont", selectedLanguageOption.fonts[0]); // ✅ Save new font
            }
        }
    }, [language]);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("selectedLanguage", selectedLanguage);

        const selectedLanguageOption = languageOptions.find((option) => option.code === selectedLanguage);
        if (selectedLanguageOption) {
            setFonts(selectedLanguageOption.fonts);

            // ✅ Keep previously selected font if it's available in the new language
            const storedFont = localStorage.getItem("selectedFont");
            if (storedFont && selectedLanguageOption.fonts.includes(storedFont)) {
                setSelectedFont(storedFont);
            } else {
                setSelectedFont(selectedLanguageOption.fonts[0]);
                localStorage.setItem("selectedFont", selectedLanguageOption.fonts[0]); // ✅ Save new font
            }
        }
    };

    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
        setSelectedFont(selectedFont);
        localStorage.setItem("selectedFont", selectedFont); // ✅ Store font properly
    };



    const executeCommand = (command) => {

        if (!editor) return;

        editor.chain().focus();

        switch (command) {
            case 'undo': editor.chain().focus().undo().run(); break;
            case 'redo': editor.chain().focus().redo().run(); break;
            // case 'font-increase': setFontSize((prev) => prev + 1); break;
            // case 'font-decrease': setFontSize((prev) => (prev > 1 ? prev - 1 : prev));
            // break;
            case 'bold': editor.chain().focus().toggleBold().run(); break;
            case 'italic': editor.chain().focus().toggleItalic().run(); break;
            case 'underline': editor.chain().focus().toggleUnderline().run(); break;
            default: console.warn(`Command ${command} is not supported.`);
        }
    };



    const handlePrint = () => {
        const content = printRef.current;
        const originalContent = document.body.innerHTML;

        // Replace body content with the content to print
        document.body.innerHTML = content.innerHTML;
        window.print();

        // Restore the original content after printing
        document.body.innerHTML = originalContent;
        window.location.reload(); // Optional: Reload page to restore event listeners
    };
    const navigateToVerificationPage = () => router.push('/user');

    //     // user can't start copy text
    useDisableCopy(isVerified);
    // ?????????????????????????????????????????????????????
    const [selectedTemplate, setSelectedTemplate] = useState("");
    // ✅ Load saved content & template on mount

    useEffect(() => {
        if (typeof window !== "undefined" && editor) {
            const savedText = localStorage.getItem("userTypedText");
            const savedTemplate = localStorage.getItem("selectedTemplate");

            if (savedText) {
                editor.chain().focus().insertContent(savedText).run(); // Restore typed text
            } else if (savedTemplate) {
                editor.chain().focus().insertContent(savedTemplate).run(); // Restore template
            }

            setSelectedTemplate(localStorage.getItem("templateKey") || "");
        }
    }, [editor]);

    const handleTemplateSelect = (templateKey) => {
        if (!editor) return;

        const templateContent = templates[templateKey];
        const previousPos = editor.state.selection.anchor; // Cursor position before template insert

        editor.commands.insertContentAt(previousPos, templateContent);
        setText(editor.getHTML());
        setSelectedTemplate(templateKey);

        localStorage.setItem("selectedTemplate", templateContent);
        localStorage.setItem("templateKey", templateKey);
        localStorage.setItem("userTypedText", editor.getHTML());

        setTimeout(() => {
            editor.commands.setTextSelection(previousPos + templateContent.length); // Cursor ko exact position pe wapas laane ka
        }, 0);
    };

    useEffect(() => {
        if (editor) {
            const savedText = localStorage.getItem("userTypedText");
            if (savedText) {
                editor.commands.setContent(savedText, false);
            }
        }
    }, [editor]);

    useEffect(() => {
        if (text && editor) {
            const previousPos = editor.state.selection.anchor;
            editor.commands.setContent(text, false);

            setTimeout(() => {
                editor.commands.setTextSelection(previousPos);
            }, 0);
        }
    }, [text]);

    // // ✅ Handle removing the template
    const handleRemoveTemplate = () => {
        if (!editor) return;

        editor.commands.clearContent();
        setSelectedTemplate("");
        setText("");

        if (typeof window !== "undefined") {
            localStorage.removeItem("selectedTemplate");
            localStorage.removeItem("templateKey");
            localStorage.removeItem("userTypedText");
        }
    };

    if (!editor) {
        return <p>Loading editor...</p>;
    }


    return (
        <div className="flex flex-col h-screen">
            <Header isRecording={isRecording} startVoiceTyping={startVoiceTyping} stopVoiceTyping={stopVoiceTyping} downloadPDF={downloadPDF} saveToFile={saveToFile}
                handleButtonClick={handleButtonClick}
                fileName={fileName}
                editor={editor}
                // handleUpdateAndSave={handleUpdateAndSave}
                templates={templates}
                handleRemoveTemplate={handleRemoveTemplate}
                handleTemplateSelect={handleTemplateSelect}
                selectedTemplate={selectedTemplate}
                handleFileUpload={handleFileUpload}
                isDropdownVisible={isDropdownVisible}
                handlePrint={handlePrint}
                dropdownRef={dropdownRef} buttonRef={buttonRef} handleLanguageChange={handleLanguageChange} language={language}
                languageOptions={languageOptions} handleFontChange={handleFontChange} fonts={fonts} selectedFont={selectedFont} />
            <div className="flex flex-1">
                <Sidebar
                    isTyping={isTyping}

                    isLeftSidebarVisible={isLeftSidebarVisible}
                    setIsLeftSidebarVisible={setIsLeftSidebarVisible} orientation={orientation}
                    setOrientation={setOrientation} selectedSize={selectedSize} handlePageSizeChange={handlePageSizeChange} margins={margins}
                    setMargins={setMargins} handleAddParagraph={handleAddParagraph} pageSizes={pageSizes}

                />
                <div className="flex-1 p-4 ">

                    <Toolbar executeCommand={executeCommand} handleAddParagraph={handleAddParagraph} fontSize={fontSize} handleFontSizeChange={handleFontSizeChange} fontSizes={fontSizes} editor={editor} />
                    <EditorComponent setPaginatedPages={setPaginatedPages} pageRef={pageRef} currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex} ref={printRef} editor={editor} paginatedPages={paginatedPages} pageSize={pageSize} fontSize={fontSize} selectedFont={selectedFont} margins={margins} />



                </div>
            </div>
        </div>
    );
};

export default Editor;


// const ThumbnailSidebar = ({ paginatedPages, onPageClick }) => {
//     return (
//         <div className="thumbnail-sidebar">
//             {paginatedPages?.map((page, index) => (
//                 <div
//                     key={index}
//                     className="thumbnail"
//                     onClick={() => onPageClick(index)}
//                 >
//                     Page {index + 1}
//                 </div>
//             ))}
//         </div>
//     );
// };