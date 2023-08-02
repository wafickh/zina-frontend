import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import "./Luxurycars.css";
import { FaFilter } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { BiMessageRounded } from "react-icons/bi";

import { IoCarSportSharp } from "react-icons/io5";
import { FaTools, FaHardHat, FaCog } from 'react-icons/fa';
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
const Luxurycars = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToast } = useToasts();
    const [resetKeyword, setResetKeyword] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCars, setTotalCars] = useState(0);
    const [pageSize] = useState(10); // Number of cars to display per page
    const [sortOptions, setSortOptions] = useState([]); // Array to store selected sort options
    const [sort, setsort] = useState('');
    const [name, setName] = useState('');

    const [year, setyear] = useState('');
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
                Subject: 'Used car Inquiry',
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

    const [cylinder, setcylinder] = useState('');

    useEffect(() => {

        fetchData();
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

    }, [currentPage, sortOptions]);
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = event.currentTarget.elements.name.value;
        const phone = event.currentTarget.elements.phone.value;
        const email = event.currentTarget.elements.email.value;
        const message = event.currentTarget.elements.message.value;

        const emailContent = `
      <b style="font-size: 18px;">Used car Inquiry:</b>
      <br><br>
            <span style="font-size: 16px;"><b>Car name:</b></span>  ${clickedCardTitle}<br>


      <span style="font-size: 16px;"><b>Client name:</b></span> ${name}<br>
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

    const fetchData = async () => {
        try {
            setIsLoading(true);
            let url = 'https://zinas-cars.onrender.com/api/cars';
            let params = { page: currentPage, pageSize };

            if (sortOptions.length > 0) {
                params.sortBy = sortOptions.join(',');
            }

            const response = await axios.get(url, { params });

            setCars(response.data.cars);
            setTotalCars(response.data.totalCars);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
            setIsLoading(false);
        }
    };
    const [Condition, setCondition] = useState('');
    const [keyword, setKeyword] = useState('');


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleToggleDropdown = () => {
        setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
    };
    const handleDropdownChange = (event) => {
        const { id, value } = event.target;

        if (id === 'sortby') {
            setSortOptions((prevSortOptions) => {
                const updatedSortOptions = [...prevSortOptions];
                const existingOptionIndex = updatedSortOptions.findIndex((option) => option.startsWith(id));
                setsort(`${value}`)


                if (existingOptionIndex !== -1) {
                    updatedSortOptions.splice(existingOptionIndex, 1, `${id}:${value}`);
                } else {
                    updatedSortOptions.push(`${id}:${value}`);
                }

                return updatedSortOptions;
            });
        } else
            if (id === 'Name') {
                if (value === '') {
                    setSortOptions((prevSortOptions) =>
                        prevSortOptions.filter((option) => !option.startsWith(id))
                    );
                    setName('');
                }
                else {
                    setSortOptions((prevSortOptions) => {
                        const updatedSortOptions = [...prevSortOptions];
                        const existingOptionIndex = updatedSortOptions.findIndex((option) => option.startsWith(id));
                        setName(`${value}`);
                        if (existingOptionIndex !== -1) {
                            updatedSortOptions.splice(existingOptionIndex, 1, `${id}:${value}`);
                        } else {
                            updatedSortOptions.push(`${id}:${value}`);
                        }
                        handleResetFilters();

                        return updatedSortOptions;
                    });

                }
            }
            else if (id === 'Cylinders') {
                if (value === '') {
                    setSortOptions((prevSortOptions) =>
                        prevSortOptions.filter((option) => !option.startsWith(id))
                    );
                    setcylinder('');
                }
                else {
                    setSortOptions((prevSortOptions) => {
                        const updatedSortOptions = [...prevSortOptions];
                        const existingOptionIndex = updatedSortOptions.findIndex((option) => option.startsWith(id));
                        setcylinder(`${value}`)
                        if (existingOptionIndex !== -1) {
                            updatedSortOptions.splice(existingOptionIndex, 1, `${id}:${value}`);
                        } else {
                            updatedSortOptions.push(`${id}:${value}`);
                        }

                        return updatedSortOptions;
                    });
                }
            }
            else if (id === 'Year') {
                if (value === '') {
                    setSortOptions((prevSortOptions) =>
                        prevSortOptions.filter((option) => !option.startsWith(id))
                    );
                    setyear(''); // Reset the year value
                }
                else {
                    setSortOptions((prevSortOptions) => {
                        const updatedSortOptions = [...prevSortOptions];
                        const existingOptionIndex = updatedSortOptions.findIndex((option) => option.startsWith(id));
                        setyear(`${value}`)
                        console.log(value)

                        if (existingOptionIndex !== -1) {
                            updatedSortOptions.splice(existingOptionIndex, 1, `${id}:${value}`);
                        } else {
                            updatedSortOptions.push(`${id}:${value}`);
                        }

                        return updatedSortOptions;
                    });
                }

            } else if (id === 'Condition') {
                if (value === '') {
                    setSortOptions((prevSortOptions) =>
                        prevSortOptions.filter((option) => !option.startsWith(id))
                    );
                    setCondition('');
                }
                else {
                    setSortOptions((prevSortOptions) => {
                        const updatedSortOptions = [...prevSortOptions];
                        const existingOptionIndex = updatedSortOptions.findIndex((option) => option.startsWith(id));
                        setCondition(`${value}`)
                        console.log(value)

                        if (existingOptionIndex !== -1) {
                            updatedSortOptions.splice(existingOptionIndex, 1, `${id}:${value}`);
                        } else {
                            updatedSortOptions.push(`${id}:${value}`);
                        }

                        return updatedSortOptions;
                    });
                }
            }
            else {
                setSortOptions((prevSortOptions) =>
                    prevSortOptions.filter((option) => !option.startsWith(id))
                );
            }


        setCurrentPage(1); // Reset page number when changing sort options
    };
    const [clickedCardTitle, setClickedCardTitle] = useState(-1);

    const handleInputChange = (event) => {
        if (event.key === 'Enter') {
            const { id, value } = event.target;
            const option = `${id}:${value}`;

            if (value.trim() !== '') {
                setSortOptions((prevSortOptions) => {
                    // Remove previous keyword sort option, if exists
                    const updatedSortOptions = prevSortOptions.filter(
                        (option) => !option.startsWith('Name') && !option.startsWith('keyword')
                    );
                    // Add the new keyword sort option
                    updatedSortOptions.push(option);
                    setResetKeyword(keyword);
                    setName('');

                    return updatedSortOptions;
                });

                setCurrentPage(1);
            } else {
                setSortOptions((prevSortOptions) =>
                    prevSortOptions.filter((option) => !option.startsWith(id))
                );
                setCurrentPage(1);

            }
        }
    };




    const handleResetFilters = () => {
        setSortOptions((prevSortOptions) =>
            prevSortOptions.filter((option) => !option.startsWith('keyword:'))
        );
        setCurrentPage(1);
        setKeyword('');
        setResetKeyword('');
    };
    const hasKeywordOption = sortOptions.some((option) => option.startsWith('keyword:'));
    const phoneNumber = '+1 (949) 317-6520';
    const formRef = useRef(null);
    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [consentChecked, setConsentChecked] = useState(false);
    const handleConsentChange = () => {
        setConsentChecked(!consentChecked);
    };

    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = (title) => {
        setClickedCardTitle(title);
        setShowForm(true);
        console.log(title)
        document.body.classList.add('no-scroll');
    };

    const handleCloseFormm = () => {
        setClickedCardTitle(null);
        setShowForm(false);
        document.body.classList.remove('no-scroll');
    };

    const handleResetFilter = (filterType) => {
        setSortOptions((prevSortOptions) => prevSortOptions.filter((option) => !option.startsWith(filterType)));
        setCurrentPage(1);

        // Reset the corresponding state variable
        if (filterType === 'Year') {
            setyear('');
        } else if (filterType === 'Name') {
            setName('');
        }
    };
    const CardData = [

        {
            title: '2019 Porsche Cayenne',
            imageSrc: 'https://res.cloudinary.com/do0puhubq/image/upload/v1690303528/porshe12_ndjebd.jpg',
            price: '$91,681',
        },
//        ,"Name":"Porsche","Price":"85,581","Year":"2020","Model":"Panamera","images":[{"url":"https://res.cloudinary.com/do0puhubq/image/upload/v1690303461/porshe23_r2cocg.jpg"}]

        {
            title: '2020 Porsche Panamera',
            imageSrc: 'https://res.cloudinary.com/do0puhubq/image/upload/v1690303461/porshe23_r2cocg.jpg',
            price: '$85,581',
        },
        {
            title: '2017 Rolls-Royce Dawn',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/475/main/l/Used-2017-Rolls-Royce-Dawn-1687633714.jpg',
            price: '$219,295',
        }, {
            title: '2005 Maybach 62',
            imageSrc: 'https://res.cloudinary.com/do0puhubq/image/upload/v1690303372/mayb_upeygj.jpg',
            price: '$169,395',
        },
        {
            title: '2008 Maybach 57',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/164/main/l/Used-2008-Maybach-57-1657816680.jpg',
            price: '$129,995',
        },
        {
            title: '2017 Aston Martin DB11',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/471/main/l/Used-2017-Aston-Martin-DB11-Launch-Edition-Launch-Edition-1686730975.jpg',
            price: '$129,795',
        }, {
            title: '2020 Porsche Macan',
            imageSrc: 'https://res.cloudinary.com/do0puhubq/image/upload/v1690303507/porshe1_huofvh.jpg',
            price: '$53,280',
        },
        {
            title: '2021 Porsche Panamera',
            imageSrc: 'https://res.cloudinary.com/do0puhubq/image/upload/v1690303517/porshe8_l0szmv.jpg',
            price: '$126,600',
        },
        {
            title: '2018 Bentley Bentayga',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/435/main/l/Used-2018-Bentley-Bentayga-Onyx-Edition-Onyx-Edition-1684878499.jpg',
            price: '$118,295',
        },
        {
            title: '2010 Bentley Continental',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/461/main/l/Used-2010-Bentley-Continental-Supersports-Supersports-1686240687.jpg',
            price: '$94,995',
        },
        {
            title: '2005 Maserati GranSport',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/131/main/l/Used-2005-Maserati-GranSport-1654949322.jpg',
            price: '$35,995',
        },
        {
            title: '2017 Mercedes G 63 AMG',
            imageSrc:
                'https://www.privatecollectionmotors.com/imagetag/413/main/l/Used-2017-Mercedes-Benz-G-63-AMG-Designo-G-class-AMG-G-63-1682951968.jpg',
            price: '$124,755',
        },
        {
            title: '2012 Porsche 911 Carrera S Cabriolet',
            imageSrc: 'https://www.privatecollectionmotors.com/imagetag/507/main/l/Used-2012-Porsche-911-Carrera-S-Cabriolet-991-Carrera-S-135715-MSRP-1690406023.jpg',

            price: '$129,785',
        },
        {
            title: '2001 Rolls-Royce Corniche',
            imageSrc: 'https://www.privatecollectionmotors.com/imagetag/464/main/l/Used-2001-Rolls-Royce-Corniche-Convertible-1686939564.jpg',

            price: '$140,235',
        },
        {
            title: '2009 Jaguar XK Series XKR',
            imageSrc: 'https://www.privatecollectionmotors.com/imagetag/439/main/l/Used-2009-Jaguar-XK-Series-XKR-XKR-1684877728.jpg',

            price: '$43,375 ',
        },







    ];
    console.log(cars)

    console.log(clickedCardTitle)



    return (
        <div>
            <Navbar />
            <center className='pagename'><h3>Used Cars Inventory</h3></center>
            <div className="button-containerr button-container">
                <button className="filter-button" onClick={handleToggleDropdown}>
                    <FaFilter className="filter-icon" />
                    Filter Vehicles
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-menu specific-dropdown-menu">
                        {/* <div className="dropdown-item">
                            <label htmlFor="Condition" id='woww'>Condition</label>
                            <select value={Condition} id="Condition" onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                <option value="Used">Used</option>

                            </select>
                        </div> */}

                        <div className="dropdown-item">
                            <label htmlFor="Name" id='woww'>Make</label>
                            <select id="Name" value={name} onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                <option value="Aston Martin">Aston Martin</option>
                                <option value="Mercedes">Mercedes</option>
                                <option value="Porsche">Porsche</option>
                                <option value="Rolls-Royce">Rolls-Royce</option>
                                <option value="Maybach">Maybach</option>
                                <option value="Bentley">Bentley</option>
                                <option value="Jaguar">Jaguar</option>

                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label htmlFor="Year" id='woww'>Year</label>
                            <select value={year} id="Year" onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                {Array.from({ length: 2023 - 1970 + 1 }, (_, index) => (
                                    <option key={2023 - index} value={2023 - index}>
                                        {2023 - index}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="dropdown-item">
                            <label htmlFor="keyword" id='woww'>Vehicle Search</label>
                            <input type="text" id="keyword" onChange={handleKeywordChange} value={keyword} onKeyPress={handleInputChange} maxLength={55} />
                        </div>
                    </div>
                )}
            </div>

            <div className="reset-buttons-container">
                {/* Reset Keyword */}

                {name.length > 0 && (
                    <button className="reset-button" onClick={() => handleResetFilter('Name')}>
                        {name} ✗
                    </button>
                )}
                {/* Reset Year */}
                {year.length > 0 && (
                    <button className="reset-button" onClick={() => handleResetFilter('Year')}>
                        {year} ✗
                    </button>
                )}

                {/* Reset Make */}

                {resetKeyword.length > 0 && (
                    <button className="reset-button" onClick={handleResetFilters} style={{ display: sortOptions.length > 0 && hasKeywordOption ? 'block' : 'none' }}>
                        {resetKeyword} ✗
                    </button>
                )}
            </div>


            {isLoading ? (
                <div className="loading-screen">
                    <BeatLoader color="#ffffff" loading={isLoading} size={15} />
                </div>
            ) : (
                <>
                    {cars.length > 0 ? (
                        <>


                            <div className="responsive-container">
                                <div className="left-container">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <FaChevronLeft />
                                    </button>
                                        <span id='sas'>Browse {totalCars} Vehicles</span>
                                    <button
                                        disabled={currentPage * pageSize >= totalCars}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                                <div className="right-container">
                                    <label htmlFor="sortby" id="woww">Sort By:</label>
                                    <div>
                                        <select value={sort} id="sortby" onChange={handleDropdownChange}>
                                            <option value="">--</option>
                                            <option value="VehicleAtoZ">Vehicles: A to Z</option>
                                            <option value="VehicleZtoA">Vehicles: Z to A</option>
                                            <option value="PriceLowtoHigh">Price: Low to High</option>
                                            <option value="PriceHightoLow">Price: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="cards-container">
                                {cars.map((car, index) => (
                                    <div className="card" key={index}>
                                        <img
                                            className="card-image"
                                            src={car.images[0].url}
                                            alt={car.Name}
                                        />
                                        <div className="card-content">
                                            <h3 className="card-title">{car.Year} {car.Name} {car.Model}</h3>
                                            <p className='prico'>Price</p>
                                            <p className='amountt'>${car.Price}</p>
                                            <div className="card-buttons">
                                                <button className="card-button textme" onClick={() => handleCloseForm(car.Name+" "+car.Model)}><BiMessageRounded className="message-icon" />Text Us</button>
                                                {/* <button className="card-button detailss" >View details</button> */}
                                            </div>
                                            {showForm && clickedCardTitle === car.Name+" "+car.Model && (
                                                <div className="contact-form-overlay">
                                                    <div className="contact-form-card" ref={formRef}>
                                                        <div className="contact-form-header">
                                                            <button className="close-button" onClick={handleCloseFormm}>
                                                                ✘
                                                            </button>
                                                            <h2 className='textmenow'>Text Us</h2>
                                                        </div>
                                                        <form onSubmit={handleFormSubmit}>
                                                            <p className='carca'>{car.Year} {car.Name} {car.Model}</p>
                                                            <div className="contact-form-section aaaak">
                                                                <label htmlFor="name">Name:</label>
                                                                <input type="text" id="name" name="name" required />
                                                            </div>
                                                            <div className="contact-form-section aaaak">
                                                                <label htmlFor="phone">Mobile Phone:</label>
                                                                <input type="text" id="phone" name="phone" required />
                                                            </div>
                                                            <div className="contact-form-section aaaak">
                                                                <label htmlFor="email">Email:</label>
                                                                <input type="email" id="email" name="email" required />
                                                            </div>
                                                            <div className="contact-form-section aaaak">
                                                                <label htmlFor="message">Comments:</label>
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
                                            </div>
                                        ))}







                                    </div>

                            <div className="responsive-container">
                                <div className="left-container">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    {/* {totalCars} */}
                                        <span id='sas'>Browse {totalCars} Vehicles</span>
                                    <button
                                        disabled={currentPage * pageSize >= totalCars}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            <div className="results-not-found">
                                No Results Found, Please Try Another Search
                            </div>
                        </>
                    )}
                </>
            )}









            {/* </>
                    ) : (
                        <>
                            

                        </>
{/* 
                    )} */}

            {/* 

                </>
            )}  */}
            {/* <center><h2 className='colledata'>Upgrading Our Used Car Inventory: Data Collection in Progress</h2></center>

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
            </div> */}
            <Footer />


        </div>
    );
}
const App = () => {
    return (
        <ToastProvider>
            <Luxurycars />
            {/* Rest of the app */}
        </ToastProvider>
    );
};

export default App;

