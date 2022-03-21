import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  position: relative;
  padding: 0;
  margin: 0;
  font-size: 30px;

  :before {
    background-color: #c50000;
    content: '';
    display: block;
    height: 3px;
    width: 40%;
    margin-bottom: 5px;
  }

  :after {
    background-color: #c50000;
    content: '';
    display: block;
    margin-left: auto;
    margin-right: 0;
    height: 3px;
    width: 40%;
    margin-top: 5px;
  }
`;

function SectionHeading({heading, name}) {
    return (
        <div data-name={name} className="section-heading uppercase my-6 flex w-full justify-content-center">
            <Heading>
                {heading}
            </Heading>
        </div>
    );
}

export {SectionHeading};