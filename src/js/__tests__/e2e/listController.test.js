import { exportAllDeclaration } from "@babel/types";
import puppetteer from "puppeteer";

jest.setTimeout(1000000); // default puppeteer timeout
describe("test", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:8888";

  beforeAll(async () => {
    browser = await puppetteer.launch();
    /* {
      // во всем виновата безголовость
      headless: false,
      slowMo: 100,
      devtools: true,
    }); */

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Открытие страницы", async () => {
    await page.goto(baseUrl);
  });

  test("principal__button onClick", async () => {
    await page.goto(baseUrl);

    const button = await page.$(".principal__button");
    button.click().catch((e) => e);
    await page.waitForSelector(".modal-active");
  });

  test("addBtn onClick return true", async () => {
    // нужен антагонист page.waitForSelector
    await page.goto(baseUrl);

    const button = await page.$(".principal__button");
    button.click().catch((e) => e);

    await page.waitForSelector(".modal-active");

    const inputName = await page.$(".input-article-name");
    const inputPrice = await page.$(".input-article-price");

    await inputName.type("iphone"); // не желает работать с заглавными буквами
    await inputPrice.type("64990");

    const addBtn = await page.$(".article__add-button");

    addBtn.click().catch((e) => e);

    await page.waitForSelector(".article-box");
  });

  test("addBtn onClick return false", async () => {
    await page.goto(baseUrl);

    const button = await page.$(".principal__button");
    button.click().catch((e) => e);

    await page.waitForSelector(".modal-active");

    const inputName = await page.$(".input-article-name");
    const inputPrice = await page.$(".input-article-price");

    await inputName.type("ixcxc");
    await inputPrice.type("ixcx");

    const addBtn = await page.$(".article__add-button");

    addBtn.click().catch((e) => e);
    await page.waitForSelector(".modal-active, .tooltip-active");
  });
});
