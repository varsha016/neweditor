'use client'; // Make sure this is at the top if you are using Next.js with the "use client" directive

import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);

    const handleError = (event) => {
        // Ignore ResizeObserver warning
        if (event instanceof ErrorEvent && event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
            return; // Ignore this specific error
        }

        // Handle other errors
        if (event instanceof ErrorEvent) {
            setHasError(true);
            setErrorInfo({
                message: event.message,
                source: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
            });
            console.error('Error caught by Error Boundary:', event);
        }
    };

    useEffect(() => {
        window.addEventListener('error', handleError);
        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (hasError) {
        return (
            <div>
                <h1>Something went wrong.</h1>
                <details>
                    <summary>Click for error details</summary>
                    <p><strong>Message:</strong> {errorInfo.message}</p>
                    <p><strong>Source:</strong> {errorInfo.source}</p>
                    <p><strong>Line:</strong> {errorInfo.lineno}</p>
                    <p><strong>Column:</strong> {errorInfo.colno}</p>
                    <pre>{errorInfo.error?.stack}</pre>
                </details>
            </div>
        );
    }

    return children;
};

export default ErrorBoundary;
