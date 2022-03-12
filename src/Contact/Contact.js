import ContactForm from "./Form";
import '../styles/_contact.scss';
import * as React from "react";
import {SocialButtons} from "../Common/SocialButtons";
import {SectionHeading} from "../Common/SectionHeading";
import {Chip} from "primereact/chip";

function Contact(props) {

    return (
        <section id="contact" className="pt-7">
            <SectionHeading name={"contact"} heading="Contact Me" />
            <div className="grid contact-content">
                <div className="lg:col-6 col-12 flex flex-column justify-content-center align-items-center">
                    <p className="lg:w-30rem ml-2 mr-2 lg:m-0 text-center">
                        Please feel free to contact me for any queries or suggestions. I am always open to discussing new
                        projects or ideas.
                    </p>
                    <div className="mt-4 grid flex justify-content-center">
                        <span onClick={() => window.open("mailto:subhashs0620@gmail.com", "_self")} className="cursor-pointer">
                            <Chip label="subhashs0620@gmail.com" icon="pi pi-envelope" className="mr-2 mb-2 surface-card" />
                        </span>
                        <Chip label="(+91) 9188230955" icon="pi pi-phone" className="mr-2 mb-2 surface-card" />
                    </div>
                    <div className="hidden lg:block">
                        <SocialButtons props={props}/>
                    </div>
                </div>
                <div className="lg:col-6 col-12">
                    <ContactForm/>
                </div>
                <div className="block lg:hidden col-12 flex justify-content-center mb-4">
                    <SocialButtons props={props}/>
                </div>
            </div>
        </section>
    );
}

export default Contact;