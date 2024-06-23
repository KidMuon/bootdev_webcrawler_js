import { JSDOM } from 'jsdom';

function normalizeURL(url) {
	const url_obj = new URL(url);
	return `${url_obj.protocol}//${url_obj.hostname}${url_obj.pathname}`.replace(/\/$/g, '');
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

async function crawlPage(baseURL, pageURL = baseURL, pages = {}) {
	if (!pageURL.includes(baseURL)) {
		return pages;
	}

	const currentURL = normalizeURL(pageURL);

	if (pages.hasOwnProperty(currentURL)) {
		pages[currentURL]++;
	} else {
		pages[currentURL] = 1;
	}

	const response = await fetch(currentURL);
	
	if (response.status >= 400) {
		console.log(`Error: HTTP code ${response.status} returned from ${currentURL}`);
		return;
	} else if (!response.headers.get('content-type').includes('text/html')) {
		console.log('Error: Content-type is not text/html.');
	}

	//console.log(await response.text());

	return pages;
}

export {normalizeURL, getURLsFromHTML, crawlPage};