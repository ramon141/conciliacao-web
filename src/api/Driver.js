import api from './axios';

function get(name){
    const filter = {
        include: ['transactions']
    };

    return api.get(`/drivers/${encodeURI(name)}?filter=${JSON.stringify(filter)}`);
}

function patch(name, data){
    return api.patch(`/drivers/${encodeURI(name)}`, data);
}

export const DriverAPI = {
    get, patch
};
