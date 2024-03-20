import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import moment from "moment";
import {formatNumberToMoney} from "../../utils/formatNumberToMoney";

function TimelineRow(props) {
  const { title, type, date, paymentMethod, index, arrLength, value } = props;
  const textColor = useColorModeValue("gray.700", "white.300");
  const bgIconColor = useColorModeValue("white.300", "gray.700");

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
      <Flex direction="column" h="100%" alignItems={'center'} >
          <Box
              borderRadius="50%"
              color={
                  type === 'receive'? "green.400" : "red.400"
              }
              border="1px solid"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="50px"
              h={index !== arrLength - 1? "100px" : "50px"}
          >
              <Icon as={type === 'receive' || (paymentMethod === 'racer' && price < 0) ? FaArrowDown : FaArrowUp} />
          </Box>
          {
              index !== arrLength - 1 ?
              <Box
                  w="2px"
                  marginTop={'7px'}
                  bg="gray.200"
                  h={index === arrLength - 1 ? "15px" : "100%"}
              ></Box> : false
          }
      </Flex>

      <Flex direction="column" justifyContent="flex-start" h="100%" marginLeft={3}>
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {title}, {formatNumberToMoney(value)}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {moment(date).format('DD/MM/YYYY')}
        </Text>
      </Flex>
    </Flex>
  );
}

export default TimelineRow;
