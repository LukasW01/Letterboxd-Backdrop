import React from "react";

type Button = {
    event: () => void;
    text: string;
};

const Button: React.FC<Button> = (props: Button) => {
    return (
        <button
            type="button" className="py-2 px-1 mr-2 mb-0.5 text-sm ml-1 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center"
            onClick={props.event}
        >
            {props.text}
        </button>
    );
};

export default Button;
