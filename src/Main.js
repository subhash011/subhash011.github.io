import * as React from 'react';
import TopBar from "./topbar/topbar";
import {useState} from "react";
import Education from "./Eduction/education";
import Home from "./home/home";
import Projects from "./experience/projects/projects";
import Contact from "./Contact/contact";
import IndustrialExperience from "./experience/industry/industry";

function Main() {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        const elementId = 'theme-link';
        const linkElement = document.getElementById('theme-link');
        const cloneLinkElement = linkElement.cloneNode(true);
        const newThemeUrl = linkElement.getAttribute('href').replace(theme, newTheme);

        cloneLinkElement.setAttribute('id', elementId + '-clone');
        cloneLinkElement.setAttribute('href', newThemeUrl);
        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', elementId);
        });

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
        setTheme(newTheme);
    }

    return (
        <React.Fragment>
            <TopBar theme={theme} toggleTheme={toggleTheme} />
            <div className="pt-7" />
            <Home />
            <Projects />
            <IndustrialExperience />
            <Education />
            <Contact />
        </React.Fragment>
    );
}

export default Main;