export function validateAddress(value) {
    return /^[a-zA-Z-\s']+,\s[a-zA-Z]{1,3}$/.test(value);
}
