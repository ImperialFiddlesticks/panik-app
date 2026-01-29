import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type HomeOptionButtonProps = {
    icon:ReactNode;
    title:string;
    description:string;
    to: string;
    disabled?: boolean;
};

export function HomeOptionButton({
    icon, title, description, to, disabled = false,
}: HomeOptionButtonProps) {

    return (
        <Link to={to} className="option-button">
            <span >{icon}</span>
            <div className="option-text">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </Link>
    )
}