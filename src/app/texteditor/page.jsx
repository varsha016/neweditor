






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
//         extensions: [StarterKit.configure({ history: true }), Bold, Italic, Underline, TextStyle, ],
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
//             .map((page, index) => `--- Page ${index + 1} ---\n${page}`)
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
//                                             {languageOptions.map((option) => (
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
//                                             {fonts.map((font) => (
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
//                                 {Object.keys(pageSizes).map((size) => (
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
//                             {["top", "bottom", "left", "right"].map((side) => (
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
//                                 {fontSizes.map((size) => (

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
//                             {paginatedPages.map((pageContent, index) => (
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
//                             {paginatedPages.map((pageContent, index) => (
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
//                                         {lines.map((_, lineIndex) => (
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

import React, { useState, useEffect, useRef, } from 'react';

import { HiOutlineDocumentText } from 'react-icons/hi';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from '@tiptap/extension-underline';
import TextStyle from "@tiptap/extension-text-style"; // Required for font-size
import useDisableCopy from '../hook/page';
import { Text } from '@tiptap/extension-text'



import Header from '../main/header/page';
import Sidebar from '../main/sidebar/page';
import Toolbar from '../main/toolbar/page';
import templates from '../main/templates';
import EditorComponent from '../main/editorComponent/page';

const languageOptions = [
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


    const editor = useEditor({
        extensions: [StarterKit, Underline, TextStyle,],
        content: text,
        onUpdate: ({ editor }) => {
            setText(editor.getHTML());
        }
    });




    // Use useEffect to trigger functions when `text` updates
    useEffect(() => {
        if (text) {
            paginateText(text);
            handleTyping(text);
        }
    }, [text]); // Runs whenever `text` updat

    // const editor = useEditor({
    //     extensions: [
    //         StarterKit.configure({ history: true }),
    //         Bold,
    //         Italic,
    //         Underline,
    //         TextStyle,
    //     ],
    //     content: text,
    //     // onUpdate: ({ editor }) => {
    //     //     let updatedHTML = editor.getHTML();

    //     //     let cleanedText = updatedHTML

    //     //         .replace(/&nbsp;/g, ' ')
    //     //         .replace(/<br\s*\/?>/g, '<br> ')
    //     //         .replace(/<u>(\s+)<\/u>/g, '$1')
    //     //         .replace(/(<(b|i|u|span|strong|em)[^>]*>)(\s+)(<\/\2>)/g, '$1&nbsp;$4')


    //     //         .replace(/<p>(.*?)<\/p>/g, (match, content) => {
    //     //             return `<p>${content.replace(/\s/g, '&nbsp;')}</p>`;
    //     //         });
    //     //     // console.log(cleanedText, "cleanedText");
    //     //     setText(cleanedText);

    //     //     paginateText(cleanedText);
    //     //     // saveDraftToBrowser(cleanedText);
    //     //     handleTyping(cleanedText);
    //     // },
    //     onUpdate: ({ editor }) => {
    //         const previousPos = editor.state.selection.anchor; // Save cursor position

    //         let updatedHTML = editor.getHTML();
    //         let cleanedText = updatedHTML
    //             .replace(/&nbsp;/g, ' ')
    //             .replace(/<br\s*\/?>/g, '<br> ')
    //             .replace(/<u>(\s+)<\/u>/g, '$1')
    //             .replace(/(<(b|i|u|span|strong|em)[^>]*>)(\s+)(<\/\2>)/g, '$1&nbsp;$4')
    //             .replace(/<p>(.*?)<\/p>/g, (match, content) => {
    //                 return `<p>${content.replace(/\s/g, '&nbsp;')}</p>`;
    //             });

    //         // setText(cleanedText); // Update the text state

    //         // setTimeout(() => {
    //         //     editor.commands.setTextSelection(previousPos); // Restore cursor position
    //         // }, 0);

    //         // Only update state if content has changed
    //         if (cleanedText !== text) {
    //             setText(cleanedText);

    //             setTimeout(() => {
    //                 editor.commands.setTextSelection(previousPos); // Restore cursor position
    //             }, 0);
    //         }

    //         paginateText(cleanedText);
    //         handleTyping(cleanedText);
    //     }


    // });

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


    // useEffect(() => {
    //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //     if (SpeechRecognition) {
    //         const recognitionInstance = new SpeechRecognition();
    //         recognitionInstance.continuous = true;
    //         recognitionInstance.lang = language;
    //         recognitionInstance.onresult = (event) => {
    //             const latestResult = event.results[event.results.length - 1];
    //             if (latestResult.isFinal) {
    //                 const transcript = latestResult[0].transcript.trim();
    //                 if (editor) {
    //                     editor.commands.focus();
    //                     editor.commands.insertContent(transcript + '\n');
    //                 }
    //             }
    //         };
    //         setRecognition(recognitionInstance);
    //     } else {
    //         alert('Speech recognition is not supported in this browser.');
    //     }
    // }, [language, editor]);

    const handleAddParagraph = () => editor?.commands.insertContent("<br><br>");

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

        // ✅ Clear the editor content after saving
        // ✅ Show confirmation before clearing the editor
        const confirmClear = window.confirm("Do you want to clear the text for new typing?");
        if (confirmClear) {
            setText(""); // Clear text state
            editor?.commands.setContent(""); // Clear TipTap editor content
        }
    };


    // save file text
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
            .map((page, index) => `<h3>Page ${index + 1}</h3><p>${page}</p>`)
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
    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setFileName(file.name);
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const content = e.target.result;
    //             setFileContent(content);

    //             // Ensure editor is initialized before setting content
    //             if (editor) {
    //                 editor.commands.setContent(content);
    //             } else {
    //                 console.warn("Editor is not ready yet.");
    //             }
    //         };
    //         reader.readAsText(file);
    //     }
    // };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setFileContent(content);

                if (editor) {
                    editor.commands.setContent(content, false); // Use 'false' to avoid resetting history
                } else {
                    console.warn("Editor is not ready yet.");
                }
            };
            reader.readAsText(file);
        }
    };

    //   save in draft
    // const saveDraftToBrowser = (textContent) => {
    //     const plainText = textContent
    //         .replace(/<\/?strong>/g, "") // Remove <strong> tags
    //         .replace(/<\/?b>/g, "") // Remove <b> tags
    //         .replace(/<\/?u>/g, "") // Remove <u> tags
    //         .replace(/<\/?i>/g, "") // Remove <i> tags
    //         .replace(/<\/?em>/g, "") // Remove <em> tags
    //         .replace(/<\/?p>/g, "\n") // Convert <p> to new lines
    //         .replace(/<\/?br>/g, "\n") // Convert <br> to new lines
    //         .replace(/&nbsp;/g, " ") // Convert HTML spaces to normal spaces
    //         .trim(); // Remove extra spaces

    //     localStorage.setItem("draftText", plainText);
    // };


    // // download draft
    // const downloadDraftFile = () => {
    //     const text = localStorage.getItem("draftText") || ""; // Get saved text

    //     if (!text.trim()) {
    //         alert("No text to save! Please type something first.");
    //         return;
    //     }

    //     const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "browser_draft.txt";
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     URL.revokeObjectURL(url);
    // };


    // //   save in draft
    // useEffect(() => {
    //     const savedDraft = localStorage.getItem("draftText");
    //     if (savedDraft && !isDraftRestored) {
    //         setText(savedDraft);
    //         editor?.commands.setContent(savedDraft);
    //         setIsDraftRestored(true);
    //     }
    // }, [editor, isDraftRestored]);





    const [isTyping, setIsTyping] = useState(false);

    // Detect typing activity in the editor
    const handleTyping = (textContent) => {
        setIsTyping(true);
        console.log("Typing detected, setting isTyping to true"); // Meaningful log
        console.log(textContent, "TypingtextContenttextContenttextContent detected, setting isTyping to true"); // Meaningful log

        localStorage.setItem("isTyping", "true");
        saveDraftToBrowser(textContent); // Save the draft while typing
    };

    // Save in draft (updated)
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

    // Download draft (same as before)
    const downloadDraftFile = () => {
        const text = localStorage.getItem("draftText") || ""; // Get saved text

        if (!text.trim()) {
            alert("No text to save! Please type something first.");
            return;
        }

        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "browser_draft.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Restore draft on page load
    useEffect(() => {
        const savedDraft = localStorage.getItem("draftText");
        const savedTypingState = localStorage.getItem("isTyping");

        if (savedDraft && !isDraftRestored) {
            setText(savedDraft);
            editor?.commands.setContent(savedDraft);
            setIsDraftRestored(true);
        }

        // If user refreshes or closes browser, reset typing state
        if (!savedTypingState) {
            setIsTyping(false);
        }

        // Clear typing state on refresh
        const handleBeforeUnload = () => {
            localStorage.removeItem("isTyping");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [editor, isDraftRestored]);


    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 34];
    const [fontSize, setFontSize] = useState(fontSizes[16]); // Default font size

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

    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current;
        const newWindow = window.open("", "_blank");
        newWindow.document.write("<html><head><title>Print</title>");
        newWindow.document.write("</head><body>");
        newWindow.document.write(printContent.innerHTML);
        newWindow.document.write("</body></html>");
        newWindow.document.close();
        newWindow.print();
    };


    const paginateText = (text) => {
        const lineHeight = fontSize * 1.2; // Approximate line height
        const maxLinesPerPage = Math.floor((pageSize.height * 24.8) / lineHeight); // Max lines per page
        const maxCharsPerLine = Math.floor((pageSize.width * 37.8) / (fontSize * 0.5)); // Max characters per line

        const words = text.split(" "); // Split text into words
        let currentPage = []; // Holds lines for the current page
        let pages = [...paginatedPages]; // Preserve existing pages
        let line = ""; // Holds the current line
        let lastPageIndex = pages.length - 1;

        if (!pages.length) pages.push(""); // Ensure at least one page exists

        words.forEach((word) => {
            if ((line + word).length <= maxCharsPerLine) {
                line += word + " "; // Add the word to the current line
            } else {
                currentPage.push(line.trim());
                line = word + " "; // Start a new line

                if (currentPage.length >= maxLinesPerPage) {
                    pages[lastPageIndex] = currentPage.join("\n");
                    pages.push(""); // Create a new empty page
                    lastPageIndex++;
                    currentPage = [];
                }
            }
        });

        if (line.trim()) currentPage.push(line.trim());

        if (currentPage.length > 0) {
            pages[lastPageIndex] = currentPage.join("\n");
        }

        setPaginatedPages(pages);
    };

    // / Update only the last page instead of resetting all content


    useEffect(() => {
        if (editor && paginatedPages?.length) {
            editor.commands.setContent(paginatedPages[paginatedPages.length - 1]);
        }
    }, [paginatedPages, editor]);

    const navigateToVerificationPage = () => router.push('/user');

    //     // user can't start copy text


    useDisableCopy(isVerified);
    //     // user can't  end copy text


    // Handle Template Selection
    const [selectedTemplate, setSelectedTemplate] = useState("");



    const handleTemplateSelect = (templateKey) => {
        if (!editor) return;

        const previousPos = editor.state.selection.anchor; // Save cursor position

        editor.commands.insertContentAt(previousPos, templates[templateKey]); // Insert at cursor

        setTimeout(() => {
            editor.commands.setTextSelection(previousPos); // Restore cursor
        }, 0);

        setSelectedTemplate(templateKey);
    };
    // const handleTemplateSelect = (templateKey) => {
    //     if (!editor) return;

    //     const selection = editor.state.selection; // Save cursor position

    //     editor.chain().focus().insertContentAt(selection.anchor, templates[templateKey]).run(); // Insert at cursor

    //     setTimeout(() => {
    //         editor.commands.setTextSelection(selection); // Restore cursor position
    //     }, 0);

    //     setSelectedTemplate(templateKey);
    // };


    // ✅ Function to remove the selected template
    const handleRemoveTemplate = () => {
        if (!editor) return;

        editor.commands.clearContent(); // Clear editor content
        setSelectedTemplate(""); // Reset selected template
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
                    setMargins={setMargins} downloadDraftFile={downloadDraftFile} handleAddParagraph={handleAddParagraph} pageSizes={pageSizes}
                    saveDraftToBrowser={saveDraftToBrowser}
                />
                <div className="flex-1 p-4 ">

                    <Toolbar executeCommand={executeCommand} handleAddParagraph={handleAddParagraph} fontSize={fontSize} handleFontSizeChange={handleFontSizeChange} fontSizes={fontSizes} editor={editor} />
                    <EditorComponent ref={printRef} editor={editor} paginatedPages={paginatedPages} pageSize={pageSize} fontSize={fontSize} selectedFont={selectedFont} margins={margins} />

                </div>
            </div>
        </div>
    );
};

export default Editor;
