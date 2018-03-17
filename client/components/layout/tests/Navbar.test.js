import { Selector, ClientFunction } from "testcafe";

// See: http://devexpress.github.io/testcafe/documentation/test-api/obtaining-data-from-the-client.html#executing-client-functions
const getWindowLocation = ClientFunction(() => window.location.href);

fixture`Example 1: Home page`.page`http://localhost:8080`;

test("Click on home stays home", async t => {
    const links = await Selector(".fa-home");
    // const readButton = await links.nth(4);
    await t.click(links);
    await t.expect(getWindowLocation()).match(/\//);
});

test("Click on database goes to data/all", async t => {
    const links = await Selector(".fa-database");
    // const readButton = await links.nth(4);
    await t.click(links);
    await t.expect(getWindowLocation()).match(/\/data\/all/);
});

test("Click on profile goes to /profile", async t => {
    const links = await Selector(".fa-user");
    // const readButton = await links.nth(4);
    await t.click(links);
    await t.expect(getWindowLocation()).match(/\/profile/);
});

test("Click on favourites stays home", async t => {
    const links = await Selector(".fa-heart");
    // const readButton = await links.nth(4);
    await t.click(links);
    await t.expect(getWindowLocation()).match(/\//);
});

test("Click on settings stays home", async t => {
    const links = await Selector(".fa-gear");
    // const readButton = await links.nth(4);
    await t.click(links);
    await t.expect(getWindowLocation()).match(/\//);
});