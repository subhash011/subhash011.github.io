import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import * as React from "react";

export const SocialButtons = ({props}) => {
    return (
        <div className="social-buttons flex justify-content-evenly">
            <span className="pl-1">
                <Button icon="pi pi-linkedin" target="_blank"
                        className={classNames(props.theme === 'light' ? "bg-blue-600" : "bg-blue-300", "border-0")}
                        onClick={() => window.open('https://www.linkedin.com/in/subhashs0620/', '_blank')}/>
            </span>
            <span className="pl-1">
                <Button icon="pi pi-instagram"
                        className="bg-pink-500 border-0"
                        onClick={() => window.open('https://www.instagram.com/subhash_011/', '_blank')}/>
            </span>
            <span className="pl-1 p-button-lg">
                <Button icon="pi pi-discord"
                        className={classNames(props.theme === 'light' ? "bg-gray-800" : "bg-gray-300", "border-0")}
                        onClick={() => window.open('https://discord.com/users/subhash011#0822', '_blank')}/>
            </span>
            <span className="pl-1">
                <Button icon="pi pi-twitter"
                        className={classNames(props.theme === 'light' ? "bg-blue-600" : "bg-blue-300", "border-0")}
                        onClick={() => window.open('https://twitter.com/subhash_011', '_blank')}/>
            </span>
        </div>
    );
}