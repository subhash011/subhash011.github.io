import React from "react";
import './_sectionHeading.scss'

function SectionHeading({heading, name}) {
    return (
        <div data-name={name} className="section-heading uppercase my-6 flex w-full justify-content-center">
            <h1 className="m-2">
                {heading}
            </h1>
        </div>
    );
}

export {SectionHeading};