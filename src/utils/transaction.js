export const getMessageTransaction = (transaction) => {
    if (transaction.payment_method === 'acerto')
        return 'Acerto';

    if (transaction.payment_method === 'racer') {
        if (transaction.value > 0)
            return 'Você deve pagar referente as corridas da semana';
        else
            return 'Você deve receber referente as corridas da semana';
    }

    if (transaction.type === 'receive')
        return 'Recebendo pagamento';
    else
        return 'Fazendo pagamento';
}

export const getColorTransaction = (transaction) => {
    if (transaction.payment_method === 'acerto' || transaction.type === 'receive')
        return "green.400";
    if (transaction.payment_method === 'racer' && transaction.value < 0)
        return "green.400";

    return "red.400"
}

export const getIconTransaction = (transaction) => {
    if (transaction.payment_method === 'acerto')
        return 'Acerto';
}