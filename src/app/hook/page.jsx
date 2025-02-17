"use client"
import { useEffect } from "react";

const useDisableCopy = (isVerified) => {
    useEffect(() => {
        if (isVerified) return; // Allow copy if user is verified

        const preventCopy = (event) => {
            event.preventDefault();
            alert("Copying text is disabled!");
        };

        const preventKeyboardCopy = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
                event.preventDefault();
                alert("Copying text is disabled!");
            }
        };

        document.addEventListener("copy", preventCopy);
        document.addEventListener("keydown", preventKeyboardCopy);

        return () => {
            document.removeEventListener("copy", preventCopy);
            document.removeEventListener("keydown", preventKeyboardCopy);
        };
    }, [isVerified]); // Run effect when `isVerified` changes
};

export default useDisableCopy;
