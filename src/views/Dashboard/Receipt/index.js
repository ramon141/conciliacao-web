// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React, { useEffect, useState } from "react";
import { FaPaypal, FaWallet } from "react-icons/fa";
import {
  invoicesData,
} from "variables/general";

import Invoices from "./components/Invoices";
import ReceiptRegister from "./components/ReceiptRegister";
import PaymentStatistics from "./components/PaymentStatistics";
import { ReceiptAPI } from "../../../api/Receipt";

function Receipt() {

  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    ReceiptAPI.get()
      .then((response) => {
        setReceipts(response.data);
      });
  }, []);

  const update = () => {
    ReceiptAPI.get()
      .then((response) => {
        setReceipts(response.data);
      });
  }


  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} templateRows='1fr'>
        <Box>
          <ReceiptRegister
            title={"Emitir Recibo"}
            onUpdate={update}
          />
        </Box>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }} style={{ gap: 24 }}>
        <Invoices
          title={"Recibos"}
          data={receipts}
        />
      </Grid>
    </Flex>
  );
}

export default Receipt;
