import { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../utils/APIs";
import Logger from '../../assets/logo/logger.svg';

export default function Registration() {

    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const validateFields = (event) => {
        let valid = true;

        if (!firstName) {
            event.target.firstName.parentElement.classList.add('error__input-blank');
            valid = false;
        }
        if (!lastName) {
            event.target.lastName.parentElement.classList.add('error__input-blank');
            valid = false;
        }
        if (!userEmail) {
            event.target.userEmail.parentElement.classList.add('error__input-blank');
            valid = false;
        }
        if (!password) {
            event.target.password.parentElement.classList.add('error__input-blank');
            valid = false;
        }
        if (!passwordConfirm) {
            event.target.passwordConfirm.parentElement.classList.add('error__input-blank');
            valid = false;
        }

        return valid;
    }

    const clearError = (event) => {
        event.target.parentElement.classList.remove('error__input-blank');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateFields(event) && password === passwordConfirm) {
            registerUser({
                firstName: firstName,
                lastName: lastName,
                userEmail: userEmail,
                password: password
            }).then((res) => {
                sessionStorage.setItem("userLoggedIn", res.data.user.id);
                handleStatus(res.status, event) && history.push('/users');
            });
        }

    }

    const handleStatus = (status, event) => {
        if (status === 201) {
            event.target.classList.remove('error__duplicate-user-exists');
            return true;
        }
        if (status === 400) {
            event.target.classList.add('error__duplicate-user-exists');
            return false;
        }
    }

    const comparePasswords = (event) => {
        event.target.value === password
            ? event.target.parentElement.classList.remove('error__confirm-password-mismatch')
            : event.target.parentElement.classList.add('error__confirm-password-mismatch')
    };

    return (
        <form className="welcome-screen__default-form" onSubmit={handleSubmit}>
            <img src={Logger} className="welcome-screen__small-logo" alt="Logger Logo" />
            <label className="welcome-screen__default-label">
                Enter your First Name:
                    <input name="firstName"
                    onChange={(event) => {
                        setFirstName(event.target.value);
                        clearError(event);
                    }}
                    className="welcome-screen__default-input" type="text" />
            </label>
            <label className="welcome-screen__default-label">
                Enter your Last Name:
                    <input name="lastName"
                    onChange={(event) => {
                        setLastName(event.target.value)
                        clearError(event)
                    }}
                    className="welcome-screen__default-input" type="text" />
            </label>
            <label className="welcome-screen__default-label">
                Enter your email:
                    <input name="userEmail"
                    onChange={(event) => {
                        setUserEmail(event.target.value)
                        clearError(event)
                    }}
                    className="welcome-screen__default-input" type="text" />
            </label>
            <label className="welcome-screen__default-label">
                Enter your password:
                    <input name="password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                        clearError(event)
                    }}
                    className="welcome-screen__default-input" type="password" />
            </label>
            <label className="welcome-screen__default-label">
                Confirm your password:
                    <input name="passwordConfirm" onChange={(event) => {
                    setPasswordConfirm(event.target.value)
                    clearError(event)
                    comparePasswords(event)
                }} className="welcome-screen__default-input" type="password" />
            </label>
            <button className="welcome-screen__default-submit">Register</button>
        </form>
    )
}