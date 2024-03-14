// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import InvoicesRow from "components/Tables/InvoicesRow";
import React from "react";

const Invoices = ({ title, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card
      my='24px'
    >
      <CardHeader>
        <Flex justify='space-between' align='center' mb='1rem' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction='column' w='100%'>
          {data.map((row) => {
            return (
              <InvoicesRow
                  name={row.name}
                  cpfcnpj={row.cpfcnpj}
                  phone={row.phone}
                  date={row.date}
                  payment_method={row.payment_method}
                  type={row.type}
                  description={row.description}
                  product={row.product}
                  quantity={row.quantity}
                  total={row.total}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Invoices;
