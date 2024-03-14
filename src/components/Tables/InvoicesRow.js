import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import {FaFilePdf} from "react-icons/fa";
import {formatNumberToMoney} from "../../utils/formatNumberToMoney";
import Model from "../../views/Dashboard/Receipt/components/makeModel";
import {exportPDF} from "../../utils/reports";

function InvoicesRow(props) {
  const textColor = useColorModeValue("gray.700", "white");
  const {
      name,
      cpfcnpj,
      phone,
      date,
      payment_method,
      type,
      description,
      product,
      quantity,
      total
  } = props;

  const handleExport = () => {
      console.log(type)
      Model({
          name,
          cpfCnpj: cpfcnpj,
          phone,
          date,
          paymentMethod: payment_method,
          quantity,
          total,
          description,
          product,
          type
      }).then((response) => {
          exportPDF(response, '50px 0px', 'Relatório', 'portrait');
      })
  }

  return (
    <Flex my={{ sm: "1rem", xl: "10px" }} alignItems="center">
      <Flex direction="column">
        <Text fontSize="md" color={textColor} fontWeight="bold">
            {name}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold" me="16px">
            {moment(date).format('DD/MM/YYYY')}
        </Text>
      </Flex>
      <Spacer />
      <Box me="12px">
        <Text fontSize="md" color="gray.400" fontWeight="semibold">
          {
              formatNumberToMoney(total)
          }
        </Text>
      </Box>
      <Button p="0px" bg="transparent" variant="no-hover">
        <Flex alignItems="center" p="12px">
            <Icon onClick={handleExport} as={FaFilePdf} w="20px" h="auto" me="5px"/>
        </Flex>
      </Button>
    </Flex>
  );
}

export default InvoicesRow;
