import {Chip} from "primereact/chip";
import * as React from "react";
import styled from "styled-components";
import ContactForm from "../components/ContactForm";
import {SectionHeading} from "../components/SectionHeading";
import {SocialButtons} from "../components/SocialButtons";

const ContentWrapper = styled.div`
    margin: 0 1rem;
`;

const RowCenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ColCenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function Contact() {

    return (
        <section id="contact" className="pt-7">
            <SectionHeading name={"contact"} heading="Contact Me"/>
            <ContentWrapper className="grid">
                <ColCenteredDiv className="lg:col-6 col-12">
                    <p className="lg:w-30rem mx-2 lg:m-0 text-center">
                        Please feel free to contact me for any queries or suggestions. I am always open to discussing
                        new projects or ideas.
                    </p>
                    <RowCenteredDiv className="mt-4 grid">
                        <span onClick={() => window.open("mailto:subhashs0620@gmail.com", "_self")}
                              className="cursor-pointer">
                            <Chip label="subhashs0620@gmail.com" icon="pi pi-envelope"
                                  className="mr-2 mb-2 surface-card"/>
                        </span>
                        <Chip label="(+91) 9188230955" icon="pi pi-phone" className="mr-2 mb-2 surface-card"/>
                    </RowCenteredDiv>
                    <div className="hidden lg:block">
                        <SocialButtons/>
                    </div>
                </ColCenteredDiv>
                <div className="lg:col-6 col-12">
                    <ContactForm/>
                </div>
                <div className="block lg:hidden col-12 flex justify-content-center mb-4">
                    <SocialButtons/>
                </div>
            </ContentWrapper>
        </section>
    );
}

export default Contact;