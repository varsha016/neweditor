"use client"
import React, { forwardRef, useRef } from 'react';
import { EditorContent } from '@tiptap/react';

// const EditorComponent = ({ editor, paginatedPages, pageSize, fontSize, selectedFont, margins }) => {
const EditorComponent = forwardRef(({ editor, paginatedPages, pageSize, fontSize, selectedFont, margins }, ref) => {
    // const printRef = useRef();
    console.log(paginatedPages, "paginatedPages");

    return (
        <div className="editor-container flex flex-wrap justify-center p-4">
            <div ref={ref} id="printable-content">
                {paginatedPages?.map((pageContent, index) => (
                    <div
                        key={index}
                        className="editor-page bg-white border shadow-lg mb-4 p-6 rounded-lg relative flex"
                        style={{
                            width: `${pageSize.width}cm`,
                            height: `${pageSize.height}cm`,
                            fontSize: `${fontSize}px`,
                            fontFamily: selectedFont,
                            padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
                            overflow: "hidden",
                            pageBreakAfter: "always",
                        }}
                    >
                        <div className="flex-1">
                            <span className="absolute top-1 right-1 text-gray-400">
                                Page {index + 1}
                            </span>

                            {index === paginatedPages.length - 1 ? (
                                <EditorContent editor={editor} />
                            ) : (
                                // <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: pageContent }}></p>
                                <p className="whitespace-pre-wrap">{pageContent} </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
});

export default EditorComponent;