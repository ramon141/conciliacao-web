import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

function TransactionRow(props) {
  const textColor = useColorModeValue("gray.700", "white");
  const { name, type, price, paymentMethod, input_or_output } = props;

  return (
    <Flex my="1rem" justifyContent="space-between">
      <Flex alignItems="center">
        <Box
          me="12px"
          borderRadius="50%"
          color={
              input_or_output === 'input'? "green.400" : "red.400"
          }
          border="1px solid"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="35px"
          h="35px"
        >
          <Icon as={input_or_output === 'input' ? FaArrowDown : FaArrowUp} />
        </Box>
        <Flex direction="column">
          <Text
            fontSize={{ sm: "md", md: "lg", lg: "md" }}
            color={textColor}
            fontWeight="bold"
          >
            {name}
          </Text>
          <Text
            fontSize={{ sm: "xs", md: "sm", lg: "xs" }}
            color="gray.400"
            fontWeight="semibold"
          >
              {paymentMethod === 'pix'?  'Pix' : 'Espécie'}
          </Text>
        </Flex>
      </Flex>
      <Box
          alignItems={'center'}
          display={'flex'}
          color={input_or_output === 'input'? "green.400" : "red.400"}>
        <Text fontSize={{ sm: "md", md: "lg", lg: "md" }} fontWeight="bold">
          {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
          }).format(Math.abs(price))}
        </Text>
      </Box>
    </Flex>
  );
}

export default TransactionRow;
