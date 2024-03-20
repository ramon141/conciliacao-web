import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {PhoneIcon, VerifyIcon} from "../Icons/Icons";


const Phone = ({value, onChange, ...props}) => {
    const mask = '(99) 99999-9999';

    return (
        <InputMask mask={mask} value={value} onChange={onChange}>
        {(inputProps) =>
            <InputGroup>
                <InputLeftElement pointerEvents='none' marginTop={1}>
                    <PhoneIcon color='green.300' />
                </InputLeftElement>

                <Input
                    fontSize='sm'
                    placeholder='Telefone'
                    size='sm'
                    height={50}
                    {...props}
                    {...inputProps}
                />
            </InputGroup>
        }
        </InputMask>
    );
}

export default Phone;