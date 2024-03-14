import api from './axios';

function get(driverName){
    return api.get(`/receipts/${encodeURI(name)}`);
}

function post(data) {
    return api.post('/receipts', data);
}

export const ReceiptAPI = {
    get, post
};
