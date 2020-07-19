import fetchDataLive from './fetch-data-live';
import fetchDataOffline from './fetch-data-offline';

/**
 * Build the initial feed
 */
const buildFeed = ( options ) => {
	'use strict';

	// Using Chrome's navigator in the inverse so non-support will still try the Ajax call
	if ( ! navigator.onLine ) {
		// If the user is offline, try and get older localStorage data
		fetchDataOffline( options );
	} else {
		// If the user is online, get fresh data
		fetchDataLive( options );
	}

};

export default buildFeed;
