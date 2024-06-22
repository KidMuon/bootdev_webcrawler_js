import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	const url_obj = new URL(url);
	return `${url_obj.hostname}${url_obj.pathname}`.replace(/\/$/g, '');
}

function getURLsFromHTML(htmlBody, baseURL) {
	const jsdomObj = new JSDOM(htmlBody);
	let linkArray = [];
	for (let element of jsdomObj.window.document.querySelectorAll('a')) {
		if (element.href.startsWith('/')) {
			linkArray.push(`${baseURL}${element.href}`)
		} else {
			linkArray.push(`${element.href}`)
		}
	}

	return linkArray
}

export {normalizeURL, getURLsFromHTML};