import api from './axios';

function get(driverName) {
    return api.get(`/drivers/${encodeURI(name)}`);
}

function getFilterDate(id, type, dateInit, dateEnd) {
    const filter = {
        where: {
            date: {
                between: [dateInit, dateEnd]
            }
        }
    };

    return api.get(`/${type}/${encodeURI(id)}/transactions?filter=${JSON.stringify(filter)}`);
}

function post(data) {
    return api.post('/transactions', data);
}

export const TransactionsAPI = {
    get, post, getFilterDate
};
