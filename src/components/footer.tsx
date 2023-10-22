import React from "react";

type Footer = {
    author: string;
    link?: string;
    name?: string;
};

const Footer: React.FC<Footer> = (props: Footer) => {
    return (
        <div className="mx-4 mb-2 border-gray-400 relative flex">
            <p className="mt-2 line-clamp-3 text-gray-400 text-center">
                © {new Date().getFullYear()} - {props.author} - Licensed under: {' '}
                <a href={props.link ?? 'https://en.wikipedia.org/wiki/MIT_License'} target="_blank" className="text-blue-500"> {props.name ?? 'MIT'}</a>
            </p>
        </div>
    );
};

export default Footer;
