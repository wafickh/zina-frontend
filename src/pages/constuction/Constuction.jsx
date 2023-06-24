import React from 'react';
import './UnderConstruction.css';
import { IoCarSportSharp } from "react-icons/io5";
import { FaTools, FaHardHat, FaCog } from 'react-icons/fa';
const Construction = () => {
    return (
        <div className="under-construction-container">
            <h1 className="title">Zina's Cars</h1>
            <div className="construction-icons">
                <div className="construction-icon">
                    <FaTools />
                </div>
                <div className="construction-icon">
                    <IoCarSportSharp />
                </div>
                <div className="construction-icon rotating">
                    <FaCog />
                </div>
            </div>
            <p className="message">Website is under construction</p>
            <div className="fancy-background"></div>
        </div>
    );
};

export default Construction;