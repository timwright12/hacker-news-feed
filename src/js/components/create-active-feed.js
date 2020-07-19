import createDomElement from '../utilities/create-dom-element';

/**
 * Build out the onLine feed with a data call
 */
const createActiveFeed = ( options, data ) => {

	const dataCount = data.hits.length;
	const catcherUL = document.getElementById( 'hn-catcher-ul' );

	// Caching variables, 2 lines just because it was getting long
	let feedItem, feeditemAnchor, title, postUrl, date, dateString, author;
	let feedItemMeta, feedItemTime, createdAt, i;

	// Loop through the results and add them into the DOM
	for ( i = 0; i < dataCount; i = i + 1 ) {

		if( null !== data.hits[i].url ) { // Sometimes the results don't have a URL, so... don't show it

			// Storing the data
			createdAt = data.hits[i].created_at;
			postUrl = data.hits[i].url;
			author = data.hits[i].author;
			title = data.hits[i].title;

			// Setup the Date format for <time> element and visual output
			date = new Date( createdAt );
			dateString = ( ( 8 < date.getMonth() ) ? ( date.getMonth() + 1 ) : ( '0' + ( date.getMonth() + 1 ) ) ) + '/' + ( ( 9 < date.getDate() ) ? date.getDate() : ( '0' + date.getDate() ) ) + '/' + date.getFullYear();

			// Create the new DOM elements we need
			feedItem = createDomElement( {
				element: 'li',
				classNames: 'feed__item mb-1'
			} );

			feeditemAnchor = createDomElement( {
				element: 'a',
				text: title,
				classNames: 'feed__item-anchor',
				attrs: {
					href: postUrl
				}
			} );

			feedItemMeta = createDomElement( {
				element: 'div',
				text: ` by ${author} on `,
				classNames: 'feed__item-meta'
			} );

			feedItemTime = createDomElement( {
				element: 'time',
				text: dateString,
				attrs: {
					datetime: createdAt
				}
			} );

			// Set up any attribtes we need on the new DOM elements
			catcherUL.setAttribute( 'data-current-page', options.page );

			// Build out the DOM
			feedItemMeta.appendChild( feedItemTime );
			feedItem.appendChild( feedItemMeta );
			feedItem.prepend( feeditemAnchor );
			catcherUL.appendChild( feedItem );

			// When new items load in you can set focus to the first one to
			// help keyboard users and screenreaders catch the new data
			if( 0 === i && true === options.setFocus ) {
				feeditemAnchor.focus();
			}

		} // if URL

	} // for()

};

export default createActiveFeed;
