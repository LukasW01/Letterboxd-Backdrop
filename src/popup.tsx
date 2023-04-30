import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import polyfill from "webextension-polyfill";

import "./css/wind.css";

const App = () => {
    const currentYear: number = new Date().getFullYear();

    const [errorText, setErrorText]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState("");
    const [error, setError]: [boolean, ((value: (((prevState: boolean) => boolean) | boolean)) => void)] = useState(false);
    const [imageValue, setImageValue]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState("");
    const [wasSaved, setWasSaved]: [boolean, ((value: (((prevState: boolean) => boolean) | boolean)) => void)] = useState(false);

    async function loadValue(): Promise<void> {
        try {
            const result: Record<string, any> = await polyfill.storage.local.get('image');
            if (result.image) {
                setImageValue(result.image);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    const checkInput = async (): Promise<boolean> => {
        const urlRegex: RegExp = /^https?:\/\/[^\s/$.?#]+\.ltrbxd\.com/;
        const imgRegex: RegExp = /.(jpeg|jpg|gif|png|webp)$/;

        if (imageValue === "") {
            console.log("Input is empty");
            return false;
        }

        if (!urlRegex.test(imageValue)) {
            setErrorText("Input is not a valid URL from ltrbxd.com");
            setError(true);
            return false;
        }

        if (!imgRegex.test(imageValue)) {
            setErrorText("Input does not contain an image");
            setError(true);
            return false;
        }

        console.log("All checks OK!");
        return true;
    };



    const handleEvent = async (): Promise<void> => {
        if(await checkInput()) {
            try {
                await polyfill.storage.local.set({image: imageValue});
                /*
                polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                    const letterboxdUrlRegex = /^https?:\/\/letterboxd\.com\//;

                    if (tabs[0] && tabs[0].url && letterboxdUrlRegex.test(tabs[0].url)) {
                        polyfill.tabs.reload(tabs[0].id);
                    }
                 });
                 */

                setErrorText("Image saved.");
                setError(false);
                setWasSaved(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleReset = async ():Promise<void> => {
        if (wasSaved) {
            try {
                await polyfill.storage.local.remove('image');
                /*
                polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                   const letterboxdUrlRegex = /^https?:\/\/letterboxd\.com\//;

                    if (tabs[0] && tabs[0].url && letterboxdUrlRegex.test(tabs[0].url)) {
                        polyfill.tabs.reload(tabs[0].id);
                    }
                });
                */

                setErrorText("Image Removed.");
                setImageValue("");
                setError(false);
                setWasSaved(false);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(():void => {
        loadValue().then((r:void):void => {});
    }, []);

    return (
        <main>
            <div className="p-4 flex flex-col items-start text-justify justify-between mx-auto">
                <a href="https://gitlab.com/LukasW01/Letterboxd-Backdrop" target="_blank">
                    <img src="img/letterboxd-logo.svg" alt="letterboxd"
                         className="ml-10 h-12 w-full object-cover justify-center"/>
                </a>
                <div>
                    <p className="mt-2 line-clamp-3 text-gray-400">Letterboxd Backdrop: A Browser extension that adds a
                        custom backdrop image to your Letterboxd profile without paying for Patron.</p>
                </div>
            </div>
            <div className="mx-4 mb-2 border-gray-400 relative flex flex-col">
                <label htmlFor="imageValue" className="block my-1.5 text-sm font-medium text-white">
                    Image URL
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="imageValue"
                        className="flex-1 border text-sm rounded block p-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-white h-9"
                        placeholder="https://ltrbxd.com/image.jpg"
                        value={imageValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setImageValue(e.target.value);
                        }}
                        onKeyUp={handleEvent}
                    />
                    <button
                        type="button"
                        className="py-2 px-1 mr-2 mb-0.5 text-sm ml-1 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center"
                        onClick={handleReset}
                    >
                        Delete Image
                    </button>
                </div>
            </div>
            {errorText && (
                <div
                    role="alert"
                    className={`mx-4 ${
                        error ? "text-red-500" : "text-green-500"
                    }  animate-slide-in flex`}
                >
                    <div className="gap-4 flex items-center">
                        <div>
                            <strong
                                className={`font-medium ${
                                    error ? "text-red-500" : "text-green-500"
                                }`}
                            >
                                {error ? "Error" : "Changes saved"}
                            </strong>
                            <span className="mt-1 text-sm text-gray-200">: {errorText}</span>
                        </div>
                        <button
                            onClick={():void => {
                                setErrorText("");
                                setError(false);
                            }}
                            className="flex-shrink-0 transition text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Dismiss popup</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
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

