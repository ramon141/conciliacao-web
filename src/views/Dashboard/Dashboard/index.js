// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, {useEffect, useState} from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import BoxDashboard from "./components/BoxDashboard";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import {DashboardAPI} from "../../../api/Dashboard";
import {formatNumberToMoney} from "../../../utils/formatNumberToMoney";

export default function Dashboard() {
  const [data, setData] = useState({lastTransactions: [], enterprises: []});
  const iconBoxInside = useColorModeValue("white", "white");

  useEffect(() => {
    DashboardAPI.get().then((response) => {
      setData(response.data);
    })
  }, []);

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <BoxDashboard
            title={"Lucro da Última Semana"}
            amount={formatNumberToMoney(data.profitLastWeek, false)}
            icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <BoxDashboard
            title={"Total de Motoristas com Pedência"}
            amount={data.quantityDriversWithPendding}
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <BoxDashboard
            title={"Quantidade de Corridas na semana"}
            amount={data.quantityRacersWeek}
            icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <BoxDashboard
            title={"Valor recebido"}
            amount={formatNumberToMoney(data.earnWeek)}
            icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />

        <BoxDashboard
            title={"Valor a ser pago aos motoristas"}
            amount={formatNumberToMoney(data.toPayDrivers, false)}
            icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <BoxDashboard
            title={"Valor a ser recebido dos motoristas"}
            amount={formatNumberToMoney(data.toReceiveDrivers, false)}
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />

        <BoxDashboard
            title={"Valor a ser pago as empresas"}
            amount={formatNumberToMoney(data.toPayEnterprises, false)}
            icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <BoxDashboard
            title={"Valor a ser recebido das empresas"}
            amount={formatNumberToMoney(data.toReceiveEnterprises, false)}
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>

      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
        <ActiveUsers
          title={"Informações de Caixa"}
          percentage={23}
          data={data}
          chart={<BarChart data={data.chartBestDrivers} />}
        />
        <SalesOverview
          title={"Ganhos no último ano"}
          percentage={5}
          chart={<LineChart data={data.chartEarnLastYear} />}
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap='24px'>
        <Projects
          title={"Empresas"}
          amount={30}
          captions={["NOME", "CORRIDAS", "SALDO", "CRIADO EM"]}
          data={data.enterprises}
        />
        <OrdersOverview
          title={"Últimas Transações"}
          amount={30}
          data={data.lastTransactions}
        />
      </Grid>
    </Flex>
  );
}
