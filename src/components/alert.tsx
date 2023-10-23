import React, {ReactElement, useState} from 'react';

type Alert = {
    bool: boolean;
    text: string;
};

const Alert: React.FC<Alert> = (props: Alert): ReactElement<string, string> | null => {
    const [show, setShow]: [boolean, ((value: (((prevState: boolean) => boolean) | boolean)) => void)] = useState(true);

    const dismissAlert = (): void => {
        setShow(false);
    };

    return (
        show && props.text != '' ? (
            <div role="alert" className={`mx-4 animate-slide-in flex ${props.bool ? "text-red-500" : "text-green-500"}`}>
                <div className="gap-4 flex items-center justify-between">
                    <div>
                        <strong className={`font-medium ${props.bool ? "text-red-500" : "text-green-500"}`}>{props.bool ? "Error" : "Changes saved"}</strong>
                        <span className="mt-1 text-sm text-gray-200">: {props.text}</span>
                    </div>
                    <button onClick={dismissAlert} className="flex-shrink-0 transition text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Dismiss popup</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="h-6 w-6" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        ) : null
    );
};

export default Alert;
