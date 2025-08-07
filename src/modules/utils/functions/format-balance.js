
const formatBalance = (value) => {
    let numberValue = Number(value) || 0;
    return `$${numberValue.toLocaleString('es-CL')}`;
}

export default formatBalance;