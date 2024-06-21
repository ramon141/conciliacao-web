// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Custom icons
import {
  CartIcon, CashIcon, DonateIcon, ProfitIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React from "react";
import ChartStatistics from "./ChartStatistics";
import {formatNumberToMoney} from "../../../../utils/formatNumberToMoney";

const ActiveUsers = ({ title, data, chart }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p='16px'>
      <CardBody>
        <Flex direction='column' w='100%'>
          {chart}
          <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
              {title}
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <ChartStatistics
              title={"Em caixa"}
              amount={formatNumberToMoney(data.inCash, false)}
              icon={<CashIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Gasto no mês"}
              amount={formatNumberToMoney(data.spending, false)}
              icon={<DonateIcon h={"20px"} w={"20px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Ganhos no mês"}
              amount={formatNumberToMoney(data.receivedValue, false)}
              icon={<ProfitIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
