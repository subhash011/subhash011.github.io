import Typewriter from 'typewriter-effect/dist/core';
import {animated, useSpring} from "react-spring";
import {useEffect, useRef, useState} from "react";

function About({props}) {
    const [toAnimate, setToAnimate] = useState(false);
    const [style, animateStyle] = useSpring(() => ({opacity: 0}));
    const ref = useRef(null);

    useEffect(() => {
        if (toAnimate) {
            animateStyle.start({
                opacity: 1,
                delay: 200
            });
        }
    }, [animateStyle, toAnimate]);

    useEffect(() => {
        const typewriter = new Typewriter(ref.current, {
            loop: false,
            delay: 40,
            deleteSpeed: 20,
            cursorClassName: props.theme === 'light' ? "text-orange-800" : "text-green-500",
            wrapperClassName: props.theme === 'light' ? "text-orange-800" : "text-green-500"
        });
        typewriter
            .typeString('subhash')
            .callFunction(() => {
                if (!toAnimate) {
                    setToAnimate(true);
                }
            })
            .start();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateStyle, props.theme]);

    return (
        <div
            className="col-12 lg:col-6 lg:w-30rem mr-2">
            <div className="about-content text-center lg:text-left"
                 style={{color: props.theme === 'light' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'}}>
                <h2 className="uppercase mb-0">
                    Hi,
                    <span className="flex justify-content-center lg:justify-content-start">
                        I'm&nbsp;
                        <span ref={ref}/>
                    </span>
                </h2>
                <animated.div style={style} className="font-semibold">
                    <h4 className="mt-2 mb-4">CSE | IIT Palakkad'22</h4>
                    I'm a computer science student with a strong foundation in problem solving and an ever-growing zeal to explore
                    new domains and technologies. I've led and worked with teams in multiple projects, enhancing my communication
                    skills, team-work, and leadership.
                </animated.div>

            </div>
        </div>
    );
}

export default About;