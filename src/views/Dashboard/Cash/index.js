// Chakra imports
import { Box, Flex, Grid } from "@chakra-ui/react";
// Assets
import { useEffect, useState } from "react";
import TransactionRegister from "./components/TransactionRegister";
import Transactions from "./components/Transactions";
import moment from "moment";
import { CashAPI } from "../../../api/Cash";

function Cash() {
    const [cashData, setCashData] = useState({});
    const [transactions, setTransactions] = useState([{}]);

    useEffect(() => {
        CashAPI.informations().then((response) => {
            const {transactions, ...data} = response.data;
            setCashData(data);
            setTransactions(transactions);
        })
    }, []);

    const updateCashData = (e) => {
        CashAPI.informations().then((response) => {
            const {transactions, ...data} = response.data;
            setCashData(data);
            setTransactions(transactions);
        })
    }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} templateRows='1fr'>
        <Box>
            {/*<Grid
                templateColumns={{
                    sm: "1fr",
                    md: "1fr",
                    xl: "1fr 1fr 1fr 1fr 1fr",
                }}
                templateRows={{sm: "auto auto auto", md: "1fr auto", xl: "1fr"}}
                gap='26px'>
                <PaymentStatistics
                    icon={<Icon h={"24px"} w={"24px"} color='white'
                                as={cashData.balance > 0 ? FaArrowUp : FaArrowDown}/>}
                    title={"Saldo"}
                    description={cashData.balance > 0 ? "Você deve pagar" : "Você deve receber"}
                    amount={formatNumberToMoney(cashData.balance)}
                />
                <PaymentStatistics
                    icon={<Icon h={"24px"} w={"24px"} color='white' as={FaWallet}/>}
                    title={"Total Pago"}
                    description={"Valor total pago a este motorista"}
                    amount={formatNumberToMoney(cashData.totalPay)}
                />
                <PaymentStatistics
                    icon={<Icon h={"24px"} w={"24px"} color='white' as={FaPaypal}/>}
                    title={"Paypal"}
                    description={"Total Recebido do motorista"}
                    amount={formatNumberToMoney(cashData.totalReceive)}
                />
            </Grid>*/}
          <TransactionRegister
            title={"Registrar Transação"}
            updateTransaction={updateCashData}
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

export default Cash;
