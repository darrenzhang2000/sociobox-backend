var webdriver = require ('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');


    const webScrapeArticle = socialIssue => {
        By = webdriver.By;
        var driver = new webdriver.Builder()
        .setChromeOptions(new chrome.Options().headless())
        .forBrowser('chrome')
        .build();
        driver.get(`https://www.google.com/`);
        //driver.get(`https://www.sciencedaily.com/search/?keyword=environmental+issues#gsc.tab=0&gsc.q=${socialIssue}&gsc.sort=date`);
        let html = driver.getPageSource()
        console.log(html)

        // let articles = driver.findElements(By.xpath('//div[@class="box"]'))
        // console.log(articles)
        driver.quit()
    }


// const webScrapeArticle = async (socialIssue) => {
//     try {
//         //const URL = `https://www.sciencedaily.com/search/?keyword=environmental+issues#gsc.tab=0&gsc.q=${socialIssue}&gsc.sort=date`
//         // URL = 'https://www.google.com/'
//         // const browser = await puppeteer.launch({headless: true})
//         // const page = await browser.newPage()
//         // await page.waitForSelector

//         // await page.goto(URL)
//         // let bodyHTML = await page.evaluate(() => {
//         //     var x = document.getElementsByClassName('gsc-webResult gsc-result')
//         //     console.log(x)
//         // });
//         // console.log('hi')
//         // console.log(bodyHTML)
//         // await browser.close()
//         // open the headless browser
//         var browser = await puppeteer.launch({ headless: true });
//         // open a new page
//         var page = await browser.newPage();
//         // enter url in page
//         await page.goto(`https://news.ycombinator.com/`);
//         await page.waitForSelector("a.storylink");

//         var news = await page.evaluate(() => {
//             var titleNodeList = document.querySelectorAll(`a.storylink`);
//             var ageList = document.querySelectorAll(`span.age`);
//             var scoreList = document.querySelectorAll(`span.score`);
//             var titleLinkArray = [];
//             for (var i = 0; i < titleNodeList.length; i++) {
//                 titleLinkArray[i] = {
//                     title: titleNodeList[i].innerText.trim(),
//                     link: titleNodeList[i].getAttribute("href"),
//                     age: ageList[i].innerText.trim(),
//                     score: scoreList[i].innerText.trim()
//                 };
//             }
//             return titleLinkArray;

//         })
//         await browser.close();
//         // Writing the news inside a json file
//         fs.writeFile("hackernews.json", JSON.stringify(news), function (err) {
//             if (err) throw err;
//             console.log("Saved!");
//         });
//         console.log(success("Browser Closed"));
//     } catch (err) {
//         // Catch and display errors
//         console.log(error(err));
//         await browser.close();
//         console.log(error("Browser Closed"));
//     }

// }

webScrapeArticle('Environmental Issue')