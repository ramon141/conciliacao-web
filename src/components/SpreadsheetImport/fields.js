export const fields = [
    {
        label: "Motorista",
        key: "driverName",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "João",
        validations: [
            {
                rule: "required",
                errorMessage: "Nome é necessário",
                level: "error"
            }
        ]
    },
    {
        label: "Corridas",
        key: "callsTotal",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "10",
        validations: [
            {
                rule: "required",
                errorMessage: "Corridas é necessário",
                level: "error"
            }
        ]
    },
    {
        label: "Faturado",
        key: "faturado",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "10",
        validations: [
            {
                rule: "required",
                errorMessage: "Faturado é necessário",
                level: "error"
            }
        ]
    },
    {
        label: "Faturado (Porcentagem)",
        key: "faturadoPorcentagem",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "10",
        validations: [
            {
                rule: "required",
                errorMessage: "Faturado (%) é necessário",
                level: "error"
            }
        ]
    },
    {
        label: "Ganhos Presenciais",
        key: "ganhosPresenciais",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "10",
        validations: [
            {
                rule: "required",
                errorMessage: "Ganhos Presenciais é necessário",
                level: "error"
            }
        ]
    },
    {
        label: "Ganhos Presenciais (%)",
        key: "ganhosPresenciaisPorcentagem",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "10",
        validations: [
            {
                rule: "required",
                errorMessage: "Ganhos Presenciais (%) é necessário",
                level: "error"
            }
        ]
    },
    {
        label: "Total",
        key: "total",
        // alternateMatches: ["first name", "first"],
        fieldType: {
            type: "input"
        },
        example: "10",
        validations: [
            {
                rule: "required",
                errorMessage: "Total é necessário",
                level: "error"
            }
        ]
    },
]