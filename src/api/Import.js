import api from './axios';

function postDrivers(dateInit, dateEnd, drivers){
    return api.post('/imports/drivers', {
        dateEnd,
        dateInit,
        drivers
    });
}

function postEnterprises(dateInit, dateEnd, enterprises){
    return api.post('/imports/enterprises', {
        dateEnd,
        dateInit,
        enterprises
    });
}

function getDriversActive(){
    return api.get('/imports/drivers-active');
}

function getEnterprisesActive(){
    return api.get('/imports/enterprises-active');
}

export const ImportAPI = {
    postDrivers, postEnterprises,
    getDriversActive, getEnterprisesActive
};
