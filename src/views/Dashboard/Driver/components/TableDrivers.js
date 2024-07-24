// Chakra imports
import {
  Button,
  Grid,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
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
import React, { useEffect, useState } from "react";
import SpreadsheetImport from "../../../../components/SpreadsheetImport";
import { ImportAPI } from "../../../../api/Import";
import moment from "moment";
import { toast } from "react-toastify";
import { SearchIcon } from "../../../../components/Icons/Icons";
import { AddIcon } from "@chakra-ui/icons";
import ModalRegisterDriver from "../../../../components/ModalRegisterDriver";

const TableDrivers = ({ title, captions, data, updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
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

  const onSubmit = ({ data, start, end }) => {
    const driversWithoutTotal = data.filter(
      (i) => i.driverName.toLowerCase() !== "total"
    );
    const drivers = driversWithoutTotal.map((i) => ({
      ...i,
      total: parseFloat(i.total.toFixed(2)),
    }));

    toast.promise(
      ImportAPI.postDrivers(start, end, drivers).then(() => {
        toast.success("Dados importados com sucesso!");
        updateData();
      }),
      {
        pending: "Enviando Dados...",
        success: "Dados importados com sucesso!",
        error: "Erro ao importar dados",
      }
    );
  };

  const isValid = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) return false;

    const captions = [
      "driverName",
      "callsTotal",
      "faturado",
      "faturadoPorcentagem",
      "ganhosPresenciais",
      "ganhosPresenciaisPorcentagem",
      "total",
    ];

    return Object.keys(data[0]).join("") === captions.join("");
  };

  const filter = () => {
    const newData = data.filter((driver) => {
      let nameIsValid = true,
        typeIsValid = true;

      if (search !== "")
        nameIsValid = driver.name.toLowerCase().includes(search.toLowerCase());
      if (type !== "") {
        if (type === "a_pagar") typeIsValid = driver.balance > 0;
        else if (type === "a_receber") typeIsValid = driver.balance < 0;
      }

      return nameIsValid && typeIsValid;
    });

    setFiltredData(newData);
  };

  useEffect(() => {
    filter();
  }, [search, type]);

  const handleChangeSearch = (e) => {
    if (e.target.value === "") setFiltredData(data);

    setSearch(e.target.value);
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        p="6px 0px 22px 0px"
        style={{ justifyContent: "space-between", flexWrap: "wrap" }}
      >
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Grid
          width={"700px"}
          gap={"15px"}
          templateColumns={{
            base: "1fr 1fr",
            sm: "2fr 1fr 1fr 0.3fr",
            lg: "4fr 2fr 2fr  0.1fr",
          }}
        >
          <InputGroup>
            <Input
              value={search}
              onChange={handleChangeSearch}
              placeholder="Nome do Motorista"
            />
            <InputRightAddon cursor={"pointer"} onClick={filter}>
              <SearchIcon width={"24px"} height={"24px"} />
            </InputRightAddon>
          </InputGroup>

          <Select
            placeholder="Sem Filtro..."
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="a_pagar">A pagar</option>
            <option value="a_receber">A receber</option>
          </Select>

          <Button
            bg={bgButton}
            color="white"
            fontSize="xs"
            variant="no-hover"
            onClick={() => setIsOpen(true)}
          >
            IMPORTAR TABELA
          </Button>

          <Button
            bg={bgButton}
            color="white"
            fontSize="xs"
            variant="no-hover"
            onClick={() => setIsOpenModal(true)}
          >
            <AddIcon />
          </Button>
        </Grid>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
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
                  type={"driver"}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>

      <SpreadsheetImport
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
        isValid={isValid}
      />
      <ModalRegisterDriver
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onUpdate={updateData}
      />
    </Card>
  );
};

export default TableDrivers;
