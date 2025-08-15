
const balance = (value) => {
    let numberValue = Number(value) || 0;
    return `$${numberValue.toLocaleString('es-CL')}`;
}

const Format = { balance };

export default Format;