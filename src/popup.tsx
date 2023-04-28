import React, { useState } from "react";
import ReactDOM from 'react-dom';
import polyfill from "webextension-polyfill";

import "./styles/tailwind.css";

const App = () => {
    const currentYear = new Date().getFullYear();

    const [imageBlur, setImageBlur] = useState(false);
    const [imageValue, setImageValue] = useState("");
    const [error, setError] = useState("");



    const handleBlur = async () : Promise<void> => {
        const urlRegex = /^(http|https):\/\/[^\s/$.?#].'\S'*$/i;
        const imgRegex = /.(jpeg|jpg|gif|png|webp)$/;

        if (imageValue === "") {
            setError("Input is empty");
        } else if (!urlRegex.test(imageValue)) {
            setError("Input is not a valid URL");
        } else if (!imgRegex.test(imageValue)) {
            setError("Input does not contain an image");
        } else {
            console.log("Input is valid and contains an image");
            setError("");

            try {
                await polyfill.storage.local.set({ image: imageValue });
                console.log("Variable saved");

                setError("Image saved. Reload your Letterboxd-profile to apply the changes.");
            } catch (error) {
                console.error(`Error: ${error}`);
            }

            setImageValue("");
        }

        setImageBlur(true);
    };

    const DeleteImage = async () : Promise<void> => {
        try {
            await polyfill.storage.local.remove("image");
            console.log("Variable deleted");

            setError("Image deleted. Reload your Letterboxd-profile to apply the changes.");
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <main>
            <div className="p-4 flex flex-col items-start text-justify justify-between mx-auto">
                <a href="https://gitlab.com/LukasW01/Letterboxd-Backdrop" target="_blank">
                    <img src="images/letterboxd-logo.svg" alt="letterboxd" className="ml-5 h-12 w-full object-cover justify-center"/>
                </a>
                <div>
                    <p className="mt-2 line-clamp-3 text-gray-400" >Letterboxd Backdrop: A Browser extension that adds a custom backdrop image to your Letterboxd profile without paying for Patron.</p>
                </div>
            </div>
            <div className="mx-4 mb-2 border-t border-gray-400 relative flex flex-col">
                <label htmlFor="imageValue" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                <input
                    type="text"
                    id="imageValue"
                    className={`border text-gray-400 text-sm rounded block p-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 ${imageBlur ? "blur" : ""}`}
                    placeholder="https://ltrbxd.com/image.jpg"
                    value={imageValue}
                    onChange={(e) => setImageValue(e.target.value)}
                    onBlur={handleBlur}
                />
                {error && <p id="error" className="text-sm text-red-500"><span className="font-medium">{error}</span></p>}
            </div>
            <div className="mx-4 mb-2 border-t border-gray-400 relative flex">
                <p className="mt-2 line-clamp-3 text-gray-400 text-center">
                    © <span>{currentYear}</span> - <span>Lukas Wigger</span>. All rights reserved. Licensed under <a href={"https://en.wikipedia.org/wiki/MIT_License"} target="_blank" className="text-blue-500">MIT</a>.
                </p>
            </div>
        </main>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));

