import { Selector } from 'testcafe';

function calculateAge(value = '') {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 0 || isNaN(age)) {
        age = 0; // Default to 0 if the date is invalid or in the future
    }

    return age;
}

fixture('Users Page Tests')
    .page('http://localhost:3000/users');

const xPathSelector = (xpath) =>
    Selector(() => {
        return document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }, { dependencies: { xpath } });

test('Users is active', async t => {
    const usersLink = xPathSelector('//a[@href="/users" and normalize-space(text())="Users"]');
    await t.expect(usersLink.hasClass('active')).ok('Users link should be active');
});

test('Users details title is visible', async t => {
    const title = xPathSelector('//h1[contains(text(), "User Details")]');
    await t.expect(title.exists).ok('Users details title should be visible');
});

test('Users add title is visible', async t => {
    const title = xPathSelector('//h3[contains(text(), "Add User")]');
    await t.expect(title.exists).ok('Users add title should be visible');
});

test('Users list title is visible', async t => {
    const title = xPathSelector('//h3[contains(text(), "Users")]');
    await t.expect(title.exists).ok('Users list title should be visible');
});

test('User add input fields are visible', async t => {
    const userRutInput = xPathSelector('//input[@id="rut"]');
    const userNombresInput = xPathSelector('//input[@id="nombres"]');
    const userApellidosInput = xPathSelector('//input[@id="apellidos"]');
    const userFechaNacimientoInput = xPathSelector('//input[@id="fechaNacimiento"]');
    const userEdadInput = xPathSelector('//input[@id="edad"]');
    const userSexoMasculinoInput = xPathSelector('//input[@id="sexoM"]');
    const userSexoFemeninoInput = xPathSelector('//input[@id="sexoF"]');
    const userSaldoInput = xPathSelector('//input[@id="saldo"]');

    await t
        .expect(userRutInput.exists).ok('User RUT input should be visible')
        .expect(userNombresInput.exists).ok('User Nombres input should be visible')
        .expect(userApellidosInput.exists).ok('User Apellidos input should be visible')
        .expect(userFechaNacimientoInput.exists).ok('User Fecha Nacimiento input should be visible')
        .expect(userEdadInput.exists).ok('User Edad input should be visible')
        .expect(userSexoMasculinoInput.exists).ok('User Sexo Masculino input should be visible')
        .expect(userSexoFemeninoInput.exists).ok('User Sexo Femenino input should be visible')
        .expect(userSaldoInput.exists).ok('User Saldo input should be visible');
});

test('User add input fields are invalid', async t => {
    const userRutInput = xPathSelector('//input[@id="rut"]');
    const userNombresInput = xPathSelector('//input[@id="nombres"]');
    const userApellidosInput = xPathSelector('//input[@id="apellidos"]');
    const userFechaNacimientoInput = xPathSelector('//input[@id="fechaNacimiento"]');
    const userEdadInput = xPathSelector('//input[@id="edad"]');
    const userSaldoInput = xPathSelector('//input[@id="saldo"]');

    await t
        .expect(userRutInput.hasClass('is-invalid')).ok('User RUT input should be invalid')
        .expect(userNombresInput.hasClass('is-invalid')).ok('User Nombres input should be invalid')
        .expect(userApellidosInput.hasClass('is-invalid')).ok('User Apellidos input should be invalid')
        .expect(userFechaNacimientoInput.hasClass('is-invalid')).ok('User Fecha Nacimiento input should be invalid')
        .expect(userEdadInput.hasClass('is-invalid')).ok('User Edad input should be invalid')
        .expect(userSaldoInput.hasClass('is-invalid')).ok('User Saldo input should be invalid');
});

test('Users add input fields error messages are visible', async t => {
    const userRutInputErrors = xPathSelector('//span[@id="rut-errors"]');
    const userNombresInputErrors = xPathSelector('//span[@id="nombres-errors"]');
    const userApellidosInputErrors = xPathSelector('//span[@id="apellidos-errors"]');
    const userFechaNacimientoInputErrors = xPathSelector('//span[@id="fechaNacimiento-errors"]');
    const userEdadInputErrors = xPathSelector('//span[@id="edad-errors"]');
    const userSexoInputErrors = xPathSelector('//span[@id="sexo-errors"]');
    const userSaldoInputErrors = xPathSelector('//span[@id="saldo-errors"]');

    await t
        .expect(userRutInputErrors.childElementCount).eql(3, 'User RUT input error messages should be visible')
        .expect(userNombresInputErrors.childElementCount).eql(2, 'User Nombres input error messages should be visible')
        .expect(userApellidosInputErrors.childElementCount).eql(2, 'User Apellidos input error messages should be visible')
        .expect(userFechaNacimientoInputErrors.childElementCount).eql(3, 'User Fecha Nacimiento input error messages should be visible')
        .expect(userEdadInputErrors.childElementCount).eql(1, 'User Edad input error messages should be visible')
        .expect(userSexoInputErrors.childElementCount).eql(2, 'User Sexo input error messages should be visible')
        .expect(userSaldoInputErrors.childElementCount).eql(1, 'User Saldo input error messages should be visible');
});

