import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import '../classiccars/classic.css'
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
function Custom() {
    const [consentChecked, setConsentChecked] = useState(false);
    const handleConsentChange = () => {
        setConsentChecked(!consentChecked);
    };


    return (
        <div>
            <Navbar />

            <div className="form-container">
                <form className="card-form">
                    <h2 className="form-title">Locate your next Customized car and yacht at Zina's cars</h2>

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
                <h2 className='classictitle'>Customized cars and Yachts gallery</h2>
            </center>
            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="/fordi.jpg" alt="1970 Ford Mustang"></img>
                        <div class="image-overlay">
                            <div class="image-text"> Ford Mustang 1970</div>
                        </div>
                    </div>
                </div>
                <div class="image-column">
                    <div class="image-container">
                        <img src="/porshe99.jpg" alt="Porshe 911 2018"></img>
                        <div class="image-overlay">
                            <div class="image-text">Porshe 911 2018</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="yato.jpg" alt="Fairline Squadron 65 2015" class="image"></img>
                        <div class="image-overlay">
                            <div class="image-text">Fairline Squadron 65 2015</div>
                        </div>
                    </div>
                </div>
                <div class="image-column">
                    <div class="image-container">
                        <img src="soso.jpg" alt="Image 4"></img>
                        <div class="image-overlay">
                            <div class="image-text">Sunseeker Predator 74 2019</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-row">
                <div class="image-column">
                    <div class="image-container">
                        <img src="chev.jpg" alt="Image 5"></img>
                        <div class="image-overlay">
                            <div class="image-text">Chevrolet Camaro 2017</div>
                        </div>
                    </div>
                </div>
                <div class="image-column do">
                    <div class="image-container">
                        <img src="https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700225176-optimized.jpg" alt="Image 6"></img>
                        <div class="image-overlay">
                            <div class="image-text">Nissan GTR 2014</div>
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

export default Custom