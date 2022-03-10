import '../styles/_home.scss'
import {Button} from "primereact/button";
import {HashLink} from "react-router-hash-link";
import About from "./About";
import {SocialButtons} from "../common/SocialButtons";
import { Image } from 'primereact/image';

function Home(props) {

    return (
        <section id="#" className="home-section pt-7 w-screen h-screen overflow-hidden"
                 style={{ background: props.theme === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.7)'  }}>
            <div className="grid h-full w-full ml-0">
                <div className="col-12 lg:col-6 flex justify-content-center lg:justify-content-end align-items-center lg:pr-8">
                    <Image src={require(`../assets/me_${props.theme}.webp`)} width="250" imageClassName="border-circle" />
                </div>
                <div className="flex flex-column justify-content-center align-items-center mt-auto mb-auto">
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
                            <Button label="More about me" icon="pi pi-user"
                                className="p-button-raised p-button-info w-full"/>
                        </HashLink>
                    </div>
                    <div className="flex justify-content-center">
                        <SocialButtons props={props} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// <div className="col-12 lg:col-6 home-extras h-full">
//     <div
//         className="template h-full flex-column mt-6 lg:mt-0 flex lg:justify-content-center align-items-center">
//         <Button className="github p-0 w-12rem"
//                 onClick={() => window.open("https://github.com/subhash011", "_blank")}>
//             <i className="pi pi-github px-2"/>
//             <span className="px-3">GitHub</span>
//         </Button>
//         <HashLink smooth to="#contact" className="p-0 w-12rem mt-5 no-underline">
//             <Button label="Contact me" icon="pi pi-phone"
//                     className="p-button-raised p-button-primary w-full"/>
//         </HashLink>
//         <HashLink smooth to="#projects" className="p-0 w-12rem mt-5 no-underline">
//             <Button label="More about me" icon="pi pi-user"
//                     className="p-button-raised p-button-secondary w-full"/>
//         </HashLink>
//     </div>
// </div>

export default Home;