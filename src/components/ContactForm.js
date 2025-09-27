import React, {useRef} from 'react';
import {useFormik} from 'formik';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { BlockUI } from 'primereact/blockui';
import {classNames} from 'primereact/utils';
import {Toast} from 'primereact/toast';
import {InputTextarea} from "primereact/inputtextarea";
import {ProgressSpinner} from "primereact/progressspinner";

function ContactForm() {
    const [loading, setLoading] = React.useState(false);
    const toast = useRef(null);


    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'I\'ve received your message. Thank you!',
            life: 5000
        });
    }

    const showError = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Sorry, there was an issue while you sent the message! I might have exceeded my mailing quota.',
            life: 10000
        });
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            subject: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required.';
            }

            if (!data.email) {
                errors.email = 'Email is required.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.message) {
                errors.message = 'You cannot send me an empty message!';
            }

            return errors;
        },
        onSubmit: async (data) => {
            setLoading(true);
            const response = await fetch('https://formspree.io/f/xgedyllq', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);
            if (response.status === 200) {
                showSuccess();
            } else {
                showError();
            }
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <React.Fragment>
            <Toast ref={toast} position="top-right"/>
            <BlockUI template={<div className="absolute flex justify-content-center align-items-center col-12 z-5">
                                <ProgressSpinner className="absolute" style={{width: '50px', height: '50px'}} strokeWidth="8" />
                               </div>} blocked={loading}>
                <div className="card contact-card flex justify-content-center align-items-center">
                    <form className="p-2 formgrid grid" onSubmit={formik.handleSubmit}>
                        <div className="field col-12 lg:col-6 mt-4">
                            <span className="p-float-label p-input-icon-right w-full">
                                    <i className="pi pi-user"/>
                                    <InputText id="name" name="name" value={formik.values.name}
                                            onChange={formik.handleChange}
                                            className={classNames({'p-invalid': isFormFieldValid('name')}, 'w-full')}/>
                                    <label htmlFor="name"
                                        className={classNames({'p-error': isFormFieldValid('name')}, 'w-full')}>Name*</label>
                                </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field col-12 lg:col-6 mt-4">
                        <span className="p-float-label p-input-icon-right w-full">
                                    <i className="pi pi-envelope"/>
                                    <InputText id="email" name="email" value={formik.values.email}
                                            onChange={formik.handleChange}
                                            className={classNames({'p-invalid': isFormFieldValid('email')}, 'w-full')}/>
                                    <label htmlFor="email"
                                        className={classNames({'p-error': isFormFieldValid('email')}, 'w-full')}>Email*</label>
                                </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field col-12 mt-4">
                        <span className="p-float-label p-input-icon-right w-full">
                                    <InputText id="subject" name="subject" value={formik.values.subject}
                                            onChange={formik.handleChange}
                                            className={classNames({'p-invalid': isFormFieldValid('subject')}, 'w-full')}/>
                                    <label htmlFor="subject"
                                        className={classNames({'p-error': isFormFieldValid('subject')}, 'w-full')}>Subject</label>
                                </span>
                            {getFormErrorMessage('subject')}
                        </div>
                        <div className="field col-12 mt-4">
                        <span className="p-float-label p-input-icon-right w-full">
                            <InputTextarea rows={5} id="message" name="message" value={formik.values.message}
                                            onChange={formik.handleChange}
                                            className={classNames({'p-invalid': isFormFieldValid('message')}, 'w-full')}/>
                            <label htmlFor="message"
                                    className={classNames({'p-error': isFormFieldValid('message')}, 'w-full')}>Message*</label>
                            </span>
                            {getFormErrorMessage('message')}
                        </div>
                        <div className="field col-12 mt-4 flex justify-content-center">
                            <Button label="Submit" className="p-button lg:w-25rem w-full" type="submit"/>
                        </div>
                    </form>
                </div>
            </BlockUI>
        </React.Fragment>
    );
}

export default ContactForm;