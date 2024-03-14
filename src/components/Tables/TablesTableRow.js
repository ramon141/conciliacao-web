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
import {PenIcon, WalletIcon} from "components/Icons/Icons";
import { MessageIcon } from "components/Icons/Icons";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {useLocation} from "react-router-dom";

function TablesTableRow(props) {
  const history = useHistory();

  const { name, phone, totalRace, balance, createdAt } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("red.400", "red.400");
  const colorStatus = useColorModeValue("white", "gray.400");
  const walletIcon = useColorModeValue("green.400", "gray.200");
  const { path } = useLocation();

  const balanceFormatted = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(balance));

  const handleEdit = () => {
    const type = location.href.split('/').pop();
    history.push(`/admin/profile/${name}/${type}`);
  }

  const createLinkWhats = () => {
    const message =
        `Olá ${name.trim()}, você ${balance > 0? 'deve pagar' : 'irá receber'}  ${balanceFormatted} referente ao sistema Juma.`;

    const messageEncoded = window.encodeURIComponent(message);

    return `https://wa.me/55${phone}?text=${messageEncoded}`;
  }

  const linkWhatsApp = createLinkWhats();

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
              <PenIcon
                  style={{cursor: 'pointer', marginTop: -10}}
                  color={walletIcon}
                  w="20px"
                  h="20px"
                  me="40px"
                  onClick={handleEdit}
              />
            </Text>
            <div >

            </div>
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
          bg={balance < 0 ? "green.400" : bgStatus}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {
            balanceFormatted
          }
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {moment(createdAt).format('DD/MM/YYYY')}
        </Text>
      </Td>
      <Td style={{ textAlign: 'center' }}>
        <Button p="0px" bg="transparent" variant="no-hover" onClick={() => history.push(`/admin/transaction/${name}/driver`)}>
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
          href={linkWhatsApp}
        >
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            <MessageIcon
                color={walletIcon}
                w="40px"
                h="30px"
                me="40px"
            />
          </Text>
        </Link>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
