// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { UserAPI } from "../../api/User";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  localStorage.clear();

  const submit = (e) => {
    toast.promise(login({ email, password }), {
      pending: "Acessando...",
      success: "Logado com sucesso",
      error: "Credenciais inválidas",
    });
  };

  const login = async (data) => {
    const response = await UserAPI.login(data);
    localStorage.setItem("token", response.data.token);
    history.push("/admin");
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          <br />
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize={30}
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Entrar
          </Text>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Email
          </FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fontSize="sm"
            ms="4px"
            borderRadius="15px"
            type="email"
            placeholder="Seu endereço de e-mail"
            mb="24px"
            size="lg"
          />
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Senha
          </FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fontSize="sm"
            ms="4px"
            borderRadius="15px"
            type="password"
            placeholder="Senha"
            mb="24px"
            size="lg"
          />
          <Button
            onClick={submit}
            type="submit"
            bg="teal.300"
            fontSize="10px"
            color="white"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
          >
            ACESSAR
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
