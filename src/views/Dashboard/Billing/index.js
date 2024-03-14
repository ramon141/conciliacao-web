// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import React, {useEffect, useState} from "react";
import {FaArrowDown, FaArrowUp, FaPaypal, FaWallet} from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";
import BillingInformation from "./components/BillingInformation";
import DriverCard from "./components/CreditCard";
import Invoices from "./components/Invoices";
import TransactionRegister from "./components/TransactionRegister";
import PaymentStatistics from "./components/PaymentStatistics";
import Transactions from "./components/Transactions";
import moment from "moment";
import {DriverAPI} from "../../../api/Driver";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {formatNumberToMoney} from "../../../utils/formatNumberToMoney";

function Billing() {
    const {id} = useParams();
    const [userData, setUserData] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        DriverAPI.get(id).then((response) => {
            const {transactions, ...userData} = response.data;

            setUserData(userData);
            setTransactions(transactions);
        })
    }, []);

    const updateTransaction = (e) => {
        DriverAPI.get(id).then((response) => {
            const {transactions, ...userData} = response.data;

            setUserData(userData);
            setTransactions(transactions);
        })
    }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} templateRows='1fr'>
        <Box>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr",
              xl: "1fr 1fr 1fr 1fr 1fr",
            }}
            templateRows={{ sm: "auto auto auto", md: "1fr auto", xl: "1fr" }}
            gap='26px'>
            <DriverCard
              backgroundImage={BackgroundCard1}
              title={""}
              number={userData.name}
              validity={{
                name: "Cadastrado em",
                data: userData.createdAt,
              }}
              cvv={{
                name: "CVV",
                code: "09x",
              }}
              icon={
                <Icon
                  as={RiMastercardFill}
                  w='48px'
                  h='auto'
                  color='gray.400'
                />
              }
            />
          <PaymentStatistics
              icon={<Icon h={"24px"} w={"24px"} color='white' as={userData.balance > 0 ? FaArrowUp : FaArrowDown} />}
              title={"Saldo"}
              description={userData.balance > 0? "Você deve pagar" : "Você deve receber"}
              amount={formatNumberToMoney(userData.balance)}
          />
            <PaymentStatistics
              icon={<Icon h={"24px"} w={"24px"} color='white' as={FaWallet} />}
              title={"Total Pago"}
              description={"Valor total pago a este motorista"}
              amount={formatNumberToMoney(userData.totalPay)}
            />
            <PaymentStatistics
              icon={<Icon h={"24px"} w={"24px"} color='white' as={FaPaypal} />}
              title={"Paypal"}
              description={"Total Recebido do motorista"}
              amount={formatNumberToMoney(userData.totalReceive)}
            />
          </Grid>
          <TransactionRegister
            title={"Transação"}
            updateTransaction={updateTransaction}
          />
        </Box>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} style={{ gap: 24 }}>
        <Transactions
          title={"Transações"}
          dateStart={moment()}
          dateEnd={moment().add(10, 'days')}
          transactions={transactions}
        />
      </Grid>
    </Flex>
  );
}

export default Billing;
