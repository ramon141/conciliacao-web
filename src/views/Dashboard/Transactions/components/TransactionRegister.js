import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { WalletIcon } from "components/Icons/Icons";
import React, { useState } from "react";
import { TransactionsAPI } from "../../../../api/Transactions";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const TransactionRegister = ({ title, onSubmit }) => {
  //Driver or enterprise
  const { type: userTransactionType, id } = useParams();

  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const [value, setValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      value: parseFloat(value),
      payment_method: paymentMethod,
      type,
      date: moment().toISOString()
    };

    if (userTransactionType === 'driver')
      data.driverId = encodeURI(id);
    else if (userTransactionType === 'enterprise')
      data.enterpriseId = encodeURI(id);

    if (type === 'acerto') {
      data.type = 'pay';
      data.payment_method = 'acerto';
    }

    TransactionsAPI.post(data)
      .then((response) => {
        toast.success('Transação cadastrada com sucesso!');
        onSubmit && onSubmit();
      })
      .catch((response) => {
        toast.error('Falha ao cadastrar');
      })

  }

  return (
    <Card p='16px' mt='24px'>
      <CardHeader>
        <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button bg={bgButton} color='white' fontSize='xs' variant='no-hover' type="submit" onClick={handleSubmit}>
            REGISTRAR TRANSAÇÃO
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align='center'
          w='100%'
          justify='center'
          py='1rem'>
          <Flex
            flex={2}
            p='1rem'
            bg='transparent'
            borderRadius='15px'
            width='100%'
            align='center' ci>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Valor
              </FormLabel>
              <Stack spacing={4} width={'100%'}>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' marginTop={1}>
                    <WalletIcon color='green.300' />
                  </InputLeftElement>
                  <Input
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    height={50}
                    min="1"
                    type="number"
                    placeholder='Valor'
                  />
                </InputGroup>
              </Stack>
            </FormControl>
          </Flex>

          <Flex
            flex={1}
            p='16px'
            bg='transparent'
            borderRadius='15px'
            width='100%'
            align='center'>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Tipo de Transação
              </FormLabel>
              <Select
                required
                placeholder='Clique aqui para selecionar'
                height={50}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='receive'>Recebendo</option>
                <option value='pay'>Pagando</option>
                <option value='acerto'>Acerto</option>
              </Select>
            </FormControl>

          </Flex>

          {
            type !== 'acerto' &&
            <Flex
              flex={1}
              p='16px'
              bg='transparent'
              borderRadius='15px'
              width='100%'
              align='center'>
              <FormControl>
                <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                  Meio de Pagamento
                </FormLabel>
                <Select
                  required
                  placeholder='Clique aqui para selecionar'
                  height={50}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value='pix'>Pix</option>
                  <option value='especie'>Espécie</option>
                </Select>
              </FormControl>
            </Flex>
          }
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TransactionRegister;
