// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import EnterpriseList from "./components/EnterpriseList";
import {ImportAPI} from "../../../api/Import";

function Enterprise() {

    const [data, setData] = useState([]);

    useEffect(() => {
        ImportAPI.getEnterprisesActive().then((response) => {
            setData(response.data)
        })
    }, []);

    const updateData = () => {
        ImportAPI.getEnterprisesActive().then((response) => {
            setData(response.data)
        })
    }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <EnterpriseList
        title={"Empresa"}
        captions={["NOME", "TELEFONE", "SALDO", "CRIADO EM", "REGISTRAR TRANSAÇÃO", "ENVIAR MENSAGEM"]}
        data={data}
        updateData={updateData}
      />
    </Flex>
  );
}

export default Enterprise;
