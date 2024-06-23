function printReport(pages){
    console.log('Starting report of pages found....');
    const sortedPages = sortPages(pages);

    for (let page in sortedPages) {
        const count = sortedPages[page];
        const url = page;
        console.log(`Found ${count} internal link${count > 1 ? 's' : ''} to ${url}`);
    }

    console.log('End of report ....');
}

function sortPages(pages) {
    let maxCount = 0;
    for (let page in pages){
        if (pages[page] > maxCount){
            maxCount = pages[page];
        }
    }

    let sortedPages = {};
    for (let i = maxCount; i > 0; i--){
        let pagesWithCount_i = []
        for (let page in pages){
            if (pages[page] == i){
                pagesWithCount_i.push(page);
            }
        }
        pagesWithCount_i.sort();

        for (let page of pagesWithCount_i){
            sortedPages[page] = pages[page];
        }
    }

    return sortedPages;
}

export { printReport };