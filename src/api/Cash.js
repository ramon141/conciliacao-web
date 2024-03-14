import api from './axios';

function get(){
    return api.get(`/caixa-transactions`);
}

function informations() {
    return api.get(`/caixa-transactions/informations`);
}

function post(data) {
    return api.post('/caixa-transactions', data);
}

export const CashAPI = {
    get, post, informations
};
