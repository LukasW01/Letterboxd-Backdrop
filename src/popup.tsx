import React, {useState} from "react";
import ReactDOM from 'react-dom';
import polyfill from "webextension-polyfill";

import "./css/tailwind.css";

const App = () => {
    const currentYear = new Date().getFullYear();

    const [errorText, setErrorText] = useState("");
    const [error, setError] = useState(false);
    const [imageValue, setImageValue] = useState("");

    const handleEvent = async (): Promise<void> => {
        const urlRegex = /^https?:\/\/[^\s/$.?#]+\.ltrbxd\.com\/.+?\.(jpeg|jpg|gif|png|webp)$/i;
        const imgRegex = /.(jpeg|jpg|gif|png|webp)$/;

        if (imageValue === "") {
            setErrorText("Input is empty");
            setError(true);
        } else if (!urlRegex.test(imageValue)) {
            setErrorText("Input is not a valid URL from ltrbxd.com");
            setError(true);
        } else if (!imgRegex.test(imageValue)) {
            setErrorText("Input does not contain an image");
            setError(true);
        } else {
            console.log("Input is valid and contains an image");

            try {
                await polyfill.storage.local.set({image: imageValue});

                setErrorText("Image saved. Reload your Letterboxd-profile to apply the changes.");
                setError(false); // Reset error

                /*
                polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                    const letterboxdUrlRegex = /^https?:\/\/letterboxd\.com\//;

                    if (tabs[0] && tabs[0].url && letterboxdUrlRegex.test(tabs[0].url)) {
                        polyfill.tabs.reload(tabs[0].id);
                    }
                });
                 */
            } catch (error) {
                console.error(`Error: ${error}`);
            }

        }
    };

    return (
        <main>
            <div className="p-4 flex flex-col items-start text-justify justify-between mx-auto">
                <a href="https://gitlab.com/LukasW01/Letterboxd-Backdrop" target="_blank">
                    <img src="img/letterboxd-logo.svg" alt="letterboxd"
                         className="ml-5 h-12 w-full object-cover justify-center"/>
                </a>
                <div>
                    <p className="mt-2 line-clamp-3 text-gray-400">Letterboxd Backdrop: A Browser extension that adds a
                        custom backdrop image to your Letterboxd profile without paying for Patron.</p>
                </div>
            </div>
            {errorText && (
                <div
                    role="alert"
                    className={`rounded-md border ${
                        error ? "text-red-500" : "text-green-500"
                    } border-gray-800 p-4 shadow-xl bg-gray-900 animate-slide-in`}
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <strong
                                className={`block font-medium ${
                                    error ? "text-red-500" : "text-green-500"
                                }`}
                            >
                                {error ? "Error" : "Changes saved"}
                            </strong>
                            <p className="mt-1 text-sm text-gray-200">{errorText}</p>
                        </div>
                        <button
                            onClick={() => {
                                setErrorText("");
                                setError(false);
                            }}
                            className="transition text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Dismiss popup</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <div className="mx-4 mb-2 border-gray-400 relative flex flex-col">
                <label htmlFor="imageValue" className="block my-1.5 text-sm font-medium text-white">
                    Image URL
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="imageValue"
                        className="flex-1 border text-gray-400 text-sm rounded block p-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://ltrbxd.com/image.jpg"
                        value={imageValue}
                        onChange={(e) => setImageValue(e.target.value)}
                        onKeyUp={handleEvent}
                    />
                    <button
                        type="button"
                        className="py-1 px-2 ml-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="mx-4 mb-2 border-gray-400 relative flex">
                <p className="mt-2 line-clamp-3 text-gray-400 text-center">
                    © <span>{currentYear}</span> - <span>Lukas Wigger</span>. All rights reserved. Licensed under <a
                    href={"https://en.wikipedia.org/wiki/MIT_License"} target="_blank" className="text-blue-500">MIT</a>.
                </p>
            </div>
        </main>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));

