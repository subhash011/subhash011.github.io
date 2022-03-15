import React from "react";
import {CardTimeLine} from "../components/CardTimeline";
import industryExperience from "../data/industryExperience.json";
import {Tag} from "primereact/tag";
import {SectionHeading} from "../components/SectionHeading";
import '../styles/_industry.scss';

function IndustrialExperience() {

    const extraContent = (workDone, tags) => {
        return (
            <React.Fragment>
                <ul className="work-done" style={{lineHeight: '1.2rem', paddingLeft: '20px'}}>
                    {workDone.map((work, index) => {
                        return (
                            <li key={index}>
                                {work}
                            </li>
                        )
                    })}
                </ul>
                <div className="flex align-items-center justify-content-center flex-wrap mt-4">
                    {tags.map((tag, index) => {
                        return (
                            <Tag key={index} className="mr-2 mb-2" value={tag} />
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    for (let i = 0; i < industryExperience.length; i++) {
        industryExperience[i].extraContent = extraContent(industryExperience[i].workDone, industryExperience[i].tags);
    }

    return (
        <section id="experience" className="pt-7">
            <div className="flex flex-column w-full align-items-center">
                <SectionHeading name={"experience"} heading="Work Experience"/>
                <div className="w-full mr-0 flex justify-content-center">
                    <CardTimeLine value={industryExperience} align="alternate"/>
                </div>
            </div>
        </section>
    );
}

export default IndustrialExperience;