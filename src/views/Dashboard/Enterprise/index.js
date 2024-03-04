// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

function Enterprise() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Empresa"}
        captions={["NOME", "TOTAL DE CORRIDAS", "SALDO", "CRIADO EM", "REGISTRAR TRANSAÇÃO", "ENVIAR MENSAGEM"]}
        data={tablesTableData}
      />
    </Flex>
  );
}

export default Enterprise;
