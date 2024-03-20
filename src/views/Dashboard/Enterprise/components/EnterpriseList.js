// Chakra imports
import {
  Button,
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
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React, {useState} from "react";
import SpreadsheetImport from "../../../../components/SpreadsheetImport";
import {ImportAPI} from "../../../../api/Import";
import moment from "moment/moment";
import {toast} from "react-toastify";

const EnterpriseList = ({ title, captions, data, updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
      "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
      "gray.800"
  );

  const onSubmit = (e) => {
    const enterprises = e.validData.filter((i) => i.enterpriseName.toLowerCase() !== 'total');
    ImportAPI.postEnterprises(
        moment().startOf('week'),
        moment().endOf('week'),
        enterprises
    ).then((response) => {
      toast.success('Dados importados com sucesso!');
      updateData();
    })
  }

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px' style={{ justifyContent: 'space-between' }}>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
          {title}
        </Text>
        <Button bg={bgButton} color='white' fontSize='xs' variant='no-hover' onClick={() => setIsOpen(true)}>
          IMPORTAR TABELA
        </Button>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
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
                <TablesTableRow
                  key={row.name}
                  id={row.id}
                  name={row.name}
                  totalRace={row.totalRace}
                  phone={row.phone}
                  balance={row.balance}
                  createdAt={row.createdAt}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>

      <SpreadsheetImport isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} type={'enterprise'}/>
    </Card>
  );
};

export default EnterpriseList;
