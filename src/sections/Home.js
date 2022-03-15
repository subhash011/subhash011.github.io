import '../styles/_home.scss'
import {Button} from "primereact/button";
import {HashLink} from "react-router-hash-link";
import AboutMe from "../components/AboutMe";
import {Image} from 'primereact/image';
import React, {useEffect} from "react";
import {Card} from "primereact/card";

function Home(props) {

    useEffect(() => {
        document.getElementById("my-image").oncontextmenu = function () {
            return false;
        };
    }, [])

    return (
        <section id="#" className="home-section w-screen h-screen overflow-hidden mb-0">
            <svg className="clip-svg" width="0" height="0">
                <defs>
                    <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                        <polygon points="0 0.6, 0 1, 1 1, 1 0.4"/>
                    </clipPath>
                </defs>
            </svg>
            <div className="element absolute w-screen h-screen hidden lg:inline-block"/>
            <div className="flex w-full h-full justify-content-center align-items-center" >
                <Card
                    className="home-card w-max mx-2 shadow-none border-primary lg:shadow-8">
                    <div className="flex justify-content-center align-items-center grid">
                        <div id="my-image" className="md:col-4">
                            <Image src={require(`../assets/home/me_transparent.webp`)} width="250"
                                   imageClassName="border-circle"/>
                        </div>
                        <div className="flex flex-column lg:pl-6">
                            <AboutMe props={props}/>
                            <div
                                className="flex w-full grid justify-content-center lg:justify-content-start align-items-center">
                        <span className="p-0 mt-5 no-underline">
                            <Button label="GitHub" icon="pi pi-github"
                                    className="p-button-raised p-button-secondary w-full"
                                    onClick={() => window.open("https://github.com/subhash011", "_blank")}
                            />
                        </span>
                                <HashLink smooth to="#contact" className="p-0 ml-2 mt-5 no-underline">
                                    <Button label="Contact me" icon="pi pi-phone"
                                            className="p-button-raised p-button-primary w-full"/>
                                </HashLink>
                                <HashLink smooth to="#projects" className="p-0 ml-2 mt-5 no-underline">
                                    <Button label="Know more" icon="pi pi-user"
                                            className="p-button-raised p-button-info w-full"/>
                                </HashLink>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}

export default Home;