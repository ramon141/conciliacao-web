// Chakra imports
import {
  Button, Flex, Grid, Input, InputGroup, InputLeftAddon, InputRightAddon,
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
import React, {useEffect, useState} from "react";
import SpreadsheetImport from "../../../../components/SpreadsheetImport";
import {ImportAPI} from "../../../../api/Import";
import moment from "moment";
import {toast} from "react-toastify";
import {SearchIcon} from "../../../../components/Icons/Icons";
import {AddIcon} from "@chakra-ui/icons";
import ModalRegisterDriver from "../../../../components/ModalRegisterDriver";

const TableDrivers = ({ title, captions, data, updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filtredData, setFiltredData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
      "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
      "gray.800"
  );

  useEffect(() => {
    setFiltredData(data);
  }, [data]);

  const onSubmit = (e) => {
    const drivers = e.validData.filter((i) => i.driverName.toLowerCase() !== 'total');
    ImportAPI.postDrivers(
        moment().startOf('week'),
        moment().endOf('week'),
        drivers
    ).then((response) => {
      toast.success('Dados importados com sucesso!');
      updateData();
    })
  }

  const filter = () => {
    const newData = data.filter((driver) => driver.name.toLowerCase().includes(search.toLowerCase()));
    setFiltredData(newData);
  }

  useEffect(() => {
    if(search !== '')
      filter();
  }, [search]);

  const handleChangeSearch = (e) => {
    if(e.target.value === '')
      setFiltredData(data);

    setSearch(e.target.value)
  }

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px' style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Text fontSize='xl' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Grid
              width={'500px'}
              gap={'15px'}
              templateColumns={{ sm: "1fr 1fr 1fr", lg: "4fr 2fr 0.1fr" }}
          >
              <InputGroup >
                <Input
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder='Nome do Motorista'
                />
                <InputRightAddon cursor={'pointer'} onClick={filter}>
                  <SearchIcon width={'24px'} height={'24px'} />
                </InputRightAddon>
              </InputGroup>

              <Button bg={bgButton} color='white' fontSize='xs' variant='no-hover' onClick={() => setIsOpen(true)}>
                  IMPORTAR TABELA
              </Button>

              <Button bg={bgButton} color='white' fontSize='xs' variant='no-hover' onClick={() => setIsOpenModal(true)}>
                  <AddIcon />
              </Button>
          </Grid>
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
            {filtredData.map((row) => {
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

      <SpreadsheetImport isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} type={'driver'}/>
        <ModalRegisterDriver isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onUpdate={updateData} />
    </Card>
  );
};

export default TableDrivers;
