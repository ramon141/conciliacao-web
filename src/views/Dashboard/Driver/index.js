// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

function Driver() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Motoristas"}
        captions={["Author", "Function", "Status", "Employed", ""]}
        data={tablesTableData}
      />
    </Flex>
  );
}

export default Driver;
