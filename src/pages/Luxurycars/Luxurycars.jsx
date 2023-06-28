import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import "./Luxurycars.css";
import { FaFilter } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { BiMessageRounded } from "react-icons/bi";

function Luxurycars() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCars, setTotalCars] = useState(0);
    const [pageSize] = useState(10); // Number of cars to display per page
    const [sortOptions, setSortOptions] = useState([]); // Array to store selected sort options
    const [sort, setsort] = useState('');
    const [name, setName] = useState('');

    const [year, setyear] = useState('');

    const [cylinder, setcylinder] = useState('');

    useEffect(() => {

        fetchData();

    }, [currentPage, sortOptions]);

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
    console.log(cars)
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
                        setName(`${value}`)
                        if (existingOptionIndex !== -1) {
                            updatedSortOptions.splice(existingOptionIndex, 1, `${id}:${value}`);
                        } else {
                            updatedSortOptions.push(`${id}:${value}`);
                        }

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

    const handleInputChange = (event) => {
        if (event.key === 'Enter') {
            const { id, value } = event.target;
            const option = `${id}:${value}`;

            if (value.trim() !== '') {
                setSortOptions((prevSortOptions) => {
                    // Remove previous keyword sort option, if exists
                    const updatedSortOptions = prevSortOptions.filter((option) => !option.startsWith('keyword:'));

                    // Add the new keyword sort option
                    updatedSortOptions.push(option);

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
    };
    const hasKeywordOption = sortOptions.some((option) => option.startsWith('keyword:'));

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };
    return (
        <div>
            <Navbar />
            <center className='pagename'><h3>Luxury Cars Inventory</h3></center>
            <div className="button-containerr button-container">
                <button className="filter-button" onClick={handleToggleDropdown}>
                    <FaFilter className="filter-icon" />
                    Filter Vehicles
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <label htmlFor="Condition" id='woww'>Condition</label>
                            <select value={Condition} id="Condition" onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                <option value="Used">Used</option>

                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label htmlFor="Year" id='woww'>Year</label>
                            <select value={year} id="Year" onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                <option value="2009">2009</option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>

                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label htmlFor="Name" id='woww'>Make</label>
                            <select id="Name" value={name} onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                <option value="Aston Martin">Aston Martin</option>
                                <option value="Lambo">Lambo</option>
                                <option value="Ferrari">Ferrari</option>
                                <option value="BMW">BMW</option>
                                <option value="Mercedes">Mercedes</option>
                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label htmlFor="Cylinders" id='woww'>Cylinders</label>
                            <select value={cylinder} id="Cylinders" onChange={handleDropdownChange}>
                                <option value="">Any</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="12">12</option>

                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label htmlFor="keyword" id='woww'>Vehicle Search</label>
                            <input type="text" id="keyword" onChange={handleKeywordChange} value={keyword} onKeyPress={handleInputChange} />
                        </div>
                    </div>
                )}
            </div>
            <button className="reset-button" onClick={handleResetFilters} style={{ display: sortOptions.length > 0 && hasKeywordOption ? 'block' : 'none', position: 'absolute' }}>
                Remove Search Filterations ✗
            </button>
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
                                <div className="card">
                                    <img
                                        className="card-image"
                                        src="https://res.cloudinary.com/do0puhubq/image/upload/v1686154377/car1233_scpgn8.jpg"
                                        alt="Car 1"
                                    />
                                    <div className="card-content">
                                        <h3 className="card-title">2020 Aston Martin DB11</h3>
                                        <div className="card-buttons">
                                            <button className="card-button textme"><BiMessageRounded className="message-icon" />Text Us</button>
                                            <button className="card-button detailss" >View details</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <img
                                        className="card-image"
                                        src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
                                        alt="Car 2"
                                    />
                                    <div className="card-content">
                                        <h3 className="card-title">2020 Aston Martin DB11</h3>
                                        <div className="card-buttons">
                                                <button className="card-button textme"><BiMessageRounded className="message-icon" />Text Us</button>
                                            <button className="card-button detailss" >View details</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <img
                                        className="card-image"
                                        src="https://res.cloudinary.com/do0puhubq/image/upload/v1686154377/car1233_scpgn8.jpg"
                                        alt="Car 3"
                                    />
                                    <div className="card-content">
                                        <h3 className="card-title">2020 Aston Martin DB11 </h3>
                                        <div className="card-buttons">
                                                <button className="card-button textme"><BiMessageRounded className="message-icon" />Text Us</button>
                                            <button className="card-button detailss" >View details</button>
                                        </div>
                                    </div>
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



            <Footer />


        </div>
    );
}

export default Luxurycars;
