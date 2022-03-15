import * as React from 'react';
import {useState} from 'react';
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import IndustrialExperience from "./sections/Industry";
import {ScrollTop} from "primereact/scrolltop";
import Home from "./sections/Home";
import Skills from "./sections/Skills";
import TopBar from "./components/Topbar";

function Main() {

    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    return (
        <React.Fragment>
            <TopBar onThemeChange={setTheme}/>
            <div className="h-6"/>
            <Home theme={theme}/>
            <div className="main-content">
                <Projects/>
                <IndustrialExperience/>
                <Skills/>
                <Contact theme={theme}/>
                <ScrollTop threshold={10}/>
            </div>
        </React.Fragment>
    );
}

export default Main;