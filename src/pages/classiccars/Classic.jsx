import React, { useState,useRef } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastProvider, useToasts } from 'react-toast-notifications'; 

import './classic.css'
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

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
function Classic() {
    const [consentChecked, setConsentChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addToast } = useToasts();
    const formRef = useRef(null);

    const handleConsentChange = () => {
        setConsentChecked(!consentChecked);
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
                Subject: 'Luxury car Inquiry',
                Body: emailContent,
                Host: smtpHost,
                Port: smtpPort,
                Username: smtpUsername,
                Password: smtpPassword,
            });
            console.log('Email sent successfully');
            // setShowForm(false);
            document.body.classList.remove('no-scroll');
            addToast('Your information has been successfully sent. A representative will contact you shortly.', {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 7000,
                style: { background: '#562F4A', color: 'white',FontSize: '10px' },
                className: 'custom-toast',
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            addToast('Failed to send the form. Please try again later.', { appearance: 'error' });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const FirstName = event.currentTarget.elements.FirstName.value;
        const LastName = event.currentTarget.elements.LastName.value;
        const PhoneNumber = event.currentTarget.elements.PhoneNumber.value;
        const email = event.currentTarget.elements.email.value;

        const emailContent = `
      <b>Luxury car Iquiry:</b>
      <br><br>
      <span style="font-size: 16px;"><b>Name:</b></span> ${FirstName}<br>
      <span style="font-size: 16px;"><b>Mobile Phone:</b></span> ${LastName}<br>
      <span style="font-size: 16px;"><b>PhoneNumber:</b></span> ${PhoneNumber}<br>
      <span style="font-size: 16px;"><b>email:</b></span> ${email}<br>
      <br><br>
      © 2023 ZINA's CARS. All Rights reserved.
    `;
        setIsSubmitting(true);

        await sendEmail(emailContent);
        formRef.current.reset();
        setIsSubmitting(false);
    };


    return (
        <div>
            <Navbar />

            <div className="form-container">
                <form className="card-form" onSubmit={handleFormSubmit} ref={formRef}>
                    <h2 className="form-title">Locate your next Classic car at Zina's cars</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label x-label" htmlFor="firstName">First Name:</label>
                            <input className="form-input" name='FirstName' type="text" id="firstName" placeholder="" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label  x-label" htmlFor="lastName">Last Name:</label>
                            <input className="form-input" name='LastName' type="text" id="lastName" placeholder="" required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label  x-label" htmlFor="mobilePhone">Mobile Phone:</label>
                            <input className="form-input" name='PhoneNumber' type="text" id="mobilePhone" placeholder="###-###-####" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label " htmlFor="homePhone">Home Phone:</label>
                            <input className="form-input" type="text" id="homePhone" placeholder="###-###-####" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="" className='form-label  x-label'>Email:</label>
                            <input className="form-input" name='email' type="email" id="" placeholder="" required />

                        </div>

                    </div>
                    <div className="consent-containerr">
                        <input
                            type="checkbox"
                            id="consenting"
                            name="consenting"
                            checked={consentChecked}
                            required
                            onChange={handleConsentChange}
                        />
                        <label htmlFor="consenting" className="consent-label lololi">
                            ACKNOWLEDGMENT AND CONSENT:
                        </label>
                    </div>
                    <p className='textind'>
                        I consent to receive text messages or calls from the dealer or their employees at the provided mobile number. I
                        understand that message and data rates may apply. This is my written consent to receive texts and calls, including
                        automated messages. I can withdraw my consent by texting "STOP".
                    </p>


                    <button type="submit" className="submit-button">
                        Submit
                    </button>

                </form>
            </div>
            <center>
                <h2 className='classictitle'>Classic cars gallery</h2>
            </center>
            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="/AstonMartin.jpg" alt="Aston Martin DB5 1964"></img>
                        <div class="image-overlay">
                            <div class="image-text">Aston Martin DB5 1964</div>
                        </div>
                    </div>
                </div>
                <div class="image-column">
                    <div class="image-container">
                        <img src="/ChevroletCorvet.jpg" alt="Chevrolet Corvette 1963"></img>
                        <div class="image-overlay">
                            <div class="image-text">Chevrolet Corvette 1963</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="/FordMustang.jpg" alt="Image 3" class="image"></img>
                        <div class="image-overlay">
                            <div class="image-text">Ford Mustang Shelby GT350 1965</div>
                        </div>
                    </div>
                </div>
                <div class="image-column">
                    <div class="image-container">
                        <img src="/ChevroletEl.jpg" alt="Image 4"></img>
                        <div class="image-overlay">
                            <div class="image-text">Chevrolet El Camino SS 1970</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="/merrceded19.jpg" alt="Image 5"></img>
                        <div class="image-overlay">
                            <div class="image-text">Mercedes 300SL Gullwing 1954</div>
                        </div>
                    </div>
                </div>
                <div class="image-column do">
                    <div class="image-container">
                        <img src="/porshe911.jpg" alt="Image 6"></img>
                        <div class="image-overlay">
                            <div class="image-text">Porsche 911 1963</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="/bmw.jpg" alt="BMW CSL 1972"></img>
                        <div class="image-overlay">
                            <div class="image-text">BMW CSL 1972</div>
                        </div>
                    </div>
                </div>
                <div class="image-column">
                    <div class="image-container">
                        <img src="/jaguar3.jpg" alt="Jaguar E-Type 1961"></img>
                        <div class="image-overlay">
                            <div class="image-text">Jaguar E-Type 1961</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="/doge2.jpg" alt="Dodge Viper 1995"></img>
                        <div class="image-overlay">
                            <div class="image-text">Dodge Viper 1995</div>
                        </div>
                    </div>
                </div>
                <div class="image-column">
                    <div class="image-container">
                        <img src="/jaguarxj.jpg" alt="Jaguar XJS 1989"></img>
                        <div class="image-overlay">
                            <div class="image-text">Jaguar XJS 1989</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="center">
                <button className="back-to-form" onClick={scrollToTop}>
                    <span className="arrow"></span> Make an Order <span class="arrow"></span>
                </button>
            </div>



            <Footer />

        </div>
    )
}

const ClassicWithToasts = () => {
    return (
        <ToastProvider className='custom-toast'>
            <Classic />
        </ToastProvider>
    );
};


export default ClassicWithToasts