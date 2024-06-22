import { getURLsFromHTML } from "./crawl.js";

const htmlBody = `
	<html>
    	<body>
        	<a href="/lessons"><span>Go to Boot.dev lessons</span></a>
    	</body>
	</html>
	`;
const baseURL = 'https://boot.dev';

console.log(getURLsFromHTML(htmlBody, baseURL));
