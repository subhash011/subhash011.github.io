import '../styles/_home.scss'
import {useEffect, useRef} from "react";
import Typewriter from 'typewriter-effect/dist/core';
import {animated, useSpring} from 'react-spring'
import {Button} from "primereact/button";
import {HashLink} from "react-router-hash-link";

function Home() {

    const nameRef = useRef(null);
    const [style, animateStyle] = useSpring(() => ({opacity: 0}));

    useEffect(() => {
        const typeWriter = new Typewriter(nameRef.current, {
            typeSpeed: 200,
            delay: 70,
            cursor: '',
            onComplete: () => {

            }
        });
        typeWriter
            .callFunction(() => {
                animateStyle.start({opacity: 0})
            })
            .typeString('Hello, I am <span class="name">Subhash</span>')
            .start()
            .callFunction(() => {
                typeWriter.stop();
                animateStyle.start({
                    opacity: 1,
                    delay: 500
                });
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="#" className="home-section pt-7 w-screen h-screen overflow-hidden">
            <div className="grid h-full w-full ml-0">
                <div className="col-12 lg:col-6 flex flex-column justify-content-center align-items-center mt-8 lg:mt-0 lg:ml-auto lg:w-25rem">
                    <div className="text-black-alpha-90 text-center lg:text-left">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h1 ref={nameRef}/>
                        <animated.div style={style} className="font-semibold">
                            I'm a computer science student and an experiential learner with hands-on
                            experience in multiple domains like web development, mobile development, artificial intelligence and
                            system programming.
                        </animated.div>

                    </div>
                </div>
                <div className="col-12 lg:col-6 home-extras h-full">
                    <div className="template h-full flex-column mt-6 lg:mt-0 flex lg:justify-content-center align-items-center">
                        <Button className="google p-0 w-10rem" onClick={() => window.open("https://github.com/subhash011", "_blank")} >
                            <i className="pi pi-github px-2" />
                            <span className="px-3">GitHub</span>
                        </Button>
                        <HashLink smooth to="#projects" className="p-0 w-10rem mt-5 no-underline">
                            <Button className="p-0 w-10rem">
                                <i className="pi pi-chevron-circle-down px-2" />
                                <span className="px-3">Know more</span>
                            </Button>
                        </HashLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Home;