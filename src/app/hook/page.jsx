import { useEffect, useState } from "react";

const useDisableCopy = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return; // Ensure it's running on the client

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
    }, [isClient]); // Run only when the client is ready
};

export default useDisableCopy;
