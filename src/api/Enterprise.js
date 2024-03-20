import api from './axios';

function get(name){
    const filter = {
        include: ['transactions']
    };

    return api.get(`/enterprises/${encodeURI(name)}?filter=${JSON.stringify(filter)}`);
}

function patch(name, data){
    return api.patch(`/enterprises/${encodeURI(name)}`, data);
}

function post(data){
    return api.post(`/enterprises`, data);
}

export const EnterpriseAPI = {
    get, patch, post
};
