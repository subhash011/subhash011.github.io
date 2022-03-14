import '../styles/_home.scss'
import {Button} from "primereact/button";
import {HashLink} from "react-router-hash-link";
import About from "./About";
import { Image } from 'primereact/image';
import {useEffect} from "react";

function Home(props) {

    useEffect(() => {
        document.getElementById("my-image").oncontextmenu = function() {
            return false;
        };
    }, [])

    return (
        <section id="#" className="home-section pt-7 w-screen h-screen overflow-hidden mb-0"
                 style={{ background: props.theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.7)'  }}>
            <div style={{ background: props.theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'transparent'  }} className="grid h-full w-full ml-0 mt-0">
                <div id="my-image" className="col-12 lg:col-6 flex justify-content-center lg:justify-content-end align-items-center lg:pr-8">
                    <Image src={require(`../assets/home/me_${props.theme}.webp`)} width="250" imageClassName="border-circle" />
                </div>
                <div className="flex flex-column justify-content-center align-items-center mb-8">
                    <About props={props} />
                    <div className="flex grid justify-content-center align-items-center">
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
        </section>
    );
}

export default Home;