// Card.js
import React, { useState } from 'react';
import { RiStarSLine } from 'react-icons/ri';
import { MdOutlineFavorite } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../../../../../context/ApiContext';
import API_URL from '../../../../../../config/api';
import './Card.css';

const Card = ({ id, name, image, price, isFavorite, onFavoriteClick }) => {
    const [isClicked, setIsClicked] = useState(isFavorite);
    const { loggedInUser } = useApi();
    const navigate = useNavigate();

    const handleFavoriteClick = async () => {
        try {
            if (loggedInUser === null) { 
                navigate('/inicioSesion'); 
                return; 
            }
    
            if (isClicked) {
                // Si el producto ya está marcado como favorito, eliminarlo de la lista de favoritos
                await onFavoriteClick(id, false);
            } else {
                // Si el producto no está marcado como favorito, agregarlo a la lista de favoritos
                const response = await fetch(`${API_URL}/api/favorites/${loggedInUser.userId}/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {                
                    console.error('Failed to add product to favorites');
                    return;
                }
            }
    
            // Cambia el estado de isClicked al valor opuesto
            setIsClicked(prevState => !prevState);
        } catch (error) {
            console.error('Error while updating favorites:', error);
        }
    };  
    
    

    return (
        <div className='container-principal-single-card'>
            <div className={`container-corazon-single-card ${isClicked ? 'clicked' : ''}`} onClick={handleFavoriteClick}>
                <MdOutlineFavorite className={`corazon-single-card ${isClicked ? 'clicked' : ''}`} />
            </div>
            <Link to={`/detalle-producto/${id}`} className='link-detail'>
                <div className='container-img-single-card'>
                    <img className='img-single-card' src={image} alt={name} />
                </div>
            </Link>
            <div className="container-name-single-card">
                {name}
            </div>
            <div className='container-precio-single-card'>
                <p className='text-price-single-card'>$ {Number(price).toLocaleString()}</p>
                <p className='text-dia-single-card'>Por dia</p>
            </div>
            <div className='container-stars-sigle-card'>
                <RiStarSLine /><RiStarSLine /><RiStarSLine /><RiStarSLine /><RiStarSLine />
            </div>
        </div>
    );
};

export default Card;

