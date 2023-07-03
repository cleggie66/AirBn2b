import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

const LoginFormModal = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        if (password.length >= 4 && credential.length >= 6) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [credential, password])

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    }

    const loginDemo = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({ credential: "demo@user.org", password: "password" }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    }

    return (
        <form className="login-modal" onSubmit={onSubmit}>
            <div className="close-modal-icon" onClick={closeModal}>
                <i className="fa-solid fa-circle-xmark" />
            </div>
            <h2>Log In</h2>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                </ul>
            )}
            <label>
                Username/Email:
            </label>
            <span>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => {
                        setCredential(e.target.value);
                    }}
                />
            </span>
            <label>
                Password:
            </label>
            <span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </span>
            <button
                className="login-button"
                disabled={disabled}
                type='submit'
            >
                Log In
            </button>
            <button
                className="demo-user-button"
                onClick={loginDemo}
            >
                Log in as a Demo User
            </button>
        </form>
    )
}

export default LoginFormModal;