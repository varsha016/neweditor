// "use client"
// import React, { forwardRef, useRef } from 'react';
// import { EditorContent } from '@tiptap/react';

// // const EditorComponent = ({ editor, paginatedPages, pageSize, fontSize, selectedFont, margins }) => {
// const EditorComponent = forwardRef(({ editor, paginatedPages, pageSize, fontSize, selectedFont, margins, pageRef }, ref) => {
//     // const printRef = useRef();
//     // console.log(paginatedPages, "paginatedPages");

//     return (
//         // <div className="editor-container flex flex-wrap justify-center p-4">
//         //     <div ref={ref} id="printable-content">
//         //         {paginatedPages?.map((pageContent, index) => (
//         //             <div
//         //                 key={index}
//         //                 className="editor-page bg-white border shadow-lg mb-4 p-6 rounded-lg relative flex"
//         //                 style={{
//         //                     width: `${pageSize.width}cm`,
//         //                     height: `${pageSize.height}cm`,
//         //                     fontSize: `${fontSize}px`,
//         //                     fontFamily: selectedFont,
//         //                     padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
//         //                     overflow: "hidden",
//         //                     pageBreakAfter: "always",
//         //                 }}
//         //             >
//         //                 <div className="flex-1">
//         //                     <span className="absolute top-1 right-1 text-gray-400">
//         //                         Page {index + 1}
//         //                     </span>


//         //                     {index === paginatedPages.length - 1 ? (
//         //                         <EditorContent editor={editor} />
//         //                     ) : (

//         //                         // <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: pageContent }}></p>
//         //                         <p className="whitespace-pre-wrap">{pageContent} </p>
//         //                     )}
//         //                 </div>
//         //             </div>
//         //         ))}

//         //         {/* <div ref={ref} className="overflow-auto max-h-[100vh]">
//         //         {paginatedPages.map((page, index) => (
//         //             <div
//         //                 key={index}
//         //                 className="editor-page border mb-4 p-6 bg-white relative"
//         //                 style={{
//         //                     width: `${pageSize.width}cm`,
//         //                     height: `${pageSize.height}cm`,
//         //                     fontSize: `${fontSize}px`,
//         //                     overflow: "hidden",
//         //                 }}
//         //             >
//         //                 {index === paginatedPages.length - 1 ? (
//         //                     <EditorContent editor={editor} />
//         //                 ) : (
//         //                     <div className="whitespace-pre-wrap">{page}</div>
//         //                 )}
//         //                 <span className="absolute bottom-2 right-2 text-gray-400">
//         //                     Page {index + 1}
//         //                 </span>
//         //             </div>
//         //         ))}
//         //     </div> */}
//         //     </div>
//         // </div>
//         <div className="editor-container flex flex-wrap justify-center p-4">
//             {paginatedPages.map((pageContent, index) => (
//                 <div
//                     key={index}
//                     ref={(el) => (pageRef.current[index] = el)}
//                     className="editor-page bg-white border shadow-lg mb-4 p-6 rounded-lg relative flex"
//                     style={{
//                         width: `${pageSize.width}cm`,
//                         height: `${pageSize.height}cm`,
//                         fontSize: `${fontSize}px`,
//                         fontFamily: selectedFont,
//                         padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
//                         overflow: "hidden",
//                         pageBreakAfter: "always",
//                     }}
//                 >
//                     <div className="flex-1">
//                         <span className="absolute top-1 right-1 text-gray-400">
//                             Page {index + 1}
//                         </span>

//                         {index === paginatedPages.length - 1 ? (
//                             <EditorContent editor={editor} />
//                         ) : (
//                             <div
//                                 className="whitespace-pre-wrap"
//                                 dangerouslySetInnerHTML={{ __html: pageContent }}
//                             ></div>
//                         )}
//                     </div>
//                 </div>
//             ))}

//         </div>



//     );
// });

// export default EditorComponent;


"use client";
import React, { forwardRef } from "react";
import { EditorContent } from "@tiptap/react";

const EditorComponent = forwardRef(
    ({ editor, paginatedPages, setPaginatedPages, setCurrentPageIndex, currentPageIndex, pageSize, fontSize, selectedFont, margins, pageRef }, ref) => {

        const handlePageChange = (index) => {
            setCurrentPageIndex(index);
            editor.commands.setContent(paginatedPages[index]);
        };
        return (<>
            <div className="flex flex-col items-center">
                <div ref={ref} id="printable-content">
                    {paginatedPages?.map((pageContent, index) => (
                        <div
                            key={index}
                            ref={(el) => (pageRef.current[index] = el)}
                            className="w-[21cm] h-[29.7cm] bg-white shadow-lg p-6 mb-4 overflow-hidden relative"
                        >
                            <span className="absolute top-1 right-1 text-gray-400">
                                Page {index + 1}
                            </span>

                            {index === currentPageIndex ? (
                                <EditorContent editor={editor} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
                            )}
                        </div>
                    ))}

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => handlePageChange(currentPageIndex - 1)}
                            disabled={currentPageIndex === 0}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPageIndex + 1)}
                            disabled={currentPageIndex === paginatedPages.length - 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>

        );
    }
);

export default EditorComponent;
