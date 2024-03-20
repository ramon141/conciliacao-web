// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import React, {useState} from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import {ImportAPI} from "../../../../api/Import";
import moment from "moment/moment";
import {toast} from "react-toastify";

const Projects = ({ title, amount, captions, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useColorModeValue("gray.700", "white");



  return (
    <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='12px 0px 28px 0px'>
        <CardHeader p='6px 0px 22px 0px' style={{ justifyContent: 'space-between' }}>
          <Text fontSize='xl' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button color='white' fontSize='xs' variant='no-hover' onClick={() => setIsOpen(true)}>
            IMPORTAR TABELA
          </Button>
        </CardHeader>
      </CardHeader>
      <Table variant='simple' color={textColor}>
        <Thead>
          <Tr my='.8rem' ps='0px'>
            {captions.map((caption, idx) => {
              return (
                <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => {
            return (
              <DashboardTableRow
                  key={row.name}
                  name={row.name}
                  totalRace={row.totalRace}
                  balance={row.balance}
                  createdAt={row.createdAt}
              />
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Projects;
