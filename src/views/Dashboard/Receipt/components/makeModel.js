import moment from 'moment';
import React from 'react';
import 'moment/locale/pt-br';
import { formatNumberToMoney } from 'utils/formatNumberToMoney';
import logo from '../../../../assets/icon/logo.jpeg';
import { getBase64FromUrl } from 'utils/toBase64';

const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      margin: 0,
      padding: '20px',
    },
    reciboContainer: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: '2px solid #000',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    headerImg: {
      maxWidth: '150px',
      marginRight: '20px',
    },
    headerInfo: {
      fontSize: '12px',
      textAlign: 'left',
    },
    headerTitle: {
      margin: 0,
      fontSize: '24px',
    },
    headerText: {
      margin: '2px 0',
    },
    title: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: '18px',
      margin: '20px 0',
    },
    content: {
      textAlign: 'justify',
      fontSize: '14px',
      lineHeight: 1.6,
      margin: '10px 0',
    },
    signature: {
      textAlign: 'center',
      fontSize: '14px',
      marginTop: '40px',
    },
    signatureBold: {
      marginTop: '5px',
      fontWeight: 'bold',
    },
  };
  
  export default async function Model({ name, cpfCnpj, phone, date, paymentMethod, quantity, total, description, product, type }) {
    const logoUrl = await getBase64FromUrl(logo);

    return (
        <div style={styles.container}>
        <div style={styles.reciboContainer}>
          <div style={styles.header}>
            <img src={logoUrl} alt="Logo Juma Entregas" style={styles.headerImg} />
            <div style={styles.headerInfo}>
              <h1 style={styles.headerTitle}>Juma Entregas</h1>
              <p style={styles.headerText}>Serviço de Motoboy</p>
              <p style={styles.headerText}>CADASTRE-SE NO NOSSO APP OU NO NOSSO SITE:</p>
              <p style={styles.headerText}>www.jumaentregas.com.br</p>
              <p style={styles.headerText}>(93) 99110-5060</p>
              <p style={styles.headerText}>Trav. Professor Carvalho, 81 - Mercadão 2000 - Sala B, Anexo à Drogaria Popular</p>
            </div>
          </div>
          <h2 style={styles.title}>RECIBO</h2>
          <p style={styles.content}>
            Pelo presente, eu <strong>LIDIANE SILVA SOUZA MEI - JUMA ENTREGAS SANTARÉM</strong>, inscrito no CNPJ sob nº 44.691.390/0001-69,
            declaro que RECEBI na data de hoje, o valor de <strong>{formatNumberToMoney(total)}</strong>, por meio de {paymentMethod}, de <strong>{name}</strong>, inscrito no
            CNPJ sob nº {cpfCnpj}, referente a pagamento {type === 'produto' ? `do produto ${product}, quantidade: ${quantity}` : `do serviço ${description}`}.
          </p>
          <p style={styles.content}>
            Declaro ainda que o valor recebido refere-se a serviços prestados, como atividade autônoma, sem qualquer habitualidade ou subordinação,
            não caracterizando em qualquer hipótese vínculo de emprego.
          </p>
          <p style={styles.content}>
            Sendo expressão de verdade e sem qualquer coação, firmo o presente.
          </p>
          <p style={styles.signature}>Santarém-PA{
            " " + moment(date).locale('pt-br').format('LL')
          }</p>
          <p style={styles.signature}>__________________________________________</p>
          <p style={{ ...styles.signature, ...styles.signatureBold }}>Lidiane Silva Souza Lima</p>
        </div>
      </div>
    );
  };
