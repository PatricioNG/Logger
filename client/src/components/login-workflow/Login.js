import { useState } from "react"
import { login } from "../../utils/APIs";
import { Redirect, useHistory } from 'react-router-dom';
import Logger from '../../assets/logo/logger.svg';

export default function Login() {

    const history = useHistory();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!userEmail) {
            event.target.emailInput.parentElement.classList.add('error__input-blank');
        } else {
            event.target.emailInput.parentElement.classList.remove('error__input-blank');
        }

        if (!userPassword) {
            event.target.passwordInput.parentElement.classList.add('error__input-blank');
        } else {
            event.target.passwordInput.parentElement.classList.remove('error__input-blank');
        }

        if (userEmail && userPassword) {
            login(userEmail, userPassword).then((res) => {
                if (handleStatus(res.status, event)) {
                    sessionStorage.setItem("userLoggedIn", res.data.user.user); //Set session storage of logged in user
                    history.push('/users') // bump to user screen
                }
            })
        }
    }

    const handleStatus = (status, event) => {
        if (status === 404) {
            event.target.classList.add('error__invalid-user-login');
            return false;
        }
        if (status === 200) {
            event.target.classList.remove('error__invalid-user-login');
            return true;
        }
    }


    return sessionStorage.getItem("userLoggedIn")
        ? <Redirect to="/users" />
        : (
            <form onSubmit={handleSubmit} className="welcome-screen__default-form">
                <img src={Logger} className="welcome-screen__small-logo" alt="Logger Logo" />
                <label className="welcome-screen__default-label">
                    Enter your email:
                    <input name="emailInput" spellCheck="false" onChange={({ target }) => setUserEmail(target.value)} className="welcome-screen__default-input" type="text" />
                </label>
                <label className="welcome-screen__default-label">
                    Enter your password:
                    <input name="passwordInput" onChange={({ target }) => setUserPassword(target.value)} className="welcome-screen__default-input" type="password" />
                </label>
                <button className="welcome-screen__default-submit">Submit</button>
            </form>
        )
}