/**
 * Imports
 */
import init from './js/utilities/init';
import buildFeed from './js/components/build-feed';
import infiniteScroll from './js/components/infinite-scroll';

/**
 * Execute functions and methods on DOM ready
 */

document.addEventListener( 'DOMContentLoaded', () => {

	// Initialize UI
	init();

	// Build the Feed
	buildFeed( {
		url: 'https://hn.algolia.com/api/v1/search_by_date?tags=story',
		page: '1',
		setFocus: false
	} );

	// Activate infinite scroll
	infiniteScroll();

} );
