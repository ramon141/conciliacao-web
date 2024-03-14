// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TimelineRow from "components/Tables/TimelineRow";
import React from "react";

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
                  title={`${
                      row.payment_method === 'racer'?
                          (row.value > 0?
                              'Você deve pagar referente as corridas da semana' :
                              'Você deve receber referente as corridas da semana') :
                          row.type === 'receive' ? 'Recebendo pagamento' : 'Fazendo pagamento'
                  }`}
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
