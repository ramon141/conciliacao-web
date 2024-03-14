import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spacer,
  Stack, Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { EnterpriseIcon } from "components/Icons/Icons";
import { VerifyIcon } from "components/Icons/Icons";
import { ProfileIcon } from "components/Icons/Icons";
import { WalletIcon } from "components/Icons/Icons";
import moment from "moment";
import React, { useState } from "react";
import CPFCNPJ from "../../../../components/InputMaks/CPFCNPJ";
import Money from "../../../../components/InputMaks/Money";
import Phone from "../../../../components/InputMaks/Phone";
import {TransactionsAPI} from "../../../../api/Transactions";
import {ReceiptAPI} from "../../../../api/Receipt";
import {toast} from "react-toastify";
import {CashAPI} from "../../../../api/Cash";

const ReceiptRegister = ({ title, onUpdate }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "teal.300",
    "teal.300"
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [typeReceipt, setTypeReceipt] = useState('product');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [money, setMoney] = useState('');
  const [registerTransaction, setRegisterTransaction] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [typeTransfer, setTypeTransfer] = useState('');

  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    try {
      let transaction = {};

      if(registerTransaction) {
        const dataTransaction = {
          value: parseFloat(money),
          payment_method: paymentMethod,
          input_or_output: typeTransfer,
          date: moment(date).toISOString()
        };

        transaction = await CashAPI.post(dataTransaction);
      }

      const dataReceipt = {
        name,
        cpfcnpj: cpfCnpj.replace(/[^\d]+/g, ''),
        phone: phone.replace(/[^\d]+/g, ''),
        date: moment(date).toISOString(),
        payment_method: paymentMethod,
        type: typeReceipt,
        description,
        product,
        quantity: quantity? parseFloat(quantity) : undefined,
        total: parseFloat(money),
        transactionId: transaction.id
      };

      const receipt = await ReceiptAPI.post(dataReceipt);
      toast.success('Cadastrado com sucesso!');
      //clearFields();
    } catch(e) {
      toast.error('O sistema apresentou um erro desconhecido');
    }

    onUpdate();
  }

  const clearFields = () => {
    setName('');
    setPhone('');
    setTypeReceipt('produto');
    setDate(moment().format('YYYY-MM-DD'));
    setCpfCnpj('');
    setMoney('');
    setRegisterTransaction(false);
    setPaymentMethod('');
    setTypeTransfer('');
    setProduct('');
    setQuantity('');
    setDescription('');
  }


  return (
    <Card p='16px' mt='24px'>
      <CardHeader>
        <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' marginBottom={10}>
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>

        <Flex
          direction={'column'}
          align='center'
          w='100%'
          justify='center'>

          <Flex
            align='center'
            w='100%'
            justify='flex-start'
            wrap={'wrap'}
          >
            <span style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Dados do Destinatárioss
            </span>
            <hr style={{ width: '100%', height: '10px' }} />
          </Flex>

          <Grid
            direction={{ sm: "column", md: "row" }}
            align='center'
            w='100%'
            justify='center'
            py='1rem'
            style={{ paddingTop: 0 }}
            templateColumns={{
              sm: "1fr",
              md: "1fr",
              xl: "1fr 1fr 1fr",
            }}
            gap='26px'
          >
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Nome/Empresa
              </FormLabel>
              <Stack spacing={4} width={'100%'}>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' marginTop={1}>
                    <ProfileIcon color='green.300' />
                  </InputLeftElement>
                  <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      height={50}
                      min="1"
                      type="text"
                      placeholder='Nome'
                  />
                </InputGroup>
              </Stack>
            </FormControl>


            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                CPF/CNPJ
              </FormLabel>
              <Stack spacing={4} width={'100%'}>
                <CPFCNPJ
                    height={50}
                    min="1"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                />
              </Stack>
            </FormControl>

            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Telefone
              </FormLabel>
              <Stack spacing={4} width={'100%'}>
                <Phone
                    height={50}
                    min="1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
              </Stack>
            </FormControl>


          </Grid>

          <Flex
            align='center'
            w='100%'
            justify='flex-start'
            wrap={'wrap'}
          >
            <span style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Geral
            </span>
            <hr style={{ width: '100%', height: '10px' }} />
          </Flex>

          <Grid
            direction={{ sm: "column", md: "row" }}
            align='center'
            w='100%'
            justify='center'
            py='1rem'
            style={{ paddingTop: 0 }}
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              xl: "2fr 2fr 1fr 1fr",
            }}
            gap='26px'
          >
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Data
              </FormLabel>
              <Stack spacing={4} width={'100%'}>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' marginTop={1}>
                    <WalletIcon color='green.300' />
                  </InputLeftElement>
                  <Input
                    height={50}
                    min="1"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    placeholder='Valor'
                  />
                </InputGroup>
              </Stack>
            </FormControl>

            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Meio de Pagamento
              </FormLabel>
              <Select
                  placeholder='Clique aqui para selecionar'
                  height={50}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value='pix'>Pix</option>
                <option value='especie'>Espécie</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Tipo de Transferência
              </FormLabel>
              <Select
                  placeholder='Clique aqui para selecionar'
                  height={50}
                  value={typeTransfer}
                  onChange={(e) => setTypeTransfer(e.target.value)}
              >
                <option value='output'>Pagando</option>
                <option value='input'>Recebendo</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel ms='4px' marginBottom={0} fontSize='sm' fontWeight='regular'>
                Registrar como transação de caixa?
              </FormLabel>
              <Switch
                  value={registerTransaction}
                  onChange={(e) => setRegisterTransaction(e.target.checked)}
              />
            </FormControl>
          </Grid>



          <Flex
            align='center'
            w='100%'
            justify='flex-start'
            wrap={'wrap'}
          >
            <span style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Bens e Serviço
            </span>
            <hr style={{ width: '100%', height: '10px' }} />
          </Flex>

          <Grid
            direction={{ sm: "column", md: "row" }}
            align='center'
            w='100%'
            justify='center'
            py='1rem'
            style={{ paddingTop: 0 }}
            templateColumns={{
              sm: "1fr",
              md: "1fr",
              xl: typeReceipt === 'produto' ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr",
            }}
            gap='26px'
          >
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Tipo
              </FormLabel>
              <Select placeholder='Clique aqui para selecionar' height={50} onChange={(e) => setTypeReceipt(e.target.value)}>
                <option value='servico'>Serviço</option>
                <option value='produto'>Produto</option>
              </Select>
            </FormControl>


            {typeReceipt === 'produto' ?
              <>
                <FormControl>
                  <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                    Produto
                  </FormLabel>
                  <Stack spacing={4} width={'100%'}>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' marginTop={1}>
                        <ProfileIcon color='green.300' />
                      </InputLeftElement>
                      <Input
                          height={50}
                          min="1"
                          type="text"
                          placeholder='Produto'
                          value={product}
                          onChange={(e) => setProduct(e.target.value)}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                    Quantidade
                  </FormLabel>
                  <Stack spacing={4} width={'100%'}>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' marginTop={1}>
                        <VerifyIcon color='green.300' />
                      </InputLeftElement>
                      <Input
                          height={50}
                          min="1"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder='Quantidade'
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
              </>
              :
              <FormControl>
                <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                  Descrição
                </FormLabel>
                <Stack spacing={4} width={'100%'}>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none' marginTop={1}>
                      <ProfileIcon color='green.300' />
                    </InputLeftElement>
                    <Input
                        height={50}
                        min="1"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Descrição'
                    />
                  </InputGroup>
                </Stack>
              </FormControl>
            }

            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='regular'>
                Total
              </FormLabel>
              <Stack spacing={4} width={'100%'}>
                <Money
                    height={50}
                    min="1"
                    value={money}
                    onChange={(e) => setMoney(e.target.value)}
                />
              </Stack>
            </FormControl>
          </Grid>

          <Flex
              align='center'
              w='100%'
              justify='center'
              wrap={'wrap'}
              my={1}
          >
            <Button height={50} bg={bgButton} color='white' fontSize='xs' variant='no-hover' onClick={handleSubmit}>
              EMITIR RECIBO
            </Button>
          </Flex>
          </Flex>



      </CardBody>
    </Card>
  );
};

export default ReceiptRegister;
