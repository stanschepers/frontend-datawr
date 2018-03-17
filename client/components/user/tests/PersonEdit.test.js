import { Selector, ClientFunction } from "testcafe";

// See: http://devexpress.github.io/testcafe/documentation/test-api/obtaining-data-from-the-client.html#executing-client-functions
const getWindowLocation = ClientFunction(() => window.location.href);

fixture`Example 1: Home page`.page`https://sardless.com/`;

test("Name is displayed", async test => {
    const latestReviews = await Selector(".home__review-container");
    const count = await latestReviews.count;
    await test.expect(count).eql(6);
});

// test("The review cards ratings are between 0 and 10", async t => {
//     const latestReviews = await Selector(".home__review-container");
//     const count = await latestReviews.count;
//     for (let i = 0; i < count; i++) {
//         const card = latestReviews.nth(0);
//         const rating = parseInt(await card.find(".rating").innerText, 10);
//         await t.expect(isNaN(rating)).notOk();
//         await t.expect(rating).gte(0);
//         await t.expect(rating).lte(10);
//     }
// });
//
// test("Clicking a review card takes you to the review", async t => {
//     const latestReviews = await Selector(".home__review-container");
//     const readButton = await latestReviews.nth(0).find(".md-button");
//     await t.click(readButton);
//     await t.expect(getWindowLocation()).match(/sardless.com\/reviews\/\d+/);
// });