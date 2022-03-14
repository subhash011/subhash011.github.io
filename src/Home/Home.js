import '../styles/_home.scss'
import {Button} from "primereact/button";
import {HashLink} from "react-router-hash-link";
import About from "./About";
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
        <section id="#" className="home-section pt-7 w-screen h-screen overflow-hidden mb-0"
                 style={{background: props.theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.7)'}}>
            <div className="flex w-full h-full justify-content-center align-items-center">
                <Card
                    style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                    className="home-card w-max mx-2 z-5">
                    <div className="flex justify-content-center align-items-center grid">
                        <div id="my-image" className="md:col-4">
                            <Image src={require(`../assets/home/me_${props.theme}.webp`)} width="250"
                                   imageClassName="border-circle"/>
                        </div>
                        <div className="flex flex-column lg:pl-6">
                            <About props={props}/>
                            <div className="flex w-full grid justify-content-center lg:justify-content-start align-items-center">
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
                                <HashLink smooth to="#projects" className="p-0 ml-2 mt-2 lg:mt-5 no-underline">
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