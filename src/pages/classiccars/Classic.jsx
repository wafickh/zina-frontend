import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './classic.css'

function Classic() {


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
                            <input className="form-input" type="email" id="homePhone" placeholder="" />

                        </div>
                        
                    </div>


                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Classic