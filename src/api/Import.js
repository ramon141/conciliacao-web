import api from './axios';

function postDrivers(dateInit, dateEnd, drivers){
    return api.post('/imports/drivers', {
        dateEnd,
        dateInit,
        drivers
    });
}

function postEnterprises(data){
    return api.post('/import/enterprises', data);
}

function getDriversActive(){
    return api.get('/imports/drivers-active');
}

function getEnterprises(){
    return api.get('/import/enterprises');
}

export const ImportAPI = {
    postDrivers, postEnterprises,
    getDriversActive, getEnterprises
};
