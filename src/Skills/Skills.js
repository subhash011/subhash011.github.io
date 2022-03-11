import React from "react";
import skills from "../Data/skills.json";
import {SectionHeading} from "../Common/SectionHeading";
import {Image} from "primereact/image";
import '../styles/_skills.scss';

function Skills() {
    return (
        <section id="skills" className="pt-7">
            <SectionHeading name="skills" heading={"My Skills"}/>
            <div className="flex justify-content-center pt-6">
                <div className="skills-grid grid w-full justify-content-center">
                    {skills.map((skill, index) => {
                        return (
                            <div className="col-12 surface-card xl:col-4 border-round lg:col-6 flex flex-column align-items-center" key={index}>
                                <h3>{skill.name}</h3>
                                <div className="grid w-full mt-auto mb-auto justify-content-center">
                                    {skill.categories.map((category, index) => {
                                        return (
                                            <div key={index} className="flex flex-column align-items-center justify-content-center col-4">
                                                <Image height="64px" src={require(`../assets/skills/${category.image}`)} alt={category.name}/>
                                                <h3>{category.name}</h3>
                                            </div>
                                        )
                                    })}
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