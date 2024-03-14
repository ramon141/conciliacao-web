import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {VerifyIcon} from "../Icons/Icons";


const CPFCNPJ = ({value, onChange, ...props}) => {

    const [type, setType] = useState(!value || value.replace(/\D/g, '').length <= 11 ? 'cpf' : 'cnpj');
    const mask = type === 'cnpj' ? '99.999.999/9999-99' : '999.999.999-999';

    const [isInvalid, setIsInvalid] = useState(false);


    function isValidCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0, remainder;
        for (let i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    function isValidCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj.length !== 14) return false;

        if (/^(\d)\1{13}$/.test(cnpj)) return false;

        let length = cnpj.length - 2
        let numbers = cnpj.substring(0, length);
        const digits = cnpj.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(0)) return false;

        length = length + 1;
        numbers = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(1)) return false;

        return true;
    }

    const handleChange = (e) => {
        const quantCharacters = e.target.value.replace(/[^\d]+/g, '').length;
        if(quantCharacters > 0)
          setIsInvalid(type === 'cpf'? !isValidCPF(e.target.value) : !isValidCNPJ(e.target.value))
        else
            setIsInvalid(false);

        if(value.replace(/[^\d]+/g, '').length === 11)
            setType('cnpj');
        else if(value.replace(/[^\d]+/g, '').length >= 12 && quantCharacters <= 11)
            setType('cpf');


        onChange(e);
    }

    return (
        <InputMask mask={mask} value={value} onChange={handleChange}>
        {(inputProps) =>
            <InputGroup>
                <InputLeftElement pointerEvents='none' marginTop={1}>
                    <VerifyIcon color='green.300' />
                </InputLeftElement>

                <Input
                    fontSize='sm'
                    placeholder='CPF/CNPJ'
                    size='sm'
                    errorBorderColor="red.300"
                    isInvalid={isInvalid}
                    {...props}
                    {...inputProps}
                />
            </InputGroup>
        }
        </InputMask>
    );
}

export default CPFCNPJ;