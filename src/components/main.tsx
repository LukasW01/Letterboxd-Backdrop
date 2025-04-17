import React from "react";

const Main: React.FC = () => {
    return (
        <div className="p-4 flex flex-col items-start text-justify justify-between mx-auto">
            <a href={'https://gitlab.com/LukasW01/Letterboxd-Backdrop'} target="_blank" rel="noopener noreferrer">
                <img src={'img/letterboxd-logo.svg'} alt={'Letterboxd'} className="ml-10 h-12 w-full object-cover justify-center"/>
            </a>
            <div>
                <p className="mt-2 line-clamp-3 text-gray-400">
                    Letterboxd Backdrop: A Browser extension that adds a custom backdrop image to your Letterboxd profile
                </p>
            </div>
        </div>
    );
};

export default Main;
