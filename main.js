import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

function getBaseURLFromArguments() {
	const NUMBER_OF_ARGUMENTS = process.argv.length;

	if (NUMBER_OF_ARGUMENTS > 3) {
		console.log('ERROR: Too Many Arguments Passed.');
		process.exitCode = 9;
		return;
	} else if (NUMBER_OF_ARGUMENTS <= 2) {
		console.log('ERROR: No Base URL provided.');
		process.exitCode = 9;
		return;
	}

	return process.argv[2];
}

async function main() {
	const baseURL = getBaseURLFromArguments();
	if (!baseURL) {
		return;
	}

	console.log(`Starting crawl of ${baseURL}`);
	const pages = await crawlPage(baseURL);

	printReport(pages);

	return
}

await main();