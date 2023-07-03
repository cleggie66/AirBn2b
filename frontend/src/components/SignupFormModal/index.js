import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css"

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true)
    const { closeModal } = useModal();

    useEffect(() => {
        setDisabled(
            (
                (email && username && firstName && lastName && password && confirmPassword) &&
                (username.length >= 4) &&
                (password.length >= 6) &&
                (password === confirmPassword)
            ) ? false : true)
    }, [email, username, firstName, lastName, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }
        return setErrors(['Passwords must match']);
    };

    return (
        <form className="signup-modal" onSubmit={handleSubmit}>
            <div className="close-modal-icon" onClick={closeModal}>
                <i className="fa-solid fa-circle-xmark" />
            </div>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                </ul>
            )}
            <h2>Sign Up</h2>
            <label>
                Email:
            </label>
            <span>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </span>
            <label>
                Username:
            </label>
            <span>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </span>
            <label>
                First Name:
            </label>
            <span>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </span>
            <label>
                Last Name:
            </label>
            <span>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </span>
            <label>
                Password:
            </label>
            <span>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </span>
            <label>
                Confirm Password:
            </label>
            <span>
                <input
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </span>
            <button
                className="signup-button"
                type="submit"
                disabled={disabled}
            >
                Sign Up
            </button>
        </form>
    );
}

export default SignupFormModal;