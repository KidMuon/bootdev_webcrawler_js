function normalizeURL(url) {
	const url_obj = new URL(url);
	return `${url_obj.hostname}${url_obj.pathname}`.replace(/\/$/g, '');
}

export {normalizeURL};