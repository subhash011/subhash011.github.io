import * as React from 'react';
import Education from "./Eduction/Education";
import Projects from "./experience/projects/Projects";
import Contact from "./Contact/Contact";
import IndustrialExperience from "./experience/industry/Industry";
import {ScrollTop} from "primereact/scrolltop";
import Home from "./home/Home";

function Main({ theme }) {

    return (
        <React.Fragment>
            <div className="main-content">
                <Home />
                <Projects />
                <IndustrialExperience />
                <Education />
                <Contact theme={theme} />
                <ScrollTop threshold={10} />
            </div>
        </React.Fragment>
    );
}

export default Main;