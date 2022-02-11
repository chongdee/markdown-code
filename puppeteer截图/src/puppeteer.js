/*
 * @Author: yuyongxing
 * @Date: 2022-01-13 18:07:56
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-02-11 14:02:51
 * @Description: 工具方法
 */
const puppeteer = require("puppeteer");
const fs = require("fs")


const waitTime = (n) => new Promise((r) => setTimeout(r, n));
const writeJson = (json) => {
  fs.writeFile("data.json", JSON.stringify(json), function (err) {
    console.log(err)
  })
}

module.exports = async (opt) => {
  console.log("被调用")
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-zygote',
        '--no-sandbox',
        '--disable-gpu',
        '--no-first-run',
        '--single-process',
        '--disable-extensions',
        "--disable-xss-auditor",
        '--disable-dev-shm-usage',
        '--disable-popup-blocking',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--enable-features=NetworkService',
      ]
    });
    const page = await browser.newPage();
    await page.goto("https://www.lsjcpjbs.org/website/bzgl/gbmbzcx.html", { waitUntil: "networkidle2" });
    await page.setViewport({
      width: opt.width,
      height: opt.height,
    });
    // const ele = await page.$("table");
    await waitTime(1000)
    var arr = []
    let clickNum = 0
    const loadData = async () => {
      console.log("执行第"+clickNum)
      if (clickNum < 232) {

        let data = await page.evaluate(() => {
          let arr = []
          var rows = document.querySelectorAll('#searchFm + table tr')
          for (var i = 1; i < rows.length; i++) {
            if (i > 10) break
            var row = rows[i]
            arr.push({
              "序号": row.children[0].innerText,
              "证书编号": row.children[1].innerText,
              "产品名称": row.children[2].innerText,
              "企业名称": row.children[3].innerText,
              "星级": row.children[4].innerText,
              "评价机构": row.children[5].innerText,
            })
          }
          return arr
        })
        clickNum++
        arr = arr.concat(data)
        await page.click("#next_")
        await waitTime(1000)
        await loadData(arr)
      }
      
    }

    await loadData()

    await writeJson(arr)
    // console.log(ele)
    // const base64 = await ele.screenshot({
    //   fullPage: false,
    //   omitBackground: true,
    //   encoding: 'base64'
    // });
    console.log("结束")
    // await browser.close();
    return ""
  } catch (error) {
    throw error
  }
};
