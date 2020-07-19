import createActiveFeed from './create-active-feed';
import createDomElement from '../utilities/create-dom-element';

/**
 * Try to fetch local data if we're offline
 */
const fetchDataOffline = ( options ) => {

	// Get the data from localStorage
	const retrievedObject = localStorage.getItem( 'offlineData' );
	const catcher = document.getElementById( 'hn-catcher' );
	let data, offlineAlert;

	// If we have localStorage data, use it.
	if( null !== retrievedObject ) {

		data = JSON.parse( retrievedObject );

		// Build out the feed from localStorage
		createActiveFeed( options, data );

	} else {

		// Alert the user that there is not data to show
		offlineAlert = createDomElement( {
			element: 'div',
			text: 'Sorry, you\'re offline and we do not have stored data to display at this time.',
			attrs: {
				role: 'alert'
			}
		} );

		// Add alert into the DOM
		catcher.appendChild( offlineAlert );

		// We don't need this UL anymore, so clean it up
		document.getElementById( 'hn-catcher-ul' ).remove();

	}

};

export default fetchDataOffline;
