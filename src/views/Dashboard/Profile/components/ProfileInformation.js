// Chakra imports
import { Button, Flex, FormControl, FormLabel, Icon, Input, Link, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { DriverAPI } from "../../../../api/Driver";
import { toast } from "react-toastify";
import Phone from "../../../../components/InputMaks/Phone";
import { EnterpriseAPI } from "../../../../api/Enterprise";

const ProfileInformation = ({
  title,
  name,
  email,
  setEmail,
  phone,
  setPhone,
  type,
  id
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  console.log(name, id);

  const handleSubmit = (e) => {
    const data = {
      email: email || undefined,
      phone: phone.replace(/[^\d]+/g, '')
    };

    if (type === 'driver') {
      DriverAPI.patch(name, data).then((response) => {
        toast.success('Usuário atualizado com sucesso!');
      })
    } else if (type === 'enterprise') {
      EnterpriseAPI.patch(name, data).then((response) => {
        toast.success('Empresa atualizada com sucesso!');
      })
    }
  }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Telefone
          </FormLabel>
          <Phone
            height={50}
            min="1"
            value={phone}
            placeholder='(99) 99999-9999'
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            mb='24px'
            onChange={(e) => setPhone(e.target.value)}
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
            }}
            onClick={handleSubmit}
          >
            EDITAR
          </Button>
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
