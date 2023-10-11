















// this one works but with react Redbox, while >3m downlods react-error-boundary does not work at all !!
import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = () => {
            console.log("here")
            setHasError(true);
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    console.log("has error", hasError)

    return hasError ? (
        <div>Something went wrong. Please try again later.</div>
    ) : (
        children
    );
};

export default ErrorBoundary;
