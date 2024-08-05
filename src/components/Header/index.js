import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-menu">
                    <Link to="/" className="navbar-item">Home</Link>
                    <Link to="/pokemons/add" className="navbar-item">Add</Link>
                    <Link to="/pokemons" className="navbar-item">Pokemons</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
