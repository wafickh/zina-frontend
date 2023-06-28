import React, { useState, useRef, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa';
import './Navbar.css';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const Email = {
    send: (a) => {
        return new Promise((resolve, reject) => {
            a.nocache = Math.floor(1e6 * Math.random() + 1);
            a.Action = "Send";
            const t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, (response) => {
                resolve(response);
            });
        });
    },
    ajaxPost: (url, data, callback) => {
        const request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onload = () => {
            const response = request.responseText;
            if (callback) {
                callback(response);
            }
        };
        request.send(data);
    },
    ajax: (url, callback) => {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = () => {
            const response = request.responseText;
            if (callback) {
                callback(response);
            }
        };
        request.send();
    },
};

const Navbar = () => {
    const phoneNumber = '+1 (949) 317-6520';
    const formRef = useRef(null);
    const { addToast } = useToasts();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [consentChecked, setConsentChecked] = useState(false);
    const handleConsentChange = () => {
        setConsentChecked(!consentChecked);
    };
    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };
    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => {
        setShowForm(true);
        document.body.classList.add('no-scroll');
    };

    const handleCloseFormm = () => {
        setShowForm(false);
        document.body.classList.remove('no-scroll');
    };

    const sendEmail = async (emailContent) => {
        try {
            const smtpHost = 'smtp.elasticemail.com';
            const smtpPort = 2525;
            const smtpUsername = 'wafic.khalife@lau.edu';
            // const smtpPassword = '745602388B9885A32552FD352215552C0F71';
            const smtpPassword = 'D9726A5CA1D7B805B927301733D122036741';

            const smtpSenderEmail = 'wafic.khalife@lau.edu';
            const smtpReceiverEmail = 'wafic.m.khalife@hotmail.com';

            await Email.send({
                SecureToken: smtpPassword,
                To: smtpReceiverEmail,
                From: smtpSenderEmail,
                Subject: 'Contact us Form Submission',
                Body: emailContent,
                Host: smtpHost,
                Port: smtpPort,
                Username: smtpUsername,
                Password: smtpPassword,
            });
            console.log('Email sent successfully');
            setShowForm(false);
            document.body.classList.remove('no-scroll');
            addToast('Your message has been sent successfully!', {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 4000,
                style: { background: '#562F4A', color: 'white' },
                className: 'custom-toast',
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            addToast('Failed to send the form. Please try again later.', { appearance: 'error' });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = event.currentTarget.elements.name.value;
        const phone = event.currentTarget.elements.phone.value;
        const email = event.currentTarget.elements.email.value;
        const message = event.currentTarget.elements.message.value;

        const emailContent = `
      <b>Contact Form Submission:</b>
      <br><br>
      <span style="font-size: 16px;"><b>Name:</b></span> ${name}<br>
      <span style="font-size: 16px;"><b>Mobile Phone:</b></span> ${phone}<br>
      <span style="font-size: 16px;"><b>Email:</b></span> ${email}<br>
      <span style="font-size: 16px;"><b>Message:</b></span> ${message}<br>
      <br><br>
      © 2023 ZINA's CARS. All Rights reserved.
    `;
        setIsSubmitting(true);

        await sendEmail(emailContent);
        setIsSubmitting(false);
    };

    useEffect(() => {
        const handleClickOutsideForm = (event) => {
            if (event.button === 0 && formRef.current && !formRef.current.contains(event.target)) {
                setShowForm(false);
                document.body.classList.remove('no-scroll');
            }
        };

        document.addEventListener('mousedown', handleClickOutsideForm);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideForm);
        };
    }, []);

    return (
        <nav className="navofnav">
            <div className="navbar-container">
                <a href="/">
                    <span className="navbar-text">ZINA's CARS</span>
                </a>
                <div className="navbar-buttons">
                    <button className="navbar-button" onClick={handleCall}>
                        Call Now
                        <FaPhone className="navbar-icon" />
                    </button>
                    <button className="navbar-button" onClick={handleCloseForm}>
                        Contact Us
                    </button>
                </div>
                {showForm && (
                    <div className="contact-form-overlay">
                        <div className="contact-form-card" ref={formRef}>
                            <div className="contact-form-header">
                                <button className="close-button" onClick={handleCloseFormm}>
                                    ✘
                                </button>
                                <h2>Contact Us</h2>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <div className="contact-form-section">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div className="contact-form-section">
                                    <label htmlFor="phone">Mobile Phone:</label>
                                    <input type="text" id="phone" name="phone" required />
                                </div>
                                <div className="contact-form-section">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="contact-form-section">
                                    <label htmlFor="message">Message:</label>
                                    <textarea id="message" name="message" rows="4" required></textarea>
                                </div>
                                <div className="contact-form-section">
                                    <div className="consent-container">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            name="consent"
                                            checked={consentChecked}
                                            required
                                            onChange={handleConsentChange}
                                        />
                                        <label htmlFor="consent" className="consent-label">
                                            ACKNOWLEDGMENT AND CONSENT:
                                        </label>
                                    </div>
                                    <div className="consent-text">
                                        <p>
                                            I consent to receive text messages or calls from the dealer or their employees at the provided mobile number. I
                                            understand that message and data rates may apply. This is my written consent to receive texts and calls, including
                                            automated messages. I can withdraw my consent by texting "STOP".
                                        </p>
                                    </div>
                                    <center>
                                        <button type="submit" className={isSubmitting ? 'subbut loading' : 'subbut'} disabled={isSubmitting}>
                                            {isSubmitting ? <span className="loading-spinner"></span> : 'I AGREE, SEND'}
                                        </button>

                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <ToastProvider>
            <Navbar />
            {/* Rest of the app */}
        </ToastProvider>
    );
};

export default App;
