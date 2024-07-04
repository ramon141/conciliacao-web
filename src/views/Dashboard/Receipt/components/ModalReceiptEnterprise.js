import {
    Button, FormControl,
    FormLabel, Input, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react";
// Custom components
import CPFCNPJ from "../../../../components/InputMaks/CPFCNPJ";
import Phone from "../../../../components/InputMaks/Phone";
import { useState } from "react";
import { EnterpriseReceiptAPI } from "api/EnterpriseReceipt";
import { toast } from "react-toastify";


export default function ModalReceiptEnterprise({ isOpen, onClose }) {

    const [name, setName] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = () => {
        EnterpriseReceiptAPI.post({
            name,
            cnpj_cpf: cpfCnpj,
            phone: phone.replace(/[^\d]+/g, '')
        })
            .then((response) => {
                toast.success('Receita adicionada com sucesso!');
                clearFields();
                onClose();
            })
            .catch((response) => {
                toast.error('Erro ao adicionar receita');
            })
    }

    const clearFields = () => {
        setName('');
        setCpfCnpj('');
        setPhone('');
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Empresa para Recibo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            value={name}
                            height={50}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>CPF/CNPJ</FormLabel>
                        <CPFCNPJ
                            value={cpfCnpj}
                            height={50}
                            onChange={(e) => setCpfCnpj(e.target.value)}
                            placeholder="CPF/CNPJ"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Telefone</FormLabel>
                        <Phone
                            height={50}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Telefone"
                        />
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} variant="ghost">
                        Fechar
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}