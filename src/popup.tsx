import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import polyfill, {Tabs} from "webextension-polyfill";
import Alert from "./components/alert";
import Button from "./components/button";
import Input from "./components/input";
import Main from "./components/main";
import Footer from "./components/footer";
import {checkInput} from "./js/util/validation";
import "./css/tailwind.css";

const App = () => {
    const [image, setImage]: [string, ((value: (((prevState: string) => string) | string)) => void)] = useState("");
    const [error, setError]: [{text: string; bool: boolean }, ((value: (((prevState: {text: string; bool: boolean }) => {text: string; bool: boolean }) | {text: string; bool: boolean })) => void)] = useState<{ text: string; bool: boolean }>({ text: "", bool: false });

    const loadValue = async (): Promise<void> => {
        try {
            const result: Record<string, string> = (await polyfill.storage.local.get('image')) as Record<string, string>;
            if (result.image) {
                setImage(result.image);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const setValue = async (): Promise<void> => {
        if (checkInput(image)) {
            try {
                await polyfill.storage.local.set({image: image});
                polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs: Tabs.Tab[]): void => {
                    tabs[0] && tabs[0].url && /^https?:\/\/letterboxd\.com\//.test(tabs[0].url) ? polyfill.tabs.reload(tabs[0].id) : null;
                });

                setError({text: "Image saved.", bool: false,});
                setImage(image);
            } catch (err) {
                console.error(err);
            }
        } else {
            setError({text: "Input does not contain a valid Letterboxd image URL or does not contain an image", bool: true,});
        }
    };

    const removeValue = async (): Promise<void> => {
        if (image) {
            try {
                await polyfill.storage.local.remove('image');
                polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs: Tabs.Tab[]): void => {
                    tabs[0] && tabs[0].url && /^https?:\/\/letterboxd\.com\//.test(tabs[0].url) ? polyfill.tabs.reload(tabs[0].id) : null;
                });

                setError({text: "Image removed.", bool: false,});
                setImage("");
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect((): void => {
        loadValue().then((): void => {});
    }, []);

    return  (
        <div>
            <Main paragraph={'Letterboxd Backdrop: A Browser extension that adds a custom backdrop image to your Letterboxd profile.'}/>
            <div className="mx-4 mb-2 border-gray-400 relative flex flex-col">
                <label htmlFor="value" className="block my-1.5 text-sm font-medium text-white">
                    URL
                </label>
                <div className="flex">
                    <Input value={image} setValue={setImage} event={setValue}/>
                    <Button event={removeValue} text={"Delete image"}/>
                </div>
            </div>
            <Alert bool={error.bool} text={error.text}/>
            <Footer author={'Lukas W'}/>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
