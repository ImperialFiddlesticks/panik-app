import * as React from "react";

type SubmitButtonProps = {
    label?: string;
    loadingLabel?: string;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?:() => void;
    type?: "button" | "submit";
};

export function SubmitButton({label ="Submit", loadingLabel="Checking...", isLoading= false, disabled = false, onClick, type = "button"}: SubmitButtonProps){
    const isDisabled = disabled || isLoading;

    return (
        <button type={type} className="submit-button" disabled={isDisabled} onClick={onClick}>
            {isLoading ? loadingLabel : label}
        </button>
    );
}