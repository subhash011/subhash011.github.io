import {Button} from "primereact/button";
import {Card} from "primereact/card";
import '../styles/_education.scss';
import {Timeline} from "primereact/timeline";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {animated, useSpring} from "react-spring";
import {Image} from "primereact/image";

function Education() {

    const coreCourses = [
        {
            name: "Software Engineering",
            repo: "https://github.com/subhash011/meet.me"
        },
        {
            name: "Computer networks",
            repo: "https://github.com/subhash011/cnlab-sem7"
        },
        {
            name: "Deep learning"
        },
        {
            name: "Reinforcement learning"
        },
        {
            name: "Compiler design",
            repo: "https://github.com/subhash011/compilers-sem6"
        },
        {
            name: "Database management systems"
        },
        {
            name: "Operating systems",
            repo: "https://github.com/subhash011/os-sem5"
        },
        {
            name: "Theory of computation"
        },
        {
            name: "Paradigms of programming",
            repo: "https://github.com/subhash011/popl-sem5"
        },
        {
            name: "Artificial intelligence"
        },
        {
            name: "Computer architecture"
        },
        {
            name: "Design and analysis of algorithms"
        },
        {
            name: "Discrete mathematics"
        },
        {
            name: "Logic for computing"
        },
        {
            name: "Data structures and algorithms"
        },
    ];
    const electives = [
        {
            name: "Econometrics"
        },
        {
            name: "Foundations of linguistics"
        },
        {
            name: "Numerical analysis"
        },
        {
            name: "Principles of economics"
        },
    ]

    const [openItem, setOpenItem] = useState( null);
    const ref = useRef(null);
    const [style, animateStyle] = useSpring(() => ({
        height: '0px'
    }), []);

    useEffect(() => {
        animateStyle.start({
            height: (openItem ? ref.current.offsetHeight + openItem.additionalHeight : 0) + 'px',
        });
    }, [ref, openItem, animateStyle]);

    const education = [
        {
            id: 1,
            title: 'B.Tech in Computer Science and Engineering',
            school: 'Indian Institute of Technology (IIT), Palakkad',
            date: 'August 2018 - Present',
            grade: 'CGPA: 8.69/10',
            description: '',
            icon: 'pi pi-star',
            color: '#673AB7',
            additionalHeight: 32,
            extra:
                <React.Fragment>
                    <div ref={ref} className="iit-extras">
                        <h4>Core Courses</h4>
                        <Image src={process.env.PUBLIC_URL + "/assets/core-courses.png"} width="100%" alt="Image" preview />
                    </div>
                </React.Fragment>
        },
        {
            id: 2,
            title: 'Higher Secondary Education',
            school: 'Sri Chaitanya PU College, JP Nagar, Bangalore',
            date: 'July 2016 - May 2018',
            grade: 'Percentage: 95.60%',
            description: '',
            icon: 'pi pi-star',
            color: '#673AB7'
        }
    ]

    const customizedMarker = (item) => {
        return (
            <span className="custom-marker p-shadow-2" style={{backgroundColor: item.color}}>
                <i className={item.icon}/>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card className="flex text-left max-w-full">
                <h4 className="mb-2">{item.title}</h4>
                <span className="text-600">{item.school}</span>
                <p>{item.date}</p>
                <p>{item.grade}</p>
                <p>{item.description}</p>
                {item.extra && <div style={{height: '100%'}}>
                    <animated.div style={{overflow: "hidden", ...style}}>
                        {item.extra}
                    </animated.div>
                </div>}
                {item.extra && <div>
                    <span className="w-full flex justify-content-end">
                        <Button label={`See ${openItem && item.id === openItem.id ? 'less' : 'more'}`} className="p-button-text"
                            onClick={() => {
                                setOpenItem(!openItem ? item : 0);
                            }}/>
                    </span>
                </div>}
            </Card>
        );
    };

    return (
        <section id="education" className="education-timeline pt-7">
            <Timeline value={education} align="alternate" className="customized-timeline" marker={customizedMarker}
                      content={customizedContent}/>
        </section>
    );
}

export default Education;