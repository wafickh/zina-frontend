import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './classic.css'
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
function Classic() {
    const [consentChecked, setConsentChecked] = useState(false);
    const handleConsentChange = () => {
        setConsentChecked(!consentChecked);
    };


    return (
        <div>
            <Navbar />

            <div className="form-container">
                <form className="card-form">
                    <h2 className="form-title">Locate your next Classic car at Zina's cars</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label x-label" htmlFor="firstName">First Name:</label>
                            <input className="form-input" type="text" id="firstName" placeholder="" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label  x-label" htmlFor="lastName">Last Name:</label>
                            <input className="form-input" type="text" id="lastName" placeholder="" required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label  x-label" htmlFor="mobilePhone">Mobile Phone:</label>
                            <input className="form-input" type="text" id="mobilePhone" placeholder="###-###-####" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label " htmlFor="homePhone">Home Phone:</label>
                            <input className="form-input" type="text" id="homePhone" placeholder="###-###-####" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="" className='form-label  x-label'>Email:</label>
                            <input className="form-input" type="email" id="" placeholder="" required />

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

export default Classic