/**
 * Utility function to create DOM elements
 */
const createDomElement = ( options ) => {

	'use strict';

	const element = document.createElement( options.element );

	// Set text content for each new element
	if( options.text ) {
		element.textContent = options.text;
	}

	if( options.classNames ) {
		element.setAttribute( 'class', options.classNames );
	}

	if( options.attrs ) {
		for ( const [key, value] of Object.entries( options.attrs ) ) {
			element.setAttribute( key, value );
		}
	}

	return element;

};

export default createDomElement;
