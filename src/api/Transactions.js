import api from './axios';

function get(driverName){
    return api.get(`/drivers/${encodeURI(name)}`);
}

function post(data) {
    return api.post('/transactions', data);
}

export const TransactionsAPI = {
    get, post
};
