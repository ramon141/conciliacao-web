// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TimelineRow from "components/Tables/TimelineRow";
import React from "react";
import { getMessageTransaction } from "utils/transaction";

const OrdersOverview = ({ title, amount, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card maxH='100%'>
      <CardHeader p='22px 0px 35px 14px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody ps='20px' pe='0px' mb='31px' position='relative'>
        <Flex direction='column'>
          {data.map((row, index, arr) => {
            return (
              <TimelineRow
                key={row.id}
                title={getMessageTransaction(row)}
                type={row.type}
                value={row.value}
                paymentMethod={row.payment_method}
                date={row.date}
                driverId={row.driverId}
                enterpriseId={row.enterpriseId}
                arrLength={data.length}
                index={index}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OrdersOverview;
