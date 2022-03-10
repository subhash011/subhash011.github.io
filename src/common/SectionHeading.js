import React from "react";

function SectionHeading({heading, name}) {
    return (
        <div data-name={name} className="section-heading uppercase flex w-full justify-content-center">
            <h1 className="m-2 text-4xl lg:text-5xl border-bottom-2 border-primary">
                {heading}
            </h1>
        </div>
    );
}

export {SectionHeading};