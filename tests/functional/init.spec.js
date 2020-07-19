import puppeteer from 'puppeteer';

const APP = 'http://localhost:3000';
const width = 1440;
const height = 860;

let page;
let browser;

beforeAll( async () => {

	browser = await puppeteer.launch( {
		headless: true,
	} );

	page = await browser.newPage();

	await page.setViewport( {
		width,
		height
	} );

} );

describe( 'Check UI Set Up', () => {

	test( 'Initial ARIA Roles', async () => {

		// Visit the page in headless Chrome
		await page.goto( APP );

		// Evaluate the page and check for proper ARIA roles
		const checkBanner = await page.evaluate( () => {
			return document.querySelector( '#banner' ).getAttribute( 'role' );
		} );

		const checkMain = await page.evaluate( () => {
			return document.querySelector( '#main' ).getAttribute( 'role' );
		} );

		// Run the actual checks
		await expect( checkBanner ).toBe( 'banner' );
		await expect( checkMain ).toBe( 'main' );

	} );

	test( 'Initial ARIA States', async () => {

		// Visit the page in headless Chrome
		await page.goto( APP );

		// Evaluate the page and check for proper ARIA states
		const checkCatcherAtomic = await page.evaluate( () => {
			return document.querySelector( '#hn-catcher' ).getAttribute( 'aria-atomic' );
		} );

		const checkCatcherLive = await page.evaluate( () => {
			return document.querySelector( '#hn-catcher' ).getAttribute( 'aria-live' );
		} );

		const checkCatcherRelevent = await page.evaluate( () => {
			return document.querySelector( '#hn-catcher' ).getAttribute( 'aria-relevant' );
		} );

		// Run the actual checks
		await expect( checkCatcherAtomic ).toBe( 'false' );
		await expect( checkCatcherLive ).toBe( 'polite' );
		await expect( checkCatcherRelevent ).toBe( 'additions text' );

	} );

} );

afterAll( () => {
	browser.close();
} );
