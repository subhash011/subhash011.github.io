import {Card} from "primereact/card";
import {Image} from "primereact/image";
import React from "react";
import styled from "styled-components";
import {SectionHeading} from "../components/SectionHeading";
import skills from "../data/skills.json";

const ScaleOnHoverCard = styled(Card)`
  background-color: var(--surface-card);
  transition: transform 0.3s ease-in-out;
  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      transform: scale(1.05);
      background-color: var(--surface-d);
    }
  }
`;

function Skills() {
    return (
        <section id="skills" className="pt-7">
            <SectionHeading name="skills" heading={"Technical Skills"}/>
            <div className="flex justify-content-center pt-6" style={{width: '80%'}}>
                <div className="skills-grid grid justify-content-center">
                    {skills.map((skill, index) => {
                        return (
                            <div className="col-12 md:col-6 lg:col" style={{maxWidth: '400px'}} key={index}>
                                <ScaleOnHoverCard className="skills-grid-card w-full h-full">
                                    <div
                                        className="flex flex-column justify-content-center align-items-center border-round">
                                        <h3>{skill.name}</h3>
                                        <div className="grid pt-4 w-full my-auto justify-content-center">
                                            {skill.categories.map((category, index) => {
                                                return (
                                                    <div key={index}
                                                         className="flex flex-column align-items-center justify-content-center col-6">
                                                        <Image height="64px"
                                                               src={require(`../assets/skills/${category.image}`)}
                                                               alt={category.name}/>
                                                        <h4 className="font-semibold font-italic">{category.name}</h4>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </ScaleOnHoverCard>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default Skills;