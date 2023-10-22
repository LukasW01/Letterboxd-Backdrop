import React from "react";

type Main = {
    image?: string;
    alt?: string;
    link?: string;
    paragraph: string;
}

const Main: React.FC<Main> = (props: Main) => {
    return (
        <div className="p-4 flex flex-col items-start text-justify justify-between mx-auto">
            <a href={props.link ?? 'https://gitlab.com/LukasW01/Letterboxd-Backdrop'} target="_blank">
                <img src={props.image ?? 'img/letterboxd-logo.svg'} alt={props.alt ?? 'Letterboxd'} className="ml-10 h-12 w-full object-cover justify-center"/>
            </a>
            <div>
                <p className="mt-2 line-clamp-3 text-gray-400">{props.paragraph}</p>
            </div>
        </div>
    );
};

export default Main;
