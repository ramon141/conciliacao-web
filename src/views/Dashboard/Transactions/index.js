// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp, FaPaypal, FaWallet } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import DriverCard from "./components/CardInformation";
import TransactionRegister from "./components/TransactionRegister";
import PaymentStatistics from "./components/PaymentStatistics";
import Transactions from "./components/Transactions";
import moment from "moment";
import { DriverAPI } from "../../../api/Driver";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { formatNumberToMoney } from "../../../utils/formatNumberToMoney";
import { TransactionsAPI } from '../../../api/Transactions';
import { EnterpriseAPI } from '../../../api/Enterprise';

function Billing() {
  const { id } = useParams();
  const type = location.href.split('/').pop();
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);

  const color = useMemo(() => {
    return userData.balance > 0 ? '#DB5461' : '#4FD1C5'
  }, [userData]);

  const [range, setRange] = useState({
    startDate: moment().startOf('week').format('YYYY-MM-DD'),
    endDate: moment().endOf('week').format('YYYY-MM-DD'),
  });

  useEffect(() => {
    updateUser();
  }, []);

  const updateTransaction = useCallback(() => {
    TransactionsAPI.getFilterDate(id, type + 's', range.startDate, range.endDate).then((response) => {
      setTransactions(response.data);
    })
  }, [id, type, range]);

  const updateUser = useCallback(() => {
    if (type === 'driver') {
      DriverAPI.get(id).then((response) => {
        const { transactions, ...userData } = response.data;

        setUserData(userData);
      })
    } else {
      EnterpriseAPI.get(id).then((response) => {
        const { transactions, ...userData } = response.data;
        setUserData(userData);
      })
    }
  }, [id]);

  const onSubmit = () => {
    updateUser();
    updateTransaction();
  }

  useEffect(() => {
    updateTransaction();
  }, [range]);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} templateRows='1fr'>
        <Box>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr",
              lg: "1fr 1fr",
              xl: "1fr 1fr 1fr 1fr 1fr",
            }}
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
              color={color}
              description={userData.balance > 0 ? "Você deve pagar" : "Você deve receber"}
              amount={formatNumberToMoney(userData.balance)}
            />
            <PaymentStatistics
              icon={<Icon h={"24px"} w={"24px"} color='white' as={FaWallet} />}
              title={"Total Pago"}
              color={'teal.300'}
              description={"Valor total pago a este motorista"}
              amount={formatNumberToMoney(userData.totalPay)}
            />
            <PaymentStatistics
              icon={<Icon h={"24px"} w={"24px"} color='white' as={FaPaypal} />}
              title={"Recebido"}
              color={'teal.300'}
              description={"Total Recebido do motorista"}
              amount={formatNumberToMoney(userData.totalReceive)}
            />
          </Grid>
          <TransactionRegister
            title={"Transação"}
            onSubmit={onSubmit}
          />
        </Box>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} style={{ gap: 24 }}>
        <Transactions
          title={"Transações"}
          range={range}
          setRange={setRange}
          transactions={transactions}
        />
      </Grid>
    </Flex>
  );
}

export default Billing;
