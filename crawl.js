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
		return pages;
	}
	
	pages[currentURL] = 1;

	const urlsOnPage = await fetchURLsFromPage(currentURL);
	
	if (!urlsOnPage) {
		return pages;
	}

	for (let url of urlsOnPage) {
		pages = await crawlPage(baseURL, url, pages);
	}

	return pages;
}

async function fetchURLsFromPage(currentURL) {
	let response
	try{
		response = await fetch(currentURL);
	} catch (err) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	
	if (response.status >= 400) {
		console.log(`Error: HTTP code ${response.status} returned from ${currentURL}`);
		return;
	} else if (!response.headers.get('content-type').includes('text/html')) {
		console.log('Error: Content-type is not text/html.');
		return;
	}

	return getURLsFromHTML(await response.text(), currentURL);
}

export {normalizeURL, getURLsFromHTML, crawlPage};