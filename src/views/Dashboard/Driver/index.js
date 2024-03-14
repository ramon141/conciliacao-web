// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import TableDrivers from "./components/TableDrivers";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
import {ImportAPI} from "../../../api/Import";

function Driver() {
    const [data, setData] = useState([]);

    useEffect(() => {
        ImportAPI.getDriversActive().then((response) => {
            setData(response.data)
        })
    }, []);

    const updateData = () => {
        ImportAPI.getDriversActive().then((response) => {
            setData(response.data)
        })
    }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <TableDrivers
        title={"Motoristas"}
        captions={["NOME", "TOTAL DE CORRIDAS", "SALDO", "CADASTRADO EM", "REGISTRAR TRANSAÇÃO", "ENVIAR MENSAGEM"]}
        data={data}
        updateData={updateData}
      />
    </Flex>
  );
}

export default Driver;
