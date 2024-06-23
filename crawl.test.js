import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('Normalize https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
	expect(normalizeURL("https://blog.boot.dev/path/")).toBe("https://blog.boot.dev/path");
})

test('Normalize https://blog.boot.dev/path to blog.boot.dev/path', () => {
	expect(normalizeURL("https://blog.boot.dev/path ")).toBe("https://blog.boot.dev/path");
})

test('Normalize http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
	expect(normalizeURL("http://blog.boot.dev/path/")).toBe("http://blog.boot.dev/path");
})

test('Normalize http://blog.boot.dev/path to blog.boot.dev/path', () => {
	expect(normalizeURL("http://blog.boot.dev/path")).toBe("http://blog.boot.dev/path");
})

test('Absolute URLs remain as Absolute URLs', () => {
	const htmlBody = `
	<html>
    	<body>
        	<a href="https://primeagen.com/lessons"><span>Go to primeagen lessons</span></a>
    	</body>
	</html>
	`;
	const baseURL = 'https://boot.dev';
	const expected = ['https://primeagen.com/lessons'];
	expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expected);
})

test('Relative URLs are converted to Absolute URLs', () => {
	const htmlBody = `
	<html>
    	<body>
        	<a href="/lessons"><span>Go to Boot.dev lessons</span></a>
    	</body>
	</html>
	`;
	const baseURL = 'https://boot.dev';
	const expected = ['https://boot.dev/lessons'];
	expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expected);
})

test('All anchor elements are found in HTML', () => {
	const htmlBody = `
	<html>
    	<body>
        	<a href="/lessons1"><span>Go to Boot.dev lessons1</span></a>
			<a href="/lessons2"><span>Go to Boot.dev lessons2</span></a>
			<a href="/lessons3"><span>Go to Boot.dev lessons3</span></a>
			<a href="/lessons4"><span>Go to Boot.dev lessons4</span></a>
			<a href="/lessons5"><span>Go to Boot.dev lessons5</span></a>
			<a href="/lessons6"><span>Go to Boot.dev lessons6</span></a>
    	</body>
	</html>
	`;
	const baseURL = 'https://boot.dev';
	const result = getURLsFromHTML(htmlBody, baseURL).length
	const expected = 6;
	expect(result).toEqual(expected);
})