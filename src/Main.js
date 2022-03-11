import * as React from 'react';
import Education from "./Eduction/Education";
import Projects from "./Experience/Projects/Projects";
import Contact from "./Contact/Contact";
import IndustrialExperience from "./Experience/Industry/Industry";
import {ScrollTop} from "primereact/scrolltop";
import Home from "./Home/Home";
import Skills from "./Skills/Skills";

function Main({ theme }) {

    return (
        <React.Fragment>
            <Home theme={theme} />
            <div className="main-content">
                <Projects />
                <IndustrialExperience />
                {/*<Skills />*/}
                <Education />
                <Contact theme={theme} />
                <ScrollTop threshold={10} />
            </div>
        </React.Fragment>
    );
}

export default Main;