import { useCallback, useEffect, useState } from "react";
import Core from '../../../core';

function Add() {
    const [form, setForm] = useState({
        fields: {
            rut: {
                value: '',
                valid: false,
                required: true,
                pattern: /\d{1,3}(?:\.\d{3}){2}-[0-9kK]$/,
                minLength: 11,
                maxLength: 12,
                errors: []
            },
            nombres: {
                value: '',
                valid: false,
                required: true,
                pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
                minLength: 3,
                maxLength: 50,
                errors: []
            },
            apellidos: {
                value: '',
                valid: false,
                required: true,
                pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
                minLength: 3,
                maxLength: 50,
                errors: []
            },
            fechaNacimiento: {
                value: '',
                valid: false,
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
            }
        },
        valid: false
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

        for (let key in updatedForm.fields) {
            if (updatedForm.fields.hasOwnProperty(key)) {
                let field = updatedForm.fields[key];
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

    const reset = () => {
        let updatedForm = { ...form };

        for (let key in updatedForm.fields) {
            if (updatedForm.fields.hasOwnProperty(key)) {
                let field = updatedForm.fields[key];
                field.value = '';
                field.valid = false;
                field.errors = [];
            }
        }

        setForm(updatedForm);
    }

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const handleValueChange = (e) => {
        const { id, value } = e.target;

        let fieldName = id.toUpperCase().includes('SEXO') ? 'sexo' : id;

        let field = form.fields[fieldName];

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

            let edadField = form.fields.edad;

            edadField.valid = true;

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                edadField.value = age - 1;
            } else {
                edadField.value = age;
            }

            let edadValidations = validateField('edad', edadField);

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

        form.valid = Object.values(form.fields).every(field => field.valid);

        setForm({
            ...form,
            fields: {
                ...form.fields,
                [fieldName]: field
            }
        });
    }

    const processForm = () => {
        let isValid = validateForm();

        if (isValid) {
            let user = {
                rut: form.fields.rut.value,
                nombres: form.fields.nombres.value,
                apellidos: form.fields.apellidos.value,
                fechaNacimiento: form.fields.fechaNacimiento.value,
                edad: form.fields.edad.value,
                sexo: form.fields.sexo.value,
                saldo: form.fields.saldo.value
            };
            Core.UserService.saveUser(user);
        }
    }

    return (
        <div>
            <h3 className="text-white">Add User</h3>
            <form onSubmit={processForm}>
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label text-white">RUT</label>
                    <input
                        type="text"
                        className={"form-control" + (form.fields.rut.valid ? '' : ' is-invalid')}
                        id="rut"
                        minLength={form.fields.rut.minLength}
                        maxLength={form.fields.rut.maxLength}
                        value={form.fields.rut.value}
                        required={form.fields.rut.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fields.rut.errors && form.fields.rut.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label text-white">Nombres</label>
                    <input
                        type="text"
                        className={"form-control" + (form.fields.nombres.valid ? '' : ' is-invalid')}
                        id="nombres"
                        minLength={form.fields.nombres.minLength}
                        maxLength={form.fields.nombres.maxLength}
                        value={form.fields.nombres.value}
                        required={form.fields.nombres.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fields.nombres.errors && form.fields.nombres.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label text-white">Apellidos</label>
                    <input
                        type="text"
                        className={"form-control" + (form.fields.apellidos.valid ? '' : ' is-invalid')}
                        id="apellidos"
                        minLength={form.fields.apellidos.minLength}
                        maxLength={form.fields.apellidos.maxLength}
                        value={form.fields.apellidos.value}
                        required={form.fields.apellidos.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fields.apellidos.errors && form.fields.apellidos.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className={"form-control" + (form.fields.fechaNacimiento.valid ? '' : ' is-invalid')}
                        id="fechaNacimiento"
                        min="1900-01-01"
                        value={form.fields.fechaNacimiento.value}
                        required={form.fields.fechaNacimiento.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fields.fechaNacimiento.errors && form.fields.fechaNacimiento.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label text-white">Edad</label>
                    <input
                        type="number"
                        className={"form-control" + (form.fields.edad.valid ? '' : ' is-invalid')}
                        id="edad"
                        required={form.fields.edad.required}
                        min={form.fields.edad.min}
                        max={form.fields.edad.max}
                        value={form.fields.edad.value}
                        readOnly
                    />
                    <span className="text-danger">
                        {form.fields.edad.errors && form.fields.edad.errors.map((error, index) => (
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
                        required={form.fields.sexo.required && form.fields.sexo.value === ''}
                        value={form.fields.sexo.value}
                        checked={form.fields.sexo.value === 'M'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1 me-2" htmlFor="sexoM">Masculino</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoF"
                        required={form.fields.sexo.required && form.fields.sexo.value === ''}
                        value={form.fields.sexo.value}
                        checked={form.fields.sexo.value === 'F'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1" htmlFor="sexoF">Femenino</label>
                    <span className="text-danger">
                        {form.fields.sexo.errors && form.fields.sexo.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="saldo" className="form-label text-white">Saldo</label>
                    <input
                        type="number"
                        className={"form-control" + (form.fields.saldo.valid ? '' : ' is-invalid')}
                        id="saldo"
                        required={form.fields.saldo.required}
                        min={form.fields.saldo.min}
                        max={form.fields.saldo.max}
                        value={form.fields.saldo.value}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fields.saldo.errors && form.fields.saldo.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <button type="submit" disabled={!form.valid} className="btn btn-primary">Enviar</button>
                <button type="reset" className="btn btn-secondary ms-2" onClick={reset}>Limpiar</button>
            </form>
        </div>
    );
}

export default Add;