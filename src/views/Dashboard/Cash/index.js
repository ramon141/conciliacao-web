// Chakra imports
import { Box, Flex, Grid } from "@chakra-ui/react";
// Assets
import { useCallback, useEffect, useState } from "react";
import TransactionRegister from "./components/TransactionRegister";
import Transactions from "./components/Transactions";
import moment from "moment";
import { CashAPI } from "../../../api/Cash";

function Cash() {
  const [cashData, setCashData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(moment().startOf('week').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().endOf('week').format('YYYY-MM-DD'));

  const updateCashData = useCallback(() => {
    const filter = {
      where: {
        date: {
          between: [startDate, endDate]
        }
      }
    };

    CashAPI.informations({ filter }).then((response) => {
      const { transactions, ...data } = response.data;
      setCashData(data);
      setTransactions(transactions);
    })
  }, [startDate, endDate, setCashData, setTransactions]);

  useEffect(() => {
    if (startDate && endDate) {
      console.log('update');
      updateCashData();
    }
  }, [updateCashData, startDate, endDate]);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} templateRows='1fr'>
        <Box>
          <TransactionRegister
            title={"Registrar Transação"}
            updateTransaction={updateCashData}
          />
        </Box>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} style={{ gap: 24 }}>
        <Transactions
          title={"Transações"}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          transactions={transactions}
        />
      </Grid>
    </Flex>
  );
}

export default Cash;
