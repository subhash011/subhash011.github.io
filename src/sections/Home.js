import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Image} from 'primereact/image';
import React, {useEffect} from "react";
import {HashLink} from "react-router-hash-link";
import styled from "styled-components";
import AboutMe from "../components/AboutMe";

const breakpoints = {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
}

const InfoCard = styled(Card)`
  background-color: var(--surface-card);
  @media screen and (max-width: ${breakpoints['lg']}) {
    background-color: var(--surface-ground);
  }

  img {
    background-color: var(--surface-ground);
    @media screen and (max-width: ${breakpoints['lg']}) {
      background-color: var(--surface-card);
    }
  }
`;

const ClipElement = styled.div`
  background-color: var(--surface-card);
  z-index: -1;
  -webkit-clip-path: polygon(0 100%, 0 0, 100% 0, 80% 100%);
  clip-path: polygon(0 100%, 0 0, 100% 0, 80% 100%);
  -webkit-clip-path: url("#clip-shape");
  clip-path: url("#clip-shape");
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: none;
  @media screen and (min-width: ${breakpoints['lg']}) {
    display: inline-block;
  }
`;

function Home() {

    useEffect(() => {
        document.getElementById("my-image").oncontextmenu = function () {
            return false;
        };
    }, [])

    return (
        <section id="#" className="home-section w-screen h-screen overflow-hidden mb-0">
            <svg width="0" height="0">
                <defs>
                    <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
                        <polygon points="0 0.6, 0 1, 1 1, 1 0.4"/>
                    </clipPath>
                </defs>
            </svg>
            <ClipElement/>
            <div className="flex w-full h-full justify-content-center align-items-center">
                <InfoCard
                    className="w-max mx-2 shadow-none border-primary lg:shadow-8">
                    <div className="flex justify-content-center align-items-center grid">
                        <div id="my-image" className="md:col-4">
                            <Image src={require(`../assets/home/me_transparent.webp`)} width="250"
                                   imageClassName="border-circle"/>
                        </div>
                        <div className="flex flex-column lg:pl-6">
                            <AboutMe/>
                            <div
                                className="flex w-full grid justify-content-center lg:justify-content-start align-items-center">
                        <span className="p-0 mt-5 no-underline">
                            <Button label="GitHub" icon="pi pi-github"
                                    className="p-button-raised p-button-secondary w-full"
                                    onClick={() => window.open("https://github.com/subhash011", "_blank")}
                            />
                        </span>
                                <HashLink smooth to="#contact" className="p-0 ml-2 mt-5 no-underline">
                                    <Button label="Contact me" icon="pi pi-phone"
                                            className="p-button-raised p-button-primary w-full"/>
                                </HashLink>
                                <HashLink smooth to="#experience" className="p-0 ml-2 mt-5 no-underline">
                                    <Button label="Know more" icon="pi pi-user"
                                            className="p-button-raised p-button-info w-full"/>
                                </HashLink>
                            </div>
                        </div>
                    </div>
                </InfoCard>
            </div>
        </section>
    );
}

export default Home;