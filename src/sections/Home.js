import {Button} from "primereact/button";
import {Image} from 'primereact/image';
import React, {useEffect, useRef} from "react";
import {HashLink} from "react-router-hash-link";
import styled from "styled-components";
import Typewriter from 'typewriter-effect/dist/core';
import {ThemeContext} from "../Context";

const breakpoints = {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
}

const HeroSection = styled.section`
  background: var(--surface-ground);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media screen and (max-width: ${breakpoints['md']}) {
    padding-top: 6rem; /* Extra padding on mobile for better spacing */
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const TwoColumnLayout = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  
  @media screen and (max-width: ${breakpoints['lg']}) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  .profile-img {
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05); /* Scale on hover */
    }
  }
`;

const GreetingText = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  font-family: var(--font-family);
  
  @media screen and (max-width: ${breakpoints['md']}) {
    font-size: 1.5rem;
  }
  
  @media screen and (max-width: ${breakpoints['sm']}) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 1rem 0 2rem 0;
  font-family: var(--font-family);
  
  @media screen and (max-width: ${breakpoints['md']}) {
    font-size: 1.25rem;
  }
`;

const Description = styled.div`
  color: var(--text-color-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: var(--font-family);
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

function Home() {
    const [theme] = React.useContext(ThemeContext);
    const nameRef = useRef(null);

    useEffect(() => {
        const typewriter = new Typewriter(nameRef.current, {
            loop: false,
            delay: 40,
            deleteSpeed: 20,
            cursorClassName: theme === 'light' ? "text-orange-800" : "text-green-500",
            wrapperClassName: theme === 'light' ? "text-orange-800" : "text-green-500"
        });
        typewriter
            .typeString('SUBHASH')
            .start();

        return () => {
            typewriter.stop();
        };
    }, [theme]);

    return (
        <HeroSection id="#">
            <HeroContainer>
                <TwoColumnLayout>
                    <LeftColumn>
                        <GreetingText>
                            HI,
                            <span className="flex">
                                I'M&nbsp;
                                <span ref={nameRef}/>
                            </span>
                        </GreetingText>
                        <Subtitle>PGP @ IIMA | ex-SWE @ Arista | CSE @ IIT Palakkad'22</Subtitle>
                        <Description>
                            
                            <p>
                                I'm a tech-enthusiast pursuing an MBA to build on my foundation as a Computer Science engineer and 
                                former SDE. I've learnt to transform requirements into scalable solutions while staying grounded in 
                                customer empathy and business impact.
                            </p>
                            <p>
                                My strength lies in bridging business and tech. I work with engineers and other stakeholders to 
                                design user centric solutions. From institute wide portals to hackathons, I've applied first principles 
                                thinking and structure to take ideas from concept to launch.
                            </p>
                            <p>
                                I enjoy exploring bold ideas at the intersection of technology and business. Outside of work, you'll 
                                usually find me on the sports field or out on my motorcycle, both of which help me connect with 
                                people in the best way.
                            </p>
                        </Description>
                        <div className="flex w-full grid justify-content-center lg:justify-content-start align-items-center">
                            <span className="p-0 mt-5 no-underline">
                                <Button label="LinkedIn" icon="pi pi-linkedin"
                                        className="p-button-raised bg-blue-400 border-blue-400 w-full"
                                        onClick={() => window.open("https://linkedin.com/in/subhash-s-6a1989212", "_blank")}
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
                    </LeftColumn>
                    <RightColumn>
                        <ProfileImage>
                            <Image 
                                id="my-image"
                                src={require(`../assets/home/me.jpg`)} 
                                width="300px"
                                imageClassName="border-circle profile-img"
                            />
                        </ProfileImage>
                    </RightColumn>
                </TwoColumnLayout>
            </HeroContainer>
        </HeroSection>
    );
}

export default Home;