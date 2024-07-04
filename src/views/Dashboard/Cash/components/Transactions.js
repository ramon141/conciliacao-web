// Chakra imports
import { Box, Flex, FormControl, FormLabel, Icon, Input, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TransactionRow from "components/Tables/TransactionRow";
import React from "react";
import { FaArrowDown, FaArrowUp, FaRegCalendarAlt } from "react-icons/fa";

const Transactions = ({
  title,
  startDate,
  endDate,
  transactions,
  setStartDate,
  setEndDate
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card my='24px'>
      <CardHeader mb='12px'>
        <Flex direction='column' w='100%'>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            justify={{ sm: "center", lg: "space-between" }}
            align={{ sm: "center" }}
            w='100%'
            my={{ md: "12px" }}>
            <Text
              color={textColor}
              fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
              fontWeight='bold'>
              {title}
            </Text>

            <Flex align='center' direction={'column'} textAlign={'center'}>
              <FormLabel ms='4px' my={{ sm: '10px', md: '0px' }} fontSize='sm' fontWeight='normal' textAlign={'center'}>
                Prazo
              </FormLabel>

              <Flex align='center' direction={'row'} textAlign={'center'}>
                <Input
                  borderRadius='15px'
                  fontSize='sm'
                  type='date'
                  width={'130px'}
                  placeholder='Início'
                  size='sm'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                &nbsp;&nbsp;até&nbsp;&nbsp;
                <Input
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  borderRadius='15px'
                  width={'130px'}
                  fontSize='sm'
                  type='date'
                  placeholder='Fim'
                  size='sm'
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction='column' w='100%'>
          {transactions.map((row, idx) => {
            return (
              <TransactionRow
                key={idx}
                name={`${row.input_or_output === 'input' ? 'Recebendo pagamento' : 'Fazendo pagamento'
                  }`}
                input_or_output={row.input_or_output}
                type={row.type}
                price={row.value}
                paymentMethod={row.payment_method}
                color={row.input_or_output === 'input' ? "green.400" : "red.400"}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card >
  );
};

export default Transactions;
