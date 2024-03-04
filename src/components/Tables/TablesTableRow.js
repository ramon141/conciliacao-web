import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  Link,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { WalletIcon } from "components/Icons/Icons";
import { MessageIcon } from "components/Icons/Icons";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TablesTableRow(props) {
  const history = useHistory();

  const { name, phone, totalRace, balance, createdAt, id } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("red.400", "red.400");
  const colorStatus = useColorModeValue("white", "gray.400");
  const walletIcon = useColorModeValue("green.400", "gray.200");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {phone}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {totalRace}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={balance > 0 ? "green.400" : bgStatus}
          color={balance < 0 ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {balance}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {moment(createdAt).format('DD/MM/YYYY')}
        </Text>
      </Td>
      <Td style={{ textAlign: 'center' }}>
        <Button p="0px" bg="transparent" variant="no-hover" onClick={() => history.push(`/admin/transaction`)}>
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
            style={{ textAlign: 'center' }}
          >
            <WalletIcon color={walletIcon} w="40px" h="30px" me="40px" />
          </Text>
        </Button>
      </Td>

      <Td style={{ textAlign: 'center' }}>
        <Link
          p="0px"
          bg="transparent"
          variant="no-hover"
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${phone}`}
        >
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            <MessageIcon color={walletIcon} w="40px" h="30px" me="40px" />
          </Text>
        </Link>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
