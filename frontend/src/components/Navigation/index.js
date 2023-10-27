import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoFull from "../../media/logos/AirBn2B-Logo.png";
import logoMini from "../../media/logos/AirBn2B-Logo-Mini.png";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='nav-bar'>
            <ul className='left-nav'>
                <li className='nav'>
                    <NavLink exact to="/">
                        <img className='logo-full' src={logoFull} alt='logo'></img>
                        <img className='logo-mini' src={logoMini} alt='logo'></img>
                    </NavLink>
                </li>
            </ul>
            {isLoaded && (
                <ul className='right-nav'>
                    {sessionUser && (
                        <div className='new-spot-link'>
                            <NavLink to='/spots/new'>Create a New Spot</NavLink>
                        </div>
                    )}
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navigation;