import React from 'react';
import {getBase64FromUrl} from "../../../../utils/toBase64";
import moment from "moment";
import {formatNumberToMoney} from "../../../../utils/formatNumberToMoney";
import logo from '../../../../assets/icon/logo.png';

const classes = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        border: '2px solid #ccc',
        padding: '20px',
        borderRadius: '10px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    logo: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    info: {
        marginBottom: '20px'
    },
    footer: {
        textAlign: 'center'
    }
};

export default async function Model({ name, cpfCnpj, phone, date, paymentMethod, quantity, total, type, description, product }) {
    const logoUrl = await getBase64FromUrl(logo);

        console.log(name)

    const commonInfo = (
        <>

            <div style={classes.info}>
                <p><strong>Nome:</strong> {name}</p>
                <p><strong>CPF/CNPJ:</strong> {cpfCnpj}</p>
                <p><strong>Telefone:</strong> {phone}</p>
                <p><strong>Data:</strong> {moment(date).format('DD/MM/YYYY')}</p>
                <p><strong>Método de Pagamento:</strong> {paymentMethod}</p>
            </div>
        </>
    );

    const renderProductReceipt = () => (
        <div style={classes.container}>
            <div style={classes.logo}>
                <img src={logoUrl} alt="Logo" width="80"/>
            </div>
            <div style={classes.header}>
                <h1>Recibo de Produto</h1>
            </div>
            {commonInfo}
            <div style={classes.info}>
                <p><strong>Produto:</strong> {product}</p>
                <p><strong>Quantidade:</strong> {quantity}</p>
                <p><strong>Total:</strong> {formatNumberToMoney(total)}</p>
            </div>
            <div style={classes.footer}>
                <p>Este é um recibo de produto gerado automaticamente.</p>
            </div>
        </div>
    );

    const renderServiceReceipt = () => (
        <div style={classes.container}>
            <div style={classes.logo}>
                <img src={logoUrl} alt="Logo" width="80"/>
            </div>
            <div style={classes.header}>
                <h1>Recibo de Serviço</h1>
            </div>
            {commonInfo}
            <div style={classes.info}>
                <p><strong>Descrição do Serviço:</strong> {description}</p>
                <p><strong>Total:</strong> {formatNumberToMoney(total)}</p>
            </div>
            <div style={classes.footer}>
                <p>Este é um recibo de serviço gerado automaticamente.</p>
            </div>
        </div>
    );

    return (
        <>
            {type === 'produto' ? renderProductReceipt() : null}
            {type === 'servico' ? renderServiceReceipt() : null}
        </>
    );
}
