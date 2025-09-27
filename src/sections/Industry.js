import {Tag} from "primereact/tag";
import React from "react";
import styled from "styled-components";
import {CardTimeLine} from "../components/CardTimeline";
import {SectionHeading} from "../components/SectionHeading";
import industryExperience from "../data/industryExperience.json";

const Ul = styled.ul`
  position: relative;
  list-style: none;
  padding-left: 20px;

  li {
    margin-bottom: 0.5rem;
    padding-left: 2px;
    line-height: 1.2;

    :before {
      content: "\\2713";
      position: absolute;
      left: 0;
    }
  }
`;

function IndustrialExperience() {

    const extraContent = (workDone, tags) => {
        return (
            <React.Fragment>
                <Ul>
                    {workDone.map((work, index) => {
                        return (
                            <React.Fragment key={index}>
                                <li 
                                    className="work-item" 
                                    key={index} >
                                    {work}
                                </li>
                            </React.Fragment>
                        )
                    })}
                </Ul>
                <div className="flex align-items-center justify-content-center flex-wrap mt-4">
                    {tags.map((tag, index) => {
                        return (
                            <Tag key={index} className="mr-2 mb-2" value={tag}/>
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