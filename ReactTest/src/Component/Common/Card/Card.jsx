


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Card.css";
import Modal from '../Modal/Modal';

const Card = () => {
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [cars, setCars] = useState([]); 
    const [cat, setCat] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [found, setFound] = useState(true); 

    const fetchCars = async () => {
        const response = await axios.get("https://freetestapi.com/api/v1/cars");
        const data = response.data;
        setCars(data); 
        setFilteredCars(data); 
        const uniqueMakes = [...new Set(data.map(car => car.make))]; 
        setCat(uniqueMakes); 
    };

    const filterByCategory = (category) => {
        if (category === "All") {
            setFilteredCars(cars); 
        } else {
            const newFiltered = cars.filter(car => car.make === category); 
            setFilteredCars(newFiltered); 
        }
        setSearchTerm(''); 
    };

    const searchCars = () => {
        const searchedCars = cars.filter(car => 
            car.model.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        setFilteredCars(searchedCars); 
        setFound(searchedCars.length > 0); 
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            searchCars(); 
        }
    };
    const handleOpenModal = (id) => {
        setSelectedId(id);
        setModal(true);
    };

    useEffect(() => {
        fetchCars(); 
    }, []);

    return (
        <>
            <div className='navbar'>
                <h1>CARS HUB</h1>
                
                <select onChange={(e) => filterByCategory(e.target.value)}>
                    <option value="All">All</option>
                    {cat.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
                <div className='nav-search'>
                    <input
                        onKeyDown={handleKeyPress} 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        type='search'
                        placeholder='Search...'
                    />
                    <button onClick={searchCars}>Search</button>
                </div>
            </div>
            <div className="card-container">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div className="card" key={car.id}>
                            <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg?impolicy=resize&imwidth=480" />
                            <p>Name: {car.model}</p>
                            <p>Company: {car.make}</p>
                            <p>Year: {car.year}</p>
                            <p>Price: {car.price}</p>
                            <button onClick={() => handleOpenModal(car.id)}>View Detail</button>
                        </div>
                    ))
                ) : (
                    <p>{found ? "No cars found." : "No results match your search."}</p>
                )}
            </div>
            <Modal modal={modal} setModal={setModal} selectedId={selectedId} />
        </>
    );
};

export default Card;
