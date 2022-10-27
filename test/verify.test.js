const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe("the webpage", () => {
  it("should have a header element", async () => {
    const element = await page.$("header");
    expect(element).not.toBeNull();
  });

  it("should have a navigation element", async () => {
    const element = await page.$("nav");
    expect(element).not.toBeNull();
  });

  it("should have a article element", async () => {
    const element = await page.$("article");
    expect(element).not.toBeNull();
  });

  it("should have a section element", async () => {
    const element = await page.$("section");
    expect(element).not.toBeNull();
  });

  it("should have a footer element", async () => {
    const element = await page.$("footer");
    expect(element).not.toBeNull();
  });
});
