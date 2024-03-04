// Chakra imports
import { Button, Flex, FormControl, FormLabel, Icon, Input, Link, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ProfileInformation = ({
  title,
  description,
  name,
  mobile,
  email,
  location,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <FormControl>
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            E-mail
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            type='email'
            placeholder='exemplo@gmail.com'
            mb='24px'
            size='lg'
          />
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Telefone
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            type='text'
            placeholder='(99) 99999-9999'
            mb='24px'
          />
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Senha
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            type='password'
            placeholder='********'
            mb='24px'
            size='lg'
          />
          <Button
            type='submit'
            bg='teal.300'
            fontSize='10px'
            color='white'
            fontWeight='bold'
            w='100%'
            h='45'
            mb='24px'
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}>
            EDITAR
          </Button>
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
