export function formatPhoneNumber(number) {
    // Remove all non-digit characters
    var digits = number.replace(/\D/g, '');

    // Format as (XX) XXXX-XXXX or (XX) XXXXX-XXXX
    var formatted;
    if (digits.length === 10) {
        // Landline phone format
        formatted = digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (digits.length === 11) {
        // Mobile phone format
        formatted = digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
        // Return the original string if it doesn't have the correct number of digits
        return number;
    }

    return formatted;
}