import '../styles/_education.scss';
import React from "react";
import {CardTimeLine, SectionHeading} from "../common/CardTimeline";
import educationData from "../data/education.json";
import {Tag} from "primereact/tag";

function Education() {


    const extraContent = (item) => {
        return (
            <React.Fragment>
                <div className="flex align-items-center justify-content-center flex-wrap mt-4">
                    {item.courses.map((course, index) => {
                        return (
                            <Tag key={index} className="mr-2 mb-2" value={course} />
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    for (let i = 0; i < educationData.length; i++) {
        educationData[i].extraContent = extraContent(educationData[i]);
    }

    return (
        <section id="education" className="pt-7">
            <div className="flex flex-column w-full align-items-center">
                <SectionHeading heading="Education"/>
                <div className="w-full mr-0 flex justify-content-center mt-4">
                    <CardTimeLine value={educationData} align="alternate"/>
                </div>
            </div>
        </section>
    );
}

export default Education;