import buildFeed from './build-feed';

/**
 * Set up infinite scroll for the page
 */
const infiniteScroll = () => {

	'use strict';

	let scheduledAnimationFrame;

	/**
	 * Setting the animationFrame state
	 */
	function readAndUpdatePage(){
		scheduledAnimationFrame = false;
	}

	/**
	 * Check to see if we're all the bottom of the page. Normally a great use of
	 * and intersectionObserver, but in this case bottom of the page was fine.
	 */
	function atBottomCheck () {

		if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) {

			const currentPage = document.getElementById( 'hn-catcher-ul' ).getAttribute( 'data-current-page' );

			// Set ARIA state to bust while the Ajax call starts
			document.getElementById( 'hn-catcher-ul' ).setAttribute( 'aria-busy', 'true' );

			// Build out the feed with new items and set focus
			buildFeed( {
				url: 'https://hn.algolia.com/api/v1/search_by_date?tags=story',
				page: Number( currentPage ) + 1,
				setFocus: true
			} );

		}

		// If we called it, don't call it again
		if ( scheduledAnimationFrame ){
			return;
		}

		scheduledAnimationFrame = true;
		requestAnimationFrame( readAndUpdatePage );
	}

	// Online do this if we're online (no sense in Ajax calling here if we're offline)
	if ( navigator.onLine ) {
		// Using requestAnimationFrame here instead of a classic debounce to save code
		window.addEventListener( 'scroll', atBottomCheck );
	}

};

export default infiniteScroll;
