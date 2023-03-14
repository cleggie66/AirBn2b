import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
                <li className='nav'>
                    <NavLink to='/CreateSpot'>Create a New Spot</NavLink>
                </li>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <li>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </li>

                <li>
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </li>
            </>
        );
    }

    return (
        <div className='nav-bar'>
            <ul className='left-nav'>
                <li className='nav'>
                    <NavLink exact to="/">Home</NavLink>
                </li>
            </ul>
            <ul className='right-nav'>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;