import { Link } from "react-router-dom";
import Logger from '../../assets/logo/logger.svg'

export default function DefaultOptions() {

    return (
        <>
            <img src={Logger} className="welcome-screen__heading" alt="Logger Logo" />
            <Link className="welcome-screen__onboarding-action" to={`/login`}>
                Log In
                </Link>
            <Link className="welcome-screen__onboarding-action" to={`/register`}>
                Sign Up
                </Link>
        </>
    )
}