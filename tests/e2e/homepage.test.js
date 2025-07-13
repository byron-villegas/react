import { Selector } from 'testcafe';

fixture('Homepage')
.page('http://localhost:3000');

test('has React title', async t => {
    const pageTitle = await Selector('title').innerText;
    await t.expect(pageTitle).eql('React');
});