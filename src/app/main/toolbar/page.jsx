"use client"
import React from 'react';
import { FaUndo, FaRedo, FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const Toolbar = ({ executeCommand, fontSize, handleFontSizeChange, fontSizes, editor }) => {
    // console.log(fontSizes, "fontSizesfontSizesfontSizesfontSizes");

    return (<>
        <div className="toolbar bg-purple-300 p-2 pl-8  flex items-center space-x-2 border-b rounded-md">
            {editor && <>
                {/* <button
                    onClick={() => executeCommand('undo')}
                    className="p-2 hover:bg-gray-200">
                    <FaUndo className="text-lg" />
                </button>
                <button
                    onClick={() => executeCommand('redo')}
                    className="p-2 hover:bg-gray-200">
                    <FaRedo className="text-lg" />
                </button> */}
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="px-4 py-2 border rounded-md"
                >
                    {fontSizes?.map((size) => (
                        <option key={size} value={size}>
                            {size}px
                        </option>
                    ))}
                </select>


                <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200">
                    <FaBold className="text-lg" />
                </button>
                <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200">
                    <FaItalic className="text-lg" />
                </button>
                <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200">
                    <FaUnderline className="text-lg" />
                </button>
            </>}
            {/* <button
                onClick={() => executeCommand('undo')}
                className="p-2 hover:bg-gray-200">
                <FaUndo className="text-lg" />
            </button>
            <button
                onClick={() => executeCommand('redo')}
                className="p-2 hover:bg-gray-200">
                <FaRedo className="text-lg" />
            </button>
            <select
                value={fontSize}
                onChange={handleFontSizeChange}
                className="px-4 py-2 border rounded-md"
            >
                {fontSizes?.map((size) => (
                    <option key={size} value={size}>
                        {size}px
                    </option>
                ))}
            </select>


            <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200">
                <FaBold className="text-lg" />
            </button>
            <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200">
                <FaItalic className="text-lg" />
            </button>
            <button onClick={() => executeCommand('underline')} className="p-2 hover:bg-gray-200">
                <FaUnderline className="text-lg" />
            </button> */}
        </div>
    </>

    );
};

export default Toolbar;