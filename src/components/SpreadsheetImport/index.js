import React, { useState } from 'react'
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { pt_BR } from './import-pt-br';
import {fieldsDriver, fieldsEnterprise} from './fieldsDriver';

const SpreadsheetImport = ({isOpen, setIsOpen, onSubmit, type}) => {

    const onClose = (e) => {
        setIsOpen(false)
    }

    return (
        <ReactSpreadsheetImport
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            fields={type === 'driver' ? fieldsDriver : fieldsEnterprise}
            translations={pt_BR}
        />
    )
}

export default SpreadsheetImport;
