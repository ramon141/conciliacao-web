import React, { useState } from 'react'
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { pt_BR } from './import-pt-br';
import { fields } from './fields';

const SpreadsheetImport = ({isOpen, setIsOpen, onSubmit}) => {

    const onClose = (e) => {
        setIsOpen(false)
    }

    return (
        <ReactSpreadsheetImport
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            fields={fields}
            translations={pt_BR}
        />
    )
}

export default SpreadsheetImport;
