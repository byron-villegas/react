import { Selector } from 'testcafe';

fixture('Navbar Navigation Tests')
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
    const homeLink = xPathSelector('//a[@href="/" and normalize-space(text())="Home"]');
    await t.expect(homeLink.hasClass('active')).ok('Home link should be active');
});

test('Users is active', async t => {
    await t.navigateTo('http://localhost:3000/users');

    const usersLink = xPathSelector('//a[@href="/users" and normalize-space(text())="Users"]');
    await t.expect(usersLink.hasClass('active')).ok('Users link should be active');
});

test('About is active', async t => {
    await t.navigateTo('http://localhost:3000/about');

    const aboutLink = xPathSelector('//a[@href="/about" and normalize-space(text())="About"]');
    await t.expect(aboutLink.hasClass('active')).ok('About link should be active');
});