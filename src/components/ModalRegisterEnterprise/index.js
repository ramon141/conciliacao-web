import {
    Button,
    FormControl, FormLabel, Grid, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select, Tooltip
} from "@chakra-ui/react";
import React, {useState} from "react";
import Phone from "../InputMaks/Phone";
import Money from "../InputMaks/Money";
import {QuestionIcon} from "../Icons/Icons";
import {toast} from "react-toastify";
import moment from "moment";
import {EnterpriseAPI} from "../../api/Enterprise";

export default function ModalRegisterEnterprise({isOpen, onClose, onUpdate}) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [totalRacer, setTotalRacer] = useState('');
    const [balance, setBalance] = useState('');
    const [type, setType] = useState('');

    const submit = () => {
        const data = {
            name: name,
            totalRace: parseFloat(totalRacer),
            balance: parseFloat(type === 'devendo'? balance : -balance),
            phone: phone.replace(/[^\d]+/g, ''),
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
        };

        EnterpriseAPI.post(data)
            .then(() => {
                toast.success('Empresa cadastrado com sucesso!');
                onClose();
                clear();
                onUpdate();
            })
            .catch((err) => {
                const message = err.response?.data?.error?.message ||  'Um erro desconhecido ocorreu'
                toast.error(message);
                console.error(err);
            })
    }

    const clear = () => {
        setName('');
        setPhone('');
        setTotalRacer('');
        setBalance('');
        setType('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Cadastro de Empresas</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Grid>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='Nome'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Telefone</FormLabel>
                            <Phone value={phone} onChange={e => setPhone(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>
                                <Tooltip label="Coloque 0 se não souber a quantidade correta" aria-label='A tooltip'>
                                    <div style={{width: 'fit-content'}}>
                                        Total de Corridas
                                        {" "}
                                        <QuestionIcon style={{marginTop: '-2px'}} />
                                    </div>
                                </Tooltip>
                            </FormLabel>
                            <Input
                                type={'number'}
                                placeholder='10'
                                value={totalRacer}
                                onChange={e => setTotalRacer(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Saldo</FormLabel>
                            <Money
                                height={50}
                                min="1"
                                value={balance}
                                onChange={e => setBalance(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Tipo</FormLabel>
                            <Select
                                placeholder='Clique aqui para selecionar'
                                height={50}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value='devendo'>Estou devendo</option>
                                <option value='para_receber'>Ele me deve</option>
                            </Select>
                        </FormControl>
                    </Grid>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={submit}>
                        Cadastrar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}