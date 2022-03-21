import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import * as React from "react";
import styled from "styled-components";
import {ThemeContext} from "../Context";


const SocialButton = styled(Button)`
    margin-top: 2rem;
    height: 2rem;
    width: 2rem;
`;

export const SocialButtons = () => {

    const [theme] = React.useContext(ThemeContext);

    return (
        <div className="social-buttons flex justify-content-evenly">
            <span className="pl-1">
                <SocialButton icon="pi pi-linkedin" target="_blank"
                              className={classNames(theme === 'light' ? "bg-blue-600" : "bg-blue-300", "border-0")}
                              onClick={() => window.open('https://www.linkedin.com/in/subhashs0620/', '_blank')}/>
            </span>
            <span className="pl-1">
                <SocialButton icon="pi pi-instagram"
                              className="bg-pink-500 border-0"
                              onClick={() => window.open('https://www.instagram.com/subhash_011/', '_blank')}/>
            </span>
            <span className="pl-1 p-button-lg">
                <SocialButton icon="pi pi-discord"
                              className={classNames(theme === 'light' ? "bg-gray-800" : "bg-gray-300", "border-0")}
                              onClick={() => window.open('https://discord.com/users/subhash011#0822', '_blank')}/>
            </span>
            <span className="pl-1">
                <SocialButton icon="pi pi-twitter"
                              className={classNames(theme === 'light' ? "bg-blue-600" : "bg-blue-300", "border-0")}
                              onClick={() => window.open('https://twitter.com/subhash_011', '_blank')}/>
            </span>
        </div>
    );
}