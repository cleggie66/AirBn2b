import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            };
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        setShowMenu(false);
        history.push('/');
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className="profile-button" onClick={openMenu}>
                <i className="fa-solid fa-bars" />
                <i className="fas fa-user-circle" />
            </div>
            {user ? (
                <div className={ulClassName} ref={ulRef}>
                    <h4>{`Hello, ${user.firstName}!`}</h4>
                    <p>{user.email}</p>
                    <hr className="profile-dropdown-divider" />
                    <h4>
                        <Link to='/spots/current'>Manage Spots</Link>
                    </h4>
                    <hr className="profile-dropdown-divider" />
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
            ) : (
                <div className={ulClassName} ref={ulRef} >
                    <h4 onClick={() => setShowMenu(false)}>
                        <OpenModalButton
                            buttonText="Log In"
                            className="profile-login-button"
                            modalComponent={<LoginFormModal
                            />}
                        />
                    </h4>
                    <h4 onClick={() => setShowMenu(false)}>
                        <OpenModalButton
                            buttonText="Sign Up"
                            className="profile-signup-button"
                            modalComponent={<SignupFormModal />}
                        />
                    </h4>
                </div>
            )}
        </>
    );
};

export default ProfileButton;