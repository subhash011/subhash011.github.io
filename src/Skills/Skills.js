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
                <div className="skills-grid grid col-12 justify-content-center">
                    {skills.map((skill, index) => {
                        return (
                            <div className="col-12 sm:col-6 lg:col-4 xl:col-3" key={index}>
                                <div className="w-full h-full flex flex-column justify-content-center align-items-center surface-card border-round">
                                    <h3>{skill.name}</h3>
                                    <div className="grid pt-4 w-full my-auto justify-content-center">
                                        {skill.categories.map((category, index) => {
                                            return (
                                                <div key={index} className="flex flex-column align-items-center justify-content-center col-6">
                                                    <Image height="64px" src={require(`../assets/skills/${category.image}`)} alt={category.name}/>
                                                    <h3>{category.name}</h3>
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