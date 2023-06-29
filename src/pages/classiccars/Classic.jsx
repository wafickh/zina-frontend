import React ,{useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './classic.css'

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
                            <input className="form-input" type="email" id="" placeholder="" required/>

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
            <div class="image-row">
                <div class="image-column">
                    <img src="/AstonMartin.jpg" alt="Image 1"></img>
                </div>
                <div class="image-column">
                    <img src="/ChevroletCorvet.jpg" alt="Image 2"></img>
                </div>
            </div>

            <div class="image-row">
                <div class="image-column">
                    <img src="/FordMustang.jpg" alt="Image 3"></img>
                </div>
                <div class="image-column">
                    <img src="/ChevroletEl.jpg" alt="Image 4"></img>
                </div>
            </div>
           
            <div class="image-row">
                <div class="image-column">
                    <img src="/merrceded19.jpg" alt="Image 5"></img>
                </div>
                <div class="image-column do">
                    <img src="/porshe911.jpg" alt="Image 6"></img>
                </div>
            </div>


            <Footer/>

        </div>
    )
}

export default Classic