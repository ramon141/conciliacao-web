/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer() {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        <Text as="span">
          {document.documentElement.dir === "rtl"
            ? ""
            : ""}
        </Text>
        <Link
          // color={linkTeal}
          color="teal.400"
          href="#"
          target="_blank"
        >
          {document.documentElement.dir === "rtl"
            ? ""
            : ""}
        </Link>
        <Link
          // color={linkTeal}
          color="teal.400"
          href="#"
          target="_blank"
        >
          {document.documentElement.dir === "rtl" ? "" : ""}
        </Link>
        {document.documentElement.dir === "rtl"
          ? ""
          : ""}
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="#">
            {document.documentElement.dir === "rtl"
              ? ""
              : ""}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="https://www.simmmple.com">
            {document.documentElement.dir === "rtl" ? "" : ""}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            color="gray.400"
            href="#"
          >
            {document.documentElement.dir === "rtl" ? "" : ""}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color="gray.400"
            href="#"
          >
            {document.documentElement.dir === "rtl" ? "" : ""}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
