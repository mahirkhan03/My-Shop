function formatToIndianCurrency(amount) {
    if (isNaN(amount)) return 'Invalid amount';

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(amount);
}

export { formatToIndianCurrency };