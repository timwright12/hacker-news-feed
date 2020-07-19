import createActiveFeed from './create-active-feed';

/**
 * Build the live data feed
 */
const fetchDataLive = ( options ) => {
	'use strict';

	const url = `${options.url}&page=${options.page}`;
	const catcher = document.getElementById( 'hn-catcher' );
	const catcherUL = document.getElementById( 'hn-catcher-ul' );

	fetch( url, {
		method: 'get',
	} ).then( function( response ) {

		// Set ARIA state to bust while the Ajax call starts
		catcher.setAttribute( 'aria-busy', 'true' );

		return response.json(); // pass the data as promise to next then block

	} ).then( function( data ) {

		// Add this initial data into localStorage for offline use
		localStorage.setItem( 'offlineData', JSON.stringify( data ) );

		// Remove the presenation role from the UL, since we have items now.
		catcherUL.removeAttribute( 'role' );

		// Create the feed output
		createActiveFeed( options,  data );

		// Ajax call is complete, remove the busy state
		catcher.setAttribute( 'aria-busy', 'false' );

	} ).catch( function( error ) {

		console.error( 'Request failed', error );

	} );

};

export default fetchDataLive;
