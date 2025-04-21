"use client";
import React, { forwardRef } from "react";
import { EditorContent } from "@tiptap/react";

const EditorComponent = forwardRef(
    ({
        editor,
        paginatedPages = [], // Default to an empty array
        setPaginatedPages,
        setCurrentPageIndex,
        currentPageIndex = 0, // Default to 0
        pageSize,
        fontSize,
        selectedFont,
        margins,
        pageRef,
    }, ref) => {
        const handlePageChange = (index) => {
            setCurrentPageIndex(index);
            editor?.commands?.setContent(paginatedPages[index]);
        };

        return (
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
                            disabled={!paginatedPages || currentPageIndex === 0}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPageIndex + 1)}
                            disabled={!paginatedPages || currentPageIndex === paginatedPages.length - 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

export default EditorComponent;
