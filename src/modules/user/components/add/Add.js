import { useState } from "react";

function Add() {
    const [form, setForm] = useState({
        rut: {
            value: '',
            valid: false,
        },
        nombres: {
            value: '',
            valid: false,
        },
        apellidos: {
            value: '',
            valid: false,
        },
        fechaNacimiento: {
            value: '',
            valid: false,
        },
        edad: 0,
        sexo: {
            value: '',
            valid: false,
        },
    });

    const validarRut = (e) => {
        let formatedRut = formatRut(e);
        let rut = formatedRut.replace(/[^0-9kK]/g, '').toUpperCase();

        if (rut.length < 8) {
            setForm({ ...form, rut: { value: formatedRut, valid: false } });
            return;
        }

        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        let dvEsperado = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

        setForm({ ...form, rut: { value: formatedRut, valid: dv === dvEsperado } });
    }

    const formatRut = (e) => {
        const { value } = e.target;
        const cleanedValue = value.replace(/[^0-9kK]/g, '').toUpperCase();

        if (cleanedValue.length < 2) {
            return cleanedValue;
        }

        let parteNumerica = parseInt(cleanedValue.substring(0, cleanedValue.length - 1));
        let dv = cleanedValue[cleanedValue.length - 1];
        let rut = parteNumerica.toLocaleString('es-CL') + '-' + dv;

        console.log(`Formatted RUT: ${rut}`);

        return rut;
    }

    const handleValueChange = (e) => {
        const { id, value } = e.target;

        console.log(`ID: ${id}, Value: ${value}`);

        switch (id) {
            case 'fechaNacimiento':
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    setForm({ ...form, fechaNacimiento: { value: value }, edad: age - 1 });
                } else {
                    setForm({ ...form, fechaNacimiento: { value: value }, edad: age });
                }

                break;
            case 'sexoM':
                if (!e.target.checked) {
                    setForm({ ...form, sexo: { value: '' } });
                    return;
                }

                setForm({ ...form, sexo: { value: 'M' } });
                break;
            case 'sexoF':
                if (!e.target.checked) {
                    setForm({ ...form, sexo: { value: '' } });
                    return;
                }

                setForm({ ...form, sexo: { value: 'F' } });
                break;
            default:
                setForm({ ...form, [id]: { value: value } });
                break;
        }
    }

    return (
        <div className="">
            <h3 className="text-white">Add User</h3>
            <form>
                <div className="mb-3">
                    <input
                        type="text"
                        className={"form-control" + (form.rut.valid ? '' : ' is-invalid')}
                        id="rut"
                        maxLength="12"
                        value={form.rut.value}
                        required
                        onChange={(e) => {
                            validarRut(e);
                        }}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label text-white">Nombres</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        maxLength="50"
                        value={form.nombres.value}
                        required
                        onChange={handleValueChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label text-white">Apellidos</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        maxLength="50"
                        value={form.apellidos.value}
                        required
                        onChange={handleValueChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fechaNacimiento"
                        min="1900-01-01"
                        value={form.fechaNacimiento.value}
                        required
                        onChange={handleValueChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label text-white">Edad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        min="0"
                        max="120"
                        value={form.edad !== 0 ? form.edad : ''}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Sexo</label>
                    <br />
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoM"
                        value={form.sexo.value}
                        checked={form.sexo.value === 'M'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1 me-2" htmlFor="sexoM">Masculino</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoF"
                        value={form.sexo.value}
                        checked={form.sexo.value === 'F'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1" htmlFor="sexoF">Femenino</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Add;