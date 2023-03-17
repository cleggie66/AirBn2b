import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="profile-button" style={{ cursor: 'pointer' }} onClick={openMenu}>
                <i className="fa-solid fa-bars" />
                <i className="fas fa-user-circle" />
            </div>
            {user ? (
                <div className={ulClassName} ref={ulRef}>
                    <h4>{`Hello, ${user.firstName}!`}</h4>
                    <p>{user.email}</p>
                    <hr className="profile-dropdown-divider"></hr>
                    <h4>
                        <Link to='/spots/current'>Manage Spots</Link>
                    </h4>
                    <hr className="profile-dropdown-divider"></hr>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
            ) : (
                <div className={ulClassName} ref={ulRef}>
                    <h4>
                        <OpenModalButton
                            buttonText="Log In"
                            className="signup-login-button"
                            modalComponent={<LoginFormModal />}
                        />
                    </h4>
                    <h4>
                        <OpenModalButton
                            buttonText="Sign Up"
                            className="signup-login-button"
                            modalComponent={<SignupFormModal />}
                        />
                    </h4>
                </div>
            )}
        </>
    );
}

export default ProfileButton;