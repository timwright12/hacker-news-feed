/**
 * Initialize application with proper ARIA attribtes now that JS is active
 */
const init = () => {
	'use strict';

	const catcher = document.getElementById( 'hn-catcher' );

	catcher.setAttribute( 'aria-atomic', 'false' );
	catcher.setAttribute( 'aria-live', 'polite' );
	catcher.setAttribute( 'aria-relevant', 'additions text' );

};

export default init;
