import React from "react";
import skills from "../Data/skills.json";
import {SectionHeading} from "../Common/SectionHeading";
import {Image} from "primereact/image";
import '../styles/_skills.scss';

function Skills() {
    return (
        <section id="skills" className="pt-7 flex flex-column align-items-center">
            <SectionHeading name="skills" heading={"My Skills"}/>
            <div className="flex justify-content-center pt-6" style={{width: '80%'}}>
                <div className="skills-grid grid justify-content-center">
                    {skills.map((skill, index) => {
                        return (
                            <div className="skills-grid-card w-full" style={{maxWidth: '400px'}} key={index}>
                                <div className="flex flex-column justify-content-center align-items-center border-round">
                                    <h3>{skill.name}</h3>
                                    <div className="grid pt-4 w-full my-auto justify-content-center">
                                        {skill.categories.map((category, index) => {
                                            return (
                                                <div key={index} className="flex flex-column align-items-center justify-content-center col-6">
                                                    <Image height="64px" src={require(`../assets/skills/${category.image}`)} alt={category.name}/>
                                                    <h4 className="font-semibold font-italic">{category.name}</h4>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default Skills;