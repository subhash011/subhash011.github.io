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
                delay: 1000
            });
        }
    }, [animateStyle, toAnimate]);

    useEffect(() => {
        const typewriter = new Typewriter(ref.current, {
            loop: true,
            delay: 40,
            deleteSpeed: 20,
            cursorClassName: props.theme === 'light' ? "text-blue-700" : "text-green-500",
            wrapperClassName: props.theme === 'light' ? "text-blue-700" : "text-green-500"
        });
        typewriter
            .callFunction(() => {
                if (!toAnimate) {
                    setToAnimate(false);
                }
            })
            .typeString('subhash')
            .callFunction(() => {
                if (!toAnimate) {
                    setToAnimate(true);
                }
            })
            .pauseFor(2500)
            .deleteAll()
            .typeString('a computer science student')
            .pauseFor(2500)
            .deleteAll()
            .typeString('a passionate learner')
            .pauseFor(2500)
            .start();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateStyle, props.theme]);

    return (
        <div
            className="col-12 lg:col-6 lg:w-30rem mr-2">
            <div className="about-content text-center lg:text-left"
                 style={{color: props.theme === 'light' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'}}>
                <h1 className="uppercase">
                    Hi,
                    <span className="flex justify-content-center lg:justify-content-start">
                        I'm&nbsp;
                        <span ref={ref}/>
                    </span>
                </h1>
                <animated.div style={style} className="font-semibold">
                    I'm a computer science student and an experiential learner with hands-on
                    experience in multiple domains like web development, mobile development, artificial
                    intelligence and
                    system programming.
                </animated.div>

            </div>
        </div>
    );
}

// <Typewriter
//     options={{
//         loop: true,
//         delay: 20,
//         deleteSpeed: 10,
//         cursorClassName: props.theme === 'light' ? "text-blue-900" : "text-green-500",
//         wrapperClassName: "text-blue-900"
//     }}
//     onInit={(typewriter) => {
//         typewriter.typeString(' Subhash')
//             .callFunction(() => {
//                 if (!toAnimate) {
//                     setToAnimate(true);
//                 }
//             })
//             .pauseFor(2500)
//             .deleteAll()
//             .typeString(' a Software Engineer')
//             .pauseFor(2500)
//             .deleteAll()
//             .typeString('a self learner')
//             .pauseFor(2500)
//             .start();
//     }}
// />

export default About;