import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="mx-4 mb-2 border-gray-400 relative flex">
            <p className="mt-2 line-clamp-3 text-gray-400 text-center">
                © {new Date().getFullYear()} - Lukas W - Licensed under: {' '}
                <a href={'https://en.wikipedia.org/wiki/MIT_License'} target="_blank" rel="noopener noreferrer" className="text-blue-500">MIT</a>
            </p>
        </div>
    );
};

export default Footer;
