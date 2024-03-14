import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {VerifyIcon, WalletIcon} from "../Icons/Icons";


const Money = ({value, onChange, ...props}) => {
    const [isInvalid, setIsInvalid] = useState(false);

    function isValid(value) {
        return parseFloat(value) >= 1 || value.length === 0;
    }

    const onBlur = (e) => {
        e.target.value = parseFloat(e.target.value).toFixed(2);
        setIsInvalid(!isValid(e.target.value));
        onChange(e);
    }

    return (
        <InputGroup>
            <InputLeftElement pointerEvents='none' marginTop={1}>
                <WalletIcon color='green.300' />
            </InputLeftElement>

            <Input
                fontSize='sm'
                placeholder='Valor'
                size='sm'
                type={'number'}
                errorBorderColor="red.300"
                isInvalid={isInvalid}
                onBlur={onBlur}
                onChange={onChange}
                {...props}
            />
        </InputGroup>
    );
}

export default Money;