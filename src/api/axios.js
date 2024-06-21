import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3002"
})


api.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.code === "ERR_NETWORK")
            error.response = { data: { message: `A API não está respondendo. Certifique-se que ela está aberta no endereço: ${error.config.baseURL}` } };

        return Promise.reject(error);
    }
);


export default api;