test('Users add input fields are valid', async t => {
    const userRutInput = xPathSelector('//input[@id="rut"]');
    const userNombresInput = xPathSelector('//input[@id="nombres"]');
    const userApellidosInput = xPathSelector('//input[@id="apellidos"]');
    const userFechaNacimientoInput = xPathSelector('//input[@id="fechaNacimiento"]');
    const userEdadInput = xPathSelector('//input[@id="edad"]');
    const userSexoMasculinoInput = xPathSelector('//input[@id="sexoM"]');
    const userSexoFemeninoInput = xPathSelector('//input[@id="sexoF"]');
    const userSaldoInput = xPathSelector('//input[@id="saldo"]');

    const birthDate = '1996-06-22';
    const age = calculateAge(birthDate).toString();

    await t
        .selectText(userSaldoInput) // Selecciona todo el texto actual
        .pressKey('delete');        // Borra el contenido

    await t.typeText(userRutInput, '11111111-1');
    await t.typeText(userNombresInput, 'Juan Carlos');
    await t.typeText(userApellidosInput, 'Bodoque Triviño');
    await t.typeText(userFechaNacimientoInput, birthDate);
    await t.click(userSexoMasculinoInput);

    await t.typeText(userSaldoInput, '100000');

    await t
        .expect(userRutInput.hasClass('is-invalid')).notOk('User RUT input should be valid')
        .expect(userNombresInput.hasClass('is-invalid')).notOk('User Nombres input should be valid')
        .expect(userApellidosInput.hasClass('is-invalid')).notOk('User Apellidos input should be valid')
        .expect(userFechaNacimientoInput.hasClass('is-invalid')).notOk('User Fecha Nacimiento input should be valid')
        .expect(userEdadInput.hasClass('is-invalid')).notOk('User Edad input should be valid')
        .expect(userSexoMasculinoInput.checked).ok('User Sexo Masculino input should be checked')
        .expect(userSexoFemeninoInput.checked).notOk('User Sexo Femenino input should not be checked')
        .expect(userSaldoInput.hasClass('is-invalid')).notOk('User Saldo input should be valid');

    await t
    .expect(userRutInput.value).eql('11.111.111-1', 'User RUT input should be formatted correctly')
    .expect(userNombresInput.value).eql('Juan Carlos', 'User Nombres input should be valid')
    .expect(userApellidosInput.value).eql('Bodoque Triviño', 'User Apellidos input should be valid')
    .expect(userFechaNacimientoInput.value).eql(birthDate, 'User Fecha Nacimiento input should be valid')
    .expect(userEdadInput.value).eql(age, 'User Edad input should be calculated correctly')
    .expect(userSaldoInput.value).eql('100000', 'User Saldo input should be valid');
});

test('Users add create user', async t => {
    const userRutInput = xPathSelector('//input[@id="rut"]');
    const userNombresInput = xPathSelector('//input[@id="nombres"]');
    const userApellidosInput = xPathSelector('//input[@id="apellidos"]');
    const userFechaNacimientoInput = xPathSelector('//input[@id="fechaNacimiento"]');
    const userSexoMasculinoInput = xPathSelector('//input[@id="sexoM"]');
    const userSaldoInput = xPathSelector('//input[@id="saldo"]');
    const submitButton = xPathSelector('//button[@type="submit" and normalize-space(text())="Enviar"]');

    const birthDate = '1996-06-22';

    await t
        .selectText(userSaldoInput) // Selecciona todo el texto actual
        .pressKey('delete');        // Borra el contenido

    await t.typeText(userRutInput, '11111111-1');
    await t.typeText(userNombresInput, 'Juan Carlos');
    await t.typeText(userApellidosInput, 'Bodoque Triviño');
    await t.typeText(userFechaNacimientoInput, birthDate);
    await t.click(userSexoMasculinoInput);
    await t.typeText(userSaldoInput, '100000');

    await t.click(submitButton);

    const usersTable = xPathSelector('//table');
    await t.expect(usersTable.exists).ok('Users table should be visible after creating a user');

    const userId = xPathSelector('//table/tbody/tr[1]/td[1]');
    await t.expect(userId.innerText).eql('1', 'User ID should be 1 after creation');
    
    const userRut = xPathSelector('//table/tbody/tr[1]/td[2]');
    await t.expect(userRut.innerText).eql('11.111.111-1', 'User RUT should be 11.111.111-1 after creation');

    const userNombres = xPathSelector('//table/tbody/tr[1]/td[3]');
    await t.expect(userNombres.innerText).eql('Juan Carlos', 'User Nombres should be Juan Carlos after creation');

    const userApellidos = xPathSelector('//table/tbody/tr[1]/td[4]');
    await t.expect(userApellidos.innerText).eql('Bodoque Triviño', 'User Apellidos should be Bodoque Triviño after creation');

    const userFechaNacimiento = xPathSelector('//table/tbody/tr[1]/td[5]');
    await t.expect(userFechaNacimiento.innerText).eql(birthDate, 'User Fecha Nacimiento should be ' + birthDate + ' after creation');

    const userEdad = xPathSelector('//table/tbody/tr[1]/td[6]');
    const expectedAge = calculateAge(birthDate).toString();

    await t.expect(userEdad.innerText).eql(expectedAge, 'User Edad should be ' + expectedAge + ' after creation');

    const userSexo = xPathSelector('//table/tbody/tr[1]/td[7]');
    await t.expect(userSexo.innerText).eql('M', 'User Sexo should be M after creation');

    const userSaldo = xPathSelector('//table/tbody/tr[1]/td[8]');
    await t.expect(userSaldo.innerText).eql('$100.000', 'User Saldo should be $100.000 after creation');
});


test('Users footer link is active', async t => {
    const footerLink = xPathSelector('//a[@href="/users" and normalize-space(text())="USERS"]');
    await t.expect(footerLink.hasClass('text-white')).ok('Footer link should be active');
});