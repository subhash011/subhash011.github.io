import * as React from 'react';
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import IndustrialExperience from "./sections/Industry";
import {ScrollTop} from "primereact/scrolltop";
import Home from "./sections/Home";
import Skills from "./sections/Skills";
import TopBar from "./components/Topbar";

function Main() {

    return (
        <React.Fragment>
            <TopBar/>
            <div className="h-6"/>
            <Home/>
            <div className="main-content">
                <Projects/>
                <IndustrialExperience/>
                <Skills/>
                <Contact/>
                <ScrollTop threshold={10}/>
            </div>
        </React.Fragment>
    );
}

export default Main;