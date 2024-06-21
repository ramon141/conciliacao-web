import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input, Center, Box, Text, FormControl, FormLabel
} from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import moment from 'moment';

const SpreadsheetImport = ({ isOpen, setIsOpen, onSubmit }) => {
    const [startDate, setStartDate] = useState(moment().startOf('week').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().endOf('week').format('YYYY-MM-DD'));
    const [file, setFile] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };


    const handleSubmit = () => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            onSubmit({
                start: startDate,
                end: endDate,
                data: json
            });

            onClose();
        };

        reader.readAsArrayBuffer(file);
    }

    const onClose = () => setIsOpen(false);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (files && files[0]) {
            console.log(files[0])
            setFile(files[0]);
        }
    };

    const handleClick = () => {
        // Quando o box for clicado, simula um clique no input de arquivo
        fileInputRef.current.click();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Envie seu arquivo</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Data de início</FormLabel>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Data de fim</FormLabel>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Importar tabela</FormLabel>
                        <Center
                            p={6}
                            border="3px dashed"
                            borderColor="gray.300"
                            borderRadius="md"
                            _hover={{ borderColor: 'blue.300' }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            transition="border-color 0.2s"
                            mt={4}
                            onClick={handleClick} // Adiciona o manipulador de clique aqui
                        >
                            <Input
                                ref={fileInputRef} // Usa a referência aqui
                                type="file"
                                accept=".xlsx, .xls"
                                size="lg"
                                style={{ display: 'none' }}
                                id="file-upload"
                                onChange={handleFileUpload} // Certifique-se de manipular a mudança aqui também
                            />
                            <Box textAlign="center">
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <FaFileExcel size="40px" color="#4A90E2" />
                                </div>

                                {file && file.name ?
                                    <Text mt={2}>{file.name}</Text>
                                    :
                                    <>
                                        <Text mt={2}>Arraste e solte ou</Text>
                                        <Text mb={2}>clique para selecionar um arquivo</Text>
                                    </>
                                }
                            </Box>
                        </Center>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Fechar</Button>
                    <Button
                        colorScheme='green'
                        style={{ marginLeft: '10px' }}
                        onClick={handleSubmit}
                    >
                        Importar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default SpreadsheetImport;