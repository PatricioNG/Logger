import axios from 'axios';
const PORT = 5000;

export const login = (email, password) => {
    return axios.post(`http://localhost:${PORT}/users/login`,
        {
            username: email,
            password: password
        },
        {
            withCredentials: true
        }
    )
        .then((res) => res)
        .catch((error) => error.response);

}

export const registerUser = (user) => {
    return axios.post(`http://localhost:${PORT}/users/register`,
        user,
        {
            withCredentials: true
        }
    )
        .then((res) => res)
        .catch((error) => error.response);
}

export const getUser = (id) => {
    return axios.post(`http://localhost:${PORT}/users`, { id: id }, { withCredentials: true })
        .then((res) => res)
        .catch((error) => error.response);
}