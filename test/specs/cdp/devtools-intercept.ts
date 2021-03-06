// This test only works with devtools config

import Home from 'src/wdio/home.page';

describe('my test', () => {
    it('can use puppeteer', () => {
        // WebDriver command - normal wdio logo
        Home.open();

        // switch to Puppeteer to intercept requests
        const puppeteerBrowser = browser.getPuppeteer();
        browser.call( async () => {
            const page = (await puppeteerBrowser.pages())[0];
            await page.setRequestInterception(true);
            page.on('request', (interceptedRequest) => {
                (async () => {
                    if (interceptedRequest.url().endsWith('webdriverio.png')) {
                        return (await interceptedRequest.continue({
                            url: 'https://webdriver.io/img/puppeteer.png',
                        }));
                    }
                    await interceptedRequest.continue();
                });
            });
        });

        // continue with WebDriver commands - wdio logo is replaced with puppeteer logo
        Home.open();
    });
});
