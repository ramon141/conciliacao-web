import api from './axios';

function get(){
    return api.get(`/dashboard`);
}

export const DashboardAPI = {
    get
};
