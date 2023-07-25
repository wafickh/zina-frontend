import React, { useState, useRef ,useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import '../classiccars/classic.css'
import './custom.css'
import Slider from 'react-slick';
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
function Custom() {
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
            const smtpReceiverEmail = 'bk@zinascars.com';

            await Email.send({
                SecureToken: smtpPassword,
                To: smtpReceiverEmail,
                From: smtpSenderEmail,
                Subject: 'Custom Car/Yacht Inquiry',
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
                autoDismissTimeout: 6000,
                style: { background: '#562F4A', color: 'white', fontSize: '10px' },
                className: 'custom-toast',
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            addToast('Failed to send the form. Please try again later.', { appearance: 'error' });
        }
    };
    const [colorOption1, setColorOption1] = useState('');
    const [colorOption2, setColorOption2] = useState('');
    const [colorOption3, setColorOption3] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();




        if (colorOption1 || colorOption2 || colorOption3) {
            const FirstName = event.currentTarget.elements.FirstName.value;
            const LastName = event.currentTarget.elements.LastName.value;
            const PhoneNumber = event.currentTarget.elements.PhoneNumber.value;
            const email = event.currentTarget.elements.email.value;
            const make = event.currentTarget.elements.Make.value;
            const minYear = event.currentTarget.elements.minYear.value;
            const maxYear = event.currentTarget.elements.maxYear.value;
            const carDescription = event.currentTarget.elements.carDescription.value;

            const emailContent = `
      <br><br>
            <span style="font-size: 17px;"><b>Client Information:</b></span><br>
      <span style="font-size: 16px;"><b>Full Name:</b></span> ${FirstName} ${LastName}<br>
      <span style="font-size: 16px;"><b>Mobile Phone:</b></span> ${PhoneNumber}<br>
      <span style="font-size: 16px;"><b>Email:</b></span> ${email}<br>
       <span style="font-size: 16px;"><b>Desired classic car information:</b></span><br>
      <span style="font-size: 16px;"><b>Vehicle Make:</b></span> ${make}<br>
        <span style="font-size: 16px;"><b>Vehicle year:</b></span> From ${minYear} to ${maxYear}<br>
        <span style="font-size: 16px;"><b>Vehicle Color/s:</b></span> ${colorOption1} ${colorOption2} ${colorOption3}<br>
                <span style="font-size: 16px;"><b>Desired Features:</b></span> ${carDescription}<br>




      <br><br>
      <center>© 2023 ZINA's CARS. All Rights reserved.</center>
      
    `;
            setIsSubmitting(true);

            await sendEmail(emailContent);
            setIsSubmitting(false);
            formRef.current.reset();
            setColorOption1('');
            setColorOption2('');
            setColorOption3('');
            setFormSubmitted(true);
        }
        else {
            setFormSubmitted(false);

        }
    };
    const [minYear, setMinYear] = useState('');
    const maxYearOptions = Array.from({ length: 95 }, (_, i) => 2024 - i)
        .filter((year) => year >= minYear || !minYear);

    const handleMinYearChange = (event) => {
        setMinYear(event.target.value);
    };

    const [slideIndex, setSlideIndex] = useState(0);

    // Array of slide images
    const slideImages = [
       
        {
            url: './porshe99.jpg',
            caption: 'Porshe 911 2018'
        },
        {
            url: './lambod.jpg',
            caption: 'Lamborghini Aventador 2018'
        },
        {
            url: './fordi.jpg',
            caption: 'Ford Mustang 1970'
        },
        {
            url: './yato.jpg',
            caption: 'Fairline Squadron 65 2015'
        },
        {
            url: './chev.jpg',
            caption: 'Chevrolet Camaro 2017'
        },
        {
            url: './soso.jpg',
            caption: 'Sunseeker Predator 74 2019'
        },
        {
            url: './nissan1.jpg',
            caption: 'Nissan GTR 2014'
        }, 
        {
            url: './ferrarif12.jpg',
            caption: 'Ferrari F12 2016'
        }
    ];

    useEffect(() => {
        // Auto advance the slider every 7 seconds
        const interval = setInterval(() => {
            setSlideIndex(prevIndex =>
                prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 6500);

        return () => {
            // Clean up the interval on component unmount
            clearInterval(interval);
        };
    }, []);




    return (
        <div>
            <Navbar />

           
            <center>
                <h2 className='classictitle'>Customized Cars and Yachts</h2>
            </center>
            <div>
                <div className="slidi">
                    {slideImages.map((imageData, index) => (
                        <div
                            key={index}
                            className={`slide ${index === slideIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${imageData.url})` }}
                        >
                            <div className="image-overlay">
                                <div className="image-text texto">{imageData.caption}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
           
            
            <div className="form-container">
                <form className="card-form" onSubmit={handleFormSubmit} ref={formRef}>
                    <h2 className="form-title">Locate your next Custom car/yacht at Zina's cars</h2>

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
                            <label htmlFor="" className='form-label  x-label'>Email:</label>
                            <input className="form-input" name='email' type="email" id="" placeholder="" required />

                        </div>


                    </div>
                    <p className='desired'>Desired vehicle:</p>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label x-label" htmlFor="firstName">Vehicle Make:</label>
                            <input className="form-input" name='Make' type="text" id="firstName" placeholder="" required />
                        </div>


                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label x-label" htmlFor="minYear">Minimum Vehicle Year:</label>
                            <select className="form-select" name="minYear" id="minYear" required onChange={handleMinYearChange}>
                                <option value=""></option>
                                {Array.from({ length: 95 }, (_, i) => 2024 - i).map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label x-label" htmlFor="maxYear">Maximum Vehicle Year:</label>
                            <select className="form-select" name="maxYear" id="maxYear" required>
                                <option value=""></option>
                                {maxYearOptions.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <label className="form-label x-label" htmlFor="vehicleColor">Vehicle Color:</label>
                    <div className="form-row">
                        <div className="form-group cola">
                            <input
                                className={`form-input ${formSubmitted && !colorOption1 ? 'invalid' : ''}`}
                                name="colorOption1"
                                type="text"
                                id="colorOption1"
                                placeholder="Option 1"
                                value={colorOption1}
                                onChange={(e) => setColorOption1(e.target.value)}
                                required={!(colorOption2 || colorOption3)}
                            />

                        </div>
                        <div className="form-group cola">
                            <input
                                className={`form-input`}
                                name="colorOption2"
                                type="text"
                                id="colorOption2"
                                placeholder="Option 2"
                                value={colorOption2}
                                onChange={(e) => setColorOption2(e.target.value)}
                            />

                        </div>
                        <div className="form-group cola">
                            <input
                                className={`form-input`}
                                name="colorOption3"
                                type="text"
                                id="colorOption3"
                                placeholder="Option 3"
                                value={colorOption3}
                                onChange={(e) => setColorOption3(e.target.value)}

                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group coki">
                            <label className="form-label x-label" htmlFor="carDescription">Tell us more about your custom car/yacht:</label>
                            <textarea className="form-textarea" name="carDescription" id="carDescription" rows="4" style={{ width: '100%' }}></textarea>
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

                    <button type="submit" className={`submit-button ${isSubmitting ? 'loadingi' : ''}`} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>

                </form>
            </div>
 
            


            <Footer />

        </div>
    )
}
const customto = () => {
    return (
        <ToastProvider className='custom-toast'>
            <Custom />
        </ToastProvider>
    );
};


export default customto