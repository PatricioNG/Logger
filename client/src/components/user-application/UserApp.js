import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom";
import { getUser } from "../../utils/APIs";
import { Loading } from "../Loading";

export default function UserApp() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(sessionStorage.getItem("userLoggedIn")).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
            } else {
                setUser(false);
            }
        })
    }, [])

    return user === null
        ? <Loading />
        : user === false || !sessionStorage.getItem("userLoggedIn")
            ? <Redirect to="/" />
            :
            (
                <main className="welcome-screen">
                    <h1 className="welcome-screen__user-message">Welcome, {user.first_name}</h1>
                </main>
            )
}