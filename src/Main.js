import * as React from 'react';
import TopBar from "./topbar/Topbar";
import {useCallback, useEffect, useState} from "react";
import Education from "./Eduction/Education";
import Home from "./home/Home";
import Projects from "./experience/projects/Projects";
import Contact from "./Contact/Contact";
import IndustrialExperience from "./experience/industry/Industry";
import {ScrollTop} from "primereact/scrolltop";
import {Divider} from "primereact/divider";

function Main() {

    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(() => {
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
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }, [theme])

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (!localTheme) {
            localStorage.setItem('theme', theme);
        }
        if (localTheme !== theme) {
            toggleTheme();
        }
    }, [theme, toggleTheme]);

    return (
        <React.Fragment>
            <TopBar theme={theme} toggleTheme={toggleTheme} />
            <Home />
            <Divider />
            <Projects />
            <Divider />
            <IndustrialExperience />
            <Education />
            <Contact theme={theme} />
            <ScrollTop threshold={10} />
        </React.Fragment>
    );
}

export default Main;