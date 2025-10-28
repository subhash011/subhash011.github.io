import {ScrollTop} from "primereact/scrolltop";
import * as React from 'react';
import TopBar from "./components/Topbar";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Home from "./sections/Home";
import IndustrialExperience from "./sections/Industry";
import Projects from "./sections/Projects";
import { useLocation } from 'react-router-dom';
import AdvertisingPlatform from "./advertising-platform/App";

function Main() {
    const [showOnlyAdPlatform, setShowOnlyAdPlatform] = React.useState(false);
    const location = useLocation();


    React.useEffect(() => {
        const checkHash = () => {
            const hash = window.location.hash;
            setShowOnlyAdPlatform(hash === '#advertising-platform');
        };

        // Check hash on mount
        checkHash();

        // Listen for hash changes
        window.addEventListener('hashchange', checkHash);

        return () => {
            window.removeEventListener('hashchange', checkHash);
        };
    }, [location]);

    // If URL has #advertising-platform hash, show only navbar + advertising platform
    if (showOnlyAdPlatform) {
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{ marginTop: 0, paddingTop: 0 }}>
                    <div className="advertising-platform-standalone">
                        <AdvertisingPlatform/>
                    </div>
                </div>
                <ScrollTop threshold={10}/>
            </React.Fragment>
        );
    }

    // Otherwise show the full page with all sections
    return (
        <React.Fragment>
            <TopBar/>
            <div className="h-6"/>
            <Home/>
            <IndustrialExperience/>
            <Education/>
            <Projects/>
            <Contact/>
            <ScrollTop threshold={10}/>
        </React.Fragment>
    );
}

export default Main;