import ContactForm from "./Form";
import {Button} from "primereact/button";
import '../styles/_contact.scss';
import {classNames} from "primereact/utils";
import * as React from "react";

function Contact(props) {

    const SocialButtons = () => {
        return (
            <div className="social-buttons flex justify-content-center align-items-center mb-2">
                <span className="pl-1">
                    <Button icon="pi pi-linkedin" target="_blank"
                            onClick={() => window.open('https://www.linkedin.com/in/subhashs0620/', '_blank')}/>
                </span>
                <span className="pl-1">
                    <Button icon="pi pi-instagram"
                            className="bg-pink-500 border-0"
                            onClick={() => window.open('https://www.instagram.com/subhash_011/', '_blank')}/>
                </span>
                <span className="pl-1 p-button-lg">
                    <Button icon="pi pi-discord"
                            className={classNames(props.theme === 'light' ? "bg-gray-800" : "bg-gray-300", "border-0")}
                            onClick={() => window.open('https://discord.com/users/subhash011#0822', '_blank')}/>
                </span>
                <span className="pl-1">
                    <Button icon="pi pi-twitter"
                            onClick={() => window.open('https://twitter.com/subhash_011', '_blank')}/>
                </span>
            </div>
        );
    }

    return (
        <section id="contact" className="pt-7">
            <div className="grid">
                <div className="lg:col-6 col-12 flex flex-column justify-content-center align-items-center">
                    <h4>Contact Me</h4>
                    <p className="lg:w-30rem ml-2 mr-2 lg:m-0 text-center">
                        If you need to get in touch with me, you can do so by filling out the form or reach out to me
                        through
                        any of the below social media handles.
                    </p>
                    <div className="hidden lg:block">
                        <SocialButtons/>
                    </div>
                </div>
                <div className="lg:col-6 col-12">
                    <ContactForm/>
                </div>
                <div className="block lg:hidden col-12">
                    <SocialButtons/>
                </div>
            </div>
        </section>
    );
}

export default Contact;