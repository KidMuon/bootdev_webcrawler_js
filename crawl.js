import { JSDOM } from 'jsdom';

function normalizeURL(url) {
	const url_obj = new URL(url);
	return `${url_obj.hostname}${url_obj.pathname}`.replace(/\/$/g, '');
}

function getURLsFromHTML(htmlBody, baseURL) {
	const jsdomObj = new JSDOM(htmlBody);
	let linkArray = [];
	for (let element of jsdomObj.window.document.querySelectorAll('a')) {
		if (element.href.startsWith('/')) {
			linkArray.push(`${baseURL}${element.href}`);
		} else {
			linkArray.push(`${element.href}`);
		}
	}

	return linkArray;
}

async function crawlPage(pageURL) {
	const response = await fetch(pageURL);
	
	if (response.status >= 400) {
		console.log(`Error: HTTP code ${response.status} returned from ${pageURL}`);
		return;
	} else if (!response.headers.get('content-type').includes('text/html')) {
		console.log('Error: Content-type is not text/html.');
	}

	console.log(await response.text());

	return;
}

export {normalizeURL, getURLsFromHTML, crawlPage};