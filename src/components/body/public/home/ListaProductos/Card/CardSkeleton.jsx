import React from 'react';
import './CardSkeleton.css';

const CardSkeleton = () => {
    return (
        <div className='container-principal-single-card skeleton-card'>
            <div className='container-corazon-single-card'>
                <div className='skeleton skeleton-heart'></div>
            </div>
            <div className='container-img-single-card'>
                <div className='skeleton skeleton-image'></div>
            </div>
            <div className="container-name-single-card">
                <div className='skeleton skeleton-text'></div>
            </div>
            <div className='container-precio-single-card'>
                <div className='skeleton skeleton-price'></div>
                <div className='skeleton skeleton-day'></div>
            </div>
            <div className='container-stars-sigle-card'>
                <div className='skeleton skeleton-stars'></div>
            </div>
        </div>
    );
};

export default CardSkeleton;
