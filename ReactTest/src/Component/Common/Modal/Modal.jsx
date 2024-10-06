import React, { useEffect, useState } from 'react';
import './Modal.css';
import axios from 'axios';

const Modal = ({ modal, setModal, selectedId }) => {
    const [carDetail, setCarDetail] = useState(null);

    useEffect(() => {
        const fetchCarDetail = async () => {
            if (selectedId) {
                const response = await axios.get('https://freetestapi.com/api/v1/cars');
                const data = response.data;
                console.log(data)
                const singleCar = data.find(item => item.id === selectedId);
                setCarDetail(singleCar);
            }
        };

        fetchCarDetail();
    }, [selectedId]);

    return (
        <>
            {modal && carDetail && (
                <div className="modal">
                    <div className="modal-content">
                        <img src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg?impolicy=resize&imwidth=480"></img>
                        <h2>{carDetail.model}</h2>
                        <p>{carDetail.description}</p>
                        <p className='product-price'>Price: {carDetail.price}</p>
                        <p className='product-price'>Engine: {carDetail.engine}</p>
                        <p className='product-price'>Company: {carDetail.make}</p>
                        <p className='product-price'>Year: {carDetail.year}</p>
                        <button className='close' onClick={() => setModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
