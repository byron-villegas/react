import { Selector } from 'testcafe';

fixture('Footer Navigation Tests')
.page('http://localhost:3000');

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

test('Home is active', async t => {
    const homeLink = xPathSelector('(//a[@href="/" and normalize-space(text())="HOME"])[1]');
    await t.expect(homeLink.hasClass('text-white')).ok('Home link should be active');
});

test('Users is active', async t => {
    await t.navigateTo('http://localhost:3000/users');

    const usersLink = xPathSelector('//a[@href="/users" and normalize-space(text())="USERS"]');
    await t.expect(usersLink.hasClass('text-white')).ok('Users link should be active');
});

test('About is active', async t => {
    await t.navigateTo('http://localhost:3000/about');

    const aboutLink = xPathSelector('//a[@href="/about" and normalize-space(text())="ABOUT"]');
    await t.expect(aboutLink.hasClass('text-white')).ok('About link should be active');
});