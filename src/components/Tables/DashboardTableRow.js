import {
  Avatar,
  AvatarGroup,
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

function DashboardTableRow(props) {
  const { name, totalRace, balance, createdAt } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} h={"24px"} w={"24px"} pe="5px" />
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
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {balance}
        </Text>
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
