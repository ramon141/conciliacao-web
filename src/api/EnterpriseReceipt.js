import api from './axios';

function get() {
    return api.get(`/receipt-enterprises`);
}

function post({ name, cnpj_cpf, phone }) {
    return api.post(`/receipt-enterprises`, { name, cnpj_cpf, phone });
}

export const EnterpriseReceiptAPI = {
    get, post
};
