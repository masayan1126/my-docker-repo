import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const query = "python";

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      executablePath: "/usr/bin/google-chrome-stable",
      //   headless: true,
    });
    const page = await browser.newPage();
    await page.goto(
      `https://suumo.jp/jj/common/ichiran/JJ901FC004/?pc=30&seniFlg=1&ar=060&ra=060027&rn=2415&rnTmp=2415&kwd=&ts=1&bs=010&cb=0.0&ct=10.0&kb=0&kt=9999999&km=1&md=1%2C2%2C3&xb=0&xt=9999999&et=5&cn=0&newflg=0&bs=040`
    );
    const results = await page.$$eval(".cassettebox-title", (elements) =>
      elements.map((element) => ({
        title: element.textContent,
        url:
          "https://suumo.jp" + element.querySelector("a")?.getAttribute("href"),
        // url: "",
      }))
    );

    console.log(results);

    res.send(results);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error !!!!!!!!!${error.message}`);
    }
  } finally {
    await browser?.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
