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

    return (
        <form onSubmit={onSubmit} className="login-form">
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                </ul>
            )}
            <label>
                Username/Email:
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => {
                        setCredential(e.target.value);
                    }}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </label>
            <button disabled={disabled} type='submit'>Log In</button>
        </form>
    )
}

export default LoginFormModal;