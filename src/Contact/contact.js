import ContactForm from "./form";
import {Button} from "primereact/button";
import '../styles/_contact.scss';

function Contact() {

    const SocialButtons = () => {
        return (
            <div className="grid social-buttons">
                <span className="md:col-6 col-12">
                    <Button className="linkedin p-0 w-8rem"
                            onClick={() => window.open('https://www.linkedin.com/in/subhashs0620/', '_blank')}
                            target="_blank"
                    >
                        <i className="pi pi-linkedin px-2"/>
                        <span className="px-3">LinkedIn</span>
                    </Button>
                </span>
                <span className="md:col-6 col-12">
                    <Button className="instagram p-0 w-8rem"
                            onClick={() => window.open('https://www.instagram.com/subhash_011/', '_blank')}
                    >
                        <i className="pi pi-instagram px-2"/>
                        <span className="px-3">Instagram</span>
                    </Button>
                </span>
                <span className="md:col-6 col-12">
                    <Button className="discord p-0 w-8rem"
                            onClick={() => window.open('https://discord.com/users/subhash011#0822', '_blank')}
                    >
                        <i className="pi pi-discord px-2"/>
                        <span className="px-3">Discord</span>
                    </Button>
                </span>
                <span className="md:col-6 col-12">
                    <Button className="twitter p-0 w-8rem"
                            onClick={() => window.open('https://twitter.com/subhash_011', '_blank')}
                    >
                        <i className="pi pi-twitter px-2"/>
                        <span className="px-3">Twitter</span>
                    </Button>
                </span>
            </div>
        );
    }

    return (
        <section id="contact">
            <div className="grid">
                <div className="lg:col-6 col-12 flex flex-column justify-content-center align-items-center">
                    <h4>Contact Me</h4>
                    <p className="lg:w-30rem ml-2 mr-2 lg:m-0 text-center">
                        If you need to get in touch with me, you can do so by filling out the form or reach out to me
                        through
                        any of the below social media handles.
                    </p>
                    <div className="hidden lg:block">
                        <SocialButtons />
                    </div>
                </div>
                <div className="lg:col-6 col-12">
                    <ContactForm/>
                </div>
                <div className="block lg:hidden col-12">
                    <SocialButtons />
                </div>
            </div>
        </section>
    );
}

export default Contact;