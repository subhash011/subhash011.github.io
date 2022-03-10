import ContactForm from "./Form";
import '../styles/_contact.scss';
import * as React from "react";
import {SectionHeading} from "../common/CardTimeline";
import {SocialButtons} from "../common/SocialButtons";

function Contact(props) {

    return (
        <section id="contact" className="pt-7">
            <SectionHeading heading="Contact Me" />
            <div className="grid contact-content">
                <div className="lg:col-6 col-12 flex flex-column justify-content-center align-items-center">
                    <p className="lg:w-30rem ml-2 mr-2 lg:m-0 text-center">
                        Please feel free to contact me for any queries or suggestions. I am always open to discussing new
                        projects or ideas.
                    </p>
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