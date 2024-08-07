// https://docs.cypress.io/guides/getting-started/opening-the-app
// https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
// This is a pretty weird testing library- first you have to run "cypress open" in order to
// run this cypress GUI- from there you can try to interactively work with your tests until 
// it's working. After your tests are the way you'd like, you use "cypress run" in order
// to have the headless version of the test running for continuous integration
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})