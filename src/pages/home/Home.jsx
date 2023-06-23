import React, { useEffect, useRef, useState } from 'react'
import "./home.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { ToastProvider, useToasts } from 'react-toast-notifications'; 

import { HiOutlineMail } from 'react-icons/hi';

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
function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const formRef = useRef(null);
  const { addToast } = useToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Array of slide images
  const slideImages = [
    'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    'https://images.unsplash.com/photo-1611858246382-da4877c6476d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    'https://images.unsplash.com/photo-1584345604325-f5091269a0d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1596711715198-16788fb84007?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  ];

  useEffect(() => {
    // Auto advance the slider every 3 seconds
    const interval = setInterval(() => {
      setSlideIndex(prevIndex =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => {
      // Clean up the interval on component unmount
      clearInterval(interval);
    };
  }, []);
  const [consentChecked, setConsentChecked] = useState(false);
  const handleConsentChange = () => {
    setConsentChecked(!consentChecked);
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
    <div>
      <Navbar />
      <div className="slider-container">
        {slideImages.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === slideIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="home-container">
        <h1 className="slogan">Where Luxury Meets Convenience</h1>
        <div className="button-container">
          <a href="/luxury-cars" className="inventory-button">
            <h3 className="button-title">Luxury Cars Inventory</h3>
            <button className="browse-button">Browse</button>
          </a>
          <a href="/classic-cars-inventory" className="inventory-button">
            <h3 className="button-title">Classic Cars Inventory</h3>
            <button className="browse-button">Browse</button>
          </a>
          <a href="/customized-cars-yachts" className="inventory-button">
            <h3 className="button-title">Customized Cars and Yachts</h3>
            <button className="browse-button">Browse</button>
          </a>
        </div>
      </div>
      <div className='content-container'>
        <div className="gogo">
          <div className="content-wrapper">
            <div className="content">
              <h2>Discover the world of luxurious, top-of-the-line vehicles today!</h2>
              {/* <p>Contact us for an amazing, hassle-free offer. Elevate your driving experience with our outstanding selection. Don't miss out—experience automotive excellence now!</p> */}
              <p>Experience automotive excellence at Zina's Cars! Discover our exceptional selection and enjoy a seamless buying process. Whether you desire a tailored order, a rare classic automobile, or a luxurious yacht, we specialize in surpassing customer expectations.
                 Experience unmatched luxury and make your vision come true. Contact us today for an exceptional and professional journey.</p>
            </div>
            <button className="contact-button" onClick={handleCloseForm}>Contact Us</button>
          </div>
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="contact-item">
            <HiOutlineMail className="contact-icon" />
            <h3>Email</h3>
            <p>khalife@hotmail.com</p>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <h3>Phone Number</h3>
            <p>888-843-4174</p>
          </div>
        </div>
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
                <label htmlFor="message" >Message:</label>

                <textarea id="message" name="message" rows="3" required></textarea>
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
                    I consent to receive text messages or calls from the dealer or
                    their employees at the provided mobile number. I understand
                    that message and data rates may apply. This is my written consent
                    to receive texts and calls, including automated messages.
                    I can withdraw my consent by texting "STOP".
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
      <Footer />
    </div>
  );
}
const HomeWithToasts = () => {
  return (
    <ToastProvider className='custom-toast'>
      <Home />
    </ToastProvider>
  );
};


export default HomeWithToasts
