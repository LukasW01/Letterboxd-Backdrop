import React from "react";

type Input = {
    value: string;
    setValue: ((value: (((prevState: string) => string) | string)) => void);
    event: (event: React.KeyboardEvent) => void;
    placeholder?: string;
};

const ImageInput: React.FC<Input> = (props: Input) => {
    return (
        <input
            type="text" id="value" className="flex-1 border text-sm rounded block p-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-white h-9"
            placeholder={props.placeholder ?? 'https://ltrbxd.com/image.jpg'}
            value={props.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {props.setValue(e.target.value);}}
            onKeyUp={props.event}
        />
    );
};

export default ImageInput;
