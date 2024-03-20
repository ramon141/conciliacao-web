import {
    Avatar,
    AvatarGroup, Badge,
    Flex,
    Icon,
    Progress,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import {formatNumberToMoney} from "../../utils/formatNumberToMoney";

function DashboardTableRow(props) {
  const { name, totalRace, balance, createdAt } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("red.400", "red.400");


  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {totalRace}
          </Text>
      </Td>
      <Td>
          <Badge
              bg={balance < 0 ? "green.400" : bgStatus}
              color={"white"}
              fontSize="16px"
              p="3px 10px"
              borderRadius="8px"
          >
              {
                  formatNumberToMoney(balance)
              }
          </Badge>
      </Td>
      <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {moment(createdAt).format('DD/MM/YYYY')}
          </Text>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
