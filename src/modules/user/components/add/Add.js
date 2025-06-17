import { useCallback, useEffect, useState } from "react";
import Core from '../../../core';

function Add() {
    const [form, setForm] = useState({
        rut: {
            value: '',
            required: true,
            pattern: /\d{1,3}(?:\.\d{3}){2}-[0-9kK]$/,
            minLength: 11,
            maxLength: 12,
            errors: []
        },
        nombres: {
            value: '',
            required: true,
            pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
            minLength: 3,
            maxLength: 50,
            errors: []
        },
        apellidos: {
            value: '',
            required: true,
            pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
            minLength: 3,
            maxLength: 50,
            errors: []
        },
        fechaNacimiento: {
            value: '',
            required: true,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
            minLength: 10,
            maxLength: 10,
            errors: []
        },
        edad: {
            value: 0,
            valid: false,
            required: false,
            pattern: /^\d+$/,
            min: 1,
            max: 120,
            errors: []
        },
        sexo: {
            value: '',
            valid: false,
            required: true,
            pattern: /^(M|F)$/,
            errors: []
        },
        saldo: {
            value: 0,
            valid: false,
            required: true,
            pattern: /^\d+$/,
            min: 1,
            max: 999999999,
            errors: []
        },
    });

    const validateRut = (field) => {
        let rut = field.value.replace(/[^0-9kK]/g, '').toUpperCase();

        if (rut.length < 8) {
            return { valid: false, errors: [] };
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

        return { valid: dv === dvEsperado, errors: dv !== dvEsperado ? ['El RUT ingresado es inválido.'] : [] };
    }

    const formatRut = (value) => {
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

    const validateField = (fieldName, field) => {
        let errors = [];

        if (fieldName === 'rut') {
            let rutValidation = validateRut(field);
            if (!rutValidation.valid) {
                errors.push(...rutValidation.errors);
            }
        }

        if (field.required && String(field.value).trim() === '') {
            errors.push('El campo es obligatorio.');
        }

        if (field.pattern && !field.pattern.test(field.value)) {
            errors.push(`Debe cumplir con el formato requerido ${field.pattern.toString()}.`);
        }

        if (field.minLength && String(field.value).length < field.minLength) {
            errors.push(`El largo minimo es ${field.minLength}.`);
        }

        if (field.maxLength && String(field.value).length > field.maxLength) {
            errors.push(`El largo maximo es ${field.maxLength}.`);
        }

        if (field.min && parseInt(String(field.value)) < field.min) {
            errors.push(`El valor minimo es ${field.min}.`);
        }

        if (field.max && parseInt(String(field.value)) > field.max) {
            errors.push(`El valor maximo es ${field.max}.`);
        }

        let valid = errors.length === 0;

        return { valid: valid, errors: errors };
    }

    const validateForm = useCallback(() => {
        let isValid = true;
        let updatedForm = { ...form };

        for (let key in updatedForm) {
            if (updatedForm.hasOwnProperty(key)) {
                let field = updatedForm[key];
                let validations = validateField(key, field);
                field.valid = validations.valid;
                field.errors = validations.errors;

                if (!field.valid) {
                    isValid = false;
                }
            }
        }

        setForm(updatedForm);
        return isValid;
    }, []);

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const handleValueChange = (e) => {
        const { id, value } = e.target;

        let fieldName = id.toUpperCase().includes('SEXO') ? 'sexo' : id;

        let field = form[fieldName];

        console.log(fieldName, field);

        let formatedValue = value;

        if (id === 'rut') {
            formatedValue = formatRut(value);
        }

        if (id === 'fechaNacimiento') {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            let edadField = form.edad;

            edadField.valid = true;

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                edadField.value = age - 1;
            } else {
                edadField.value = age;
            }

            let edadValidations = validateField(fieldName, field);

            edadField.valid = edadValidations.valid;
            edadField.errors = edadValidations.errors;

            setForm({ ...form, edad: edadField });
        }

        if (id === 'sexoM' || id === 'sexoF') {
            formatedValue = id === 'sexoM' ? 'M' : 'F';

            if (!e.target.checked) {
                formatedValue = '';
            }
        }

        field.value = formatedValue;

        let validations = validateField(fieldName, field);

        field.valid = validations.valid;
        field.errors = validations.errors;

        setForm({ ...form, field });
    }

    const processForm = () => {
        let isValid = validateForm();

        if (isValid) {
            let user = {
                rut: form.rut.value,
                nombres: form.nombres.value,
                apellidos: form.apellidos.value,
                fechaNacimiento: form.fechaNacimiento.value,
                edad: form.edad.value,
                sexo: form.sexo.value,
                saldo: form.saldo.value
            };
            Core.UserService.saveUser(user);
        }
    }

    return (
        <div className="">
            <h3 className="text-white">Add User</h3>
            <form onSubmit={processForm}>
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label text-white">RUT</label>
                    <input
                        type="text"
                        className={"form-control" + (form.rut.valid ? '' : ' is-invalid')}
                        id="rut"
                        minLength={form.rut.minLength}
                        maxLength={form.rut.maxLength}
                        value={form.rut.value}
                        required={form.rut.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.rut.errors && form.rut.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label text-white">Nombres</label>
                    <input
                        type="text"
                        className={"form-control" + (form.nombres.valid ? '' : ' is-invalid')}
                        id="nombres"
                        minLength={form.nombres.minLength}
                        maxLength={form.nombres.maxLength}
                        value={form.nombres.value}
                        required={form.nombres.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.nombres.errors && form.nombres.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label text-white">Apellidos</label>
                    <input
                        type="text"
                        className={"form-control" + (form.apellidos.valid ? '' : ' is-invalid')}
                        id="apellidos"
                        minLength={form.apellidos.minLength}
                        maxLength={form.apellidos.maxLength}
                        value={form.apellidos.value}
                        required={form.apellidos.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.apellidos.errors && form.apellidos.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className={"form-control" + (form.fechaNacimiento.valid ? '' : ' is-invalid')}
                        id="fechaNacimiento"
                        min="1900-01-01"
                        value={form.fechaNacimiento.value}
                        required={form.fechaNacimiento.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fechaNacimiento.errors && form.fechaNacimiento.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label text-white">Edad</label>
                    <input
                        type="number"
                        className={"form-control" + (form.edad.valid ? '' : ' is-invalid')}
                        id="edad"
                        required={form.edad.required}
                        min={form.edad.min}
                        max={form.edad.max}
                        value={form.edad.value}
                        readOnly
                    />
                    <span className="text-danger">
                        {form.edad.errors && form.edad.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Sexo</label>
                    <br />
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoM"
                        required={form.sexo.required && form.sexo.value === ''}
                        value={form.sexo.value}
                        checked={form.sexo.value === 'M'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1 me-2" htmlFor="sexoM">Masculino</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoF"
                        required={form.sexo.required && form.sexo.value === ''}
                        value={form.sexo.value}
                        checked={form.sexo.value === 'F'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1" htmlFor="sexoF">Femenino</label>
                    <span className="text-danger">
                        {form.sexo.errors && form.sexo.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="saldo" className="form-label text-white">Saldo</label>
                    <input
                        type="number"
                        className={"form-control" + (form.saldo.valid ? '' : ' is-invalid')}
                        id="saldo"
                        required={form.saldo.required}
                        min={form.saldo.min}
                        max={form.saldo.max}
                        value={form.saldo.value}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.saldo.errors && form.saldo.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default Add;