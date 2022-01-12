/*
 * @Author: yuyongxing
 * @Date: 2022-01-10 11:33:26
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-12 18:10:55
 * @Description: 
 */
const puppeteer = require("puppeteer");
const waitTime = (n) => new Promise((r) => setTimeout(r, n));
 
const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const className = ".share-box";
  await page.goto("https://yqft-api.test.hi-cloud.net/activity-new/common/testShare.html");
  await page.setViewport({
    width: 750,
    height: 750,
  });
  await waitTime(2000);
  const item = await page.$(className);
  // 不加path 返回buffer
  await item.screenshot({ path: "item.png" });
  await browser.close();
};
main()
