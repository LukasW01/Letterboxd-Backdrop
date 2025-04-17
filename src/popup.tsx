import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Alert from "./components/alert";
import Button from "./components/button";
import Input from "./components/input";
import Main from "./components/main";
import Footer from "./components/footer";
import useStore from "./store/popupStore";
import "./css/tailwind.css";

const App: React.FC = () => {
    const { image, error, setImage, setValue, removeValue, loadValue } = useStore();

    useEffect(() => {
        loadValue();
    }, [loadValue]);

    return (
        <div>
            <Main/>
            <div className="mx-4 mb-2 border-gray-400 relative flex flex-col">
                <label htmlFor="value" className="block my-1.5 text-sm font-medium text-white">
                    URL
                </label>
                <div className="flex">
                    <Input value={image} setValue={setImage} event={setValue} placeholder="https://ltrbxd.com/image.jpg"/>
                    <Button event={removeValue} text="Delete Image"/>
                </div>
            </div>
            <Alert bool={error.bool} text={error.text}/>
            <Footer/>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
