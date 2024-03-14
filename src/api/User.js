import api from "./axios";

function login({ email, password }) {
    const data = {
        email,
        password
    };

    return api.post('/users/login', data);
}

function me() {
    return api.get(`/whoAmI`);
}

export const UserAPI = {
    me, login
}

