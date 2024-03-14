export const formatNumberToMoney = (value, useAbs = true) => {
    const absValue = Math.abs(value).toLocaleString('pt-br', {minimumFractionDigits: 2});

    return "R$ " + (useAbs || value >= 0 ? "" : "-") + absValue;
};