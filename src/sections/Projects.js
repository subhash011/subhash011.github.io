import {DataView} from "primereact/dataview";
import projectsData from "../data/projects.json";
import {Card} from "primereact/card";
import "../styles/_projects.scss"
import {Tag} from "primereact/tag";
import React, {useEffect} from "react";
import {SectionHeading} from "../components/SectionHeading";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {animated, useSpring} from 'react-spring';
import {Chip} from "primereact/chip";


const projectFilters = [
    "FEATURED",
    "HACKATHON",
    "COURSEWORK",
    "OTHERS"
]

function RotateArrow({flip, ...rest}) {

    const iconStyles = useSpring({
        from: {rotateZ: flip ? 0 : 0},
        to: {rotateZ: flip ? 180 : 0}
    })


    return (
        <React.Fragment>
            <animated.div {...rest} style={iconStyles}>
                <i className="pi pi-chevron-down mt-1"/>
            </animated.div>
        </React.Fragment>
    )
}

const AnimatedProjectHeading = ({heading, allVisible, setAllVisible}) => {
    const text = allVisible ? "See featured" : "See all";

    const [styles, api] = useSpring(() => ({ opacity: 1 }))


    return (
        <span className="flex flex-column justify-content-center align-items-center">
            <animated.div style={styles} className="flex flex-column justify-content-center align-items-center">
                <span>{heading}</span>
                <span onClick={() => {
                    api({
                        opacity: 0,
                        immediate: true,
                        onRest() {
                            setAllVisible(!allVisible)
                            api({
                                opacity: 1,
                                delay: 40,
                            })
                        }
                    })
                }} className="flex cursor-pointer text-primary">
                    {text}
                    <RotateArrow className="ml-2" flip={allVisible}/>
                </span>
            </animated.div>
        </span>
    )
}

function MyProjects() {

    const [dialogVisible, setDialogVisible] = React.useState(null);
    const [allVisible, setAllVisible] = React.useState(false);
    const [projects, setProjects] = React.useState(projectsData.filter(project => project.filters.includes("FEATURED")));
    const [styles, api] = useSpring(() => ({ opacity: 1 }))
    const [filters, setFilters] = React.useState([ "FEATURED" ]);

    useEffect(() => {
        const filteredProjects = projectsData.filter(project => {
            return filters.some(filter => project.filters.includes(filter))
        });
        setProjects([]);
        api.start({
            opacity: 0,
            immediate: true,
            onRest() {
                setProjects(filteredProjects);
                api.start({
                    opacity: 1,
                    delay: 40,
                })
            }
        })
        // eslint-disable-next-line
    }, [filters]);

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const title = (item) => {
        return (
            <span className="flex justify-content-center">
                <h5 className="mt-0 text-xl h-2rem item-title white-space-nowrap overflow-hidden text-overflow-ellipsis">{item.title}</h5>
            </span>
        );
    }

    const extraContent = (item) => {
        if (!!!item) return null;
        return (
            <div className="flex flex-column">
                <ul className="flex-1" style={{paddingLeft: '20px'}}>
                    {item.workDone.map((work, index) => {
                        return (
                            <li key={index}>
                                {work}
                            </li>
                        )
                    })}
                </ul>
                <div className="flex align-items-center justify-content-center flex-wrap mt-4">
                    {item.techStack.map((tag, index) => {
                        return (
                            <Tag key={index} className="mr-2 mb-2" value={tag}/>
                        )
                    })}
                </div>
            </div>
        );
    }

    const dialogItemCard = (item, children) => {
        return (
            <div id={item.id} title={title(item)} className="w-full h-full">
                <div
                    className="flex justify-content-center text-center font-italic font-semibold my-2">{item.description}</div>
                {children}
            </div>
        );
    }

    const renderDialogItem = (item) => {
        if (!!!item) return null;
        return (
            <div className="flex justify-content-center mx-4 mb-4">
                {dialogItemCard(item, extraContent(item))}
            </div>
        )
    }

    const gridItemCard = (item) => {
        return (
            <Card className="h-full item-card">
                <div className="flex justify-content-between">
                    <div>
                        <i style={{'fontSize': '2rem'}} className="pi pi-folder"/>
                    </div>
                    <div className="h-2rem flex align-items-center">
                        {item.gitHub &&
                            <i style={{'fontSize': '1.2rem'}} onClick={() => window.open(item.gitHub, "_blank")}
                               className="pi pi-github ml-auto cursor-pointer"/>}
                        {item.site && <i style={{'fontSize': '1.2rem'}} onClick={() => window.open(item.site, "_blank")}
                                         className="pi pi-external-link ml-3 cursor-pointer"/>}
                        {item.youtube &&
                            <i style={{'fontSize': '1.2rem'}} onClick={() => window.open(item.youtube, "_blank")}
                                            className="pi pi-youtube ml-3 cursor-pointer"/>}
                    </div>
                </div>
                <div className="h-2rem"/>
                {title(item)}
                <div
                    className="flex justify-content-center text-center font-italic font-semibold">{item.description}</div>
                {item.extra && <div className="flex justify-content-end mt-3">
                    <Button label="See more" className="p-button-text"
                            onClick={() => {
                                setDialogVisible(item);
                            }}/>
                </div>}
            </Card>
        );
    }

    const renderGridItem = (item) => {
        if (!!!item) return null;
        return (
            <div className="flex projects-grid justify-content-center md:col-6 lg:col p-4" style={{maxWidth: '400px'}}>
                {gridItemCard(item)}
            </div>
        )
    }

    const toggleFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(f => f !== filter));
        } else {
            setFilters([...filters, filter]);
        }
    }

    return (
        <section id="projects" className="pt-7">
            <Dialog className="item-dialog max-h-screen mx-2 lg:mx-0" visible={!!dialogVisible}
                    onHide={() => setDialogVisible(null)}
                    blockScroll
                    dismissableMask
                    draggable={false}
                    style={{maxWidth: '600px'}}
                    breakpoints={{'960px': '75vw', '640px': '100vw'}}
                    contentClassName="h-full">
                {renderDialogItem(dialogVisible, extraContent(dialogVisible))}
            </Dialog>
            <div className="flex flex-column justify-content-center align-items-center">
                <SectionHeading name={"projects"} heading="My Projects"/>
                <div className="flex flex-column align-items-center mb-4">
                    <AnimatedProjectHeading heading={!allVisible ? <h3>Featured projects ({projects.length})</h3> :
                        <h3>Noteworthy projects ({projects.length})</h3>} allVisible={allVisible} setAllVisible={() => {
                        if (!allVisible) {
                                setFilters(projectFilters);
                            } else {
                                setFilters(['FEATURED']);
                            }
                            setAllVisible(!allVisible);
                    }}/>
                </div>
                {allVisible && (
                    <div className="grid col-8 my-4 flex justify-content-center" style={{ gridGap: '10px' }}>
                        {projectFilters.map((filter, idx) => (
                            <span key={idx} onClick={() => toggleFilter(filter)}
                                  className="cursor-pointer">
                                <Chip icon={`pi ${filters.includes(filter) ? "pi-check" : "pi-times"}`}
                                      label={toTitleCase(filter)} className={filters.includes(filter) ? "bg-primary" : ""} />
                            </span>
                        ))}
                    </div>
                )}
                <animated.div style={styles} className="flex justify-content-center">
                    <DataView className="projects-dataview" value={projects}
                              itemTemplate={renderGridItem}
                              layout="grid"/>
                </animated.div>
            </div>
        </section>
    );
}

export default MyProjects;