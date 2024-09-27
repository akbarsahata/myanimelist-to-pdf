const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { main } = require("./index.js");

jest.mock("puppeteer");
jest.mock("fs");
jest.mock("path");

describe("main function", () => {
  let browser, page;

  beforeEach(() => {
    browser = {
      newPage: jest.fn().mockResolvedValue({
        setDefaultTimeout: jest.fn(),
        goto: jest.fn(),
        $: jest.fn(),
        click: jest.fn(),
        pdf: jest.fn(),
      }),
      close: jest.fn(),
    };

    page = browser.newPage();

    puppeteer.launch.mockResolvedValue(browser);
    fs.existsSync.mockReturnValue(true);
    fs.mkdirSync.mockImplementation(() => {});
    path.normalize.mockImplementation((p) => p);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should throw error if URL is not provided", async () => {
    process.argv[2] = undefined;


    await expect(main()).rejects.toThrow("URL is required");
  });

  test("should generate PDF file", async () => {
    process.argv[2] = "http://example.com";


    await main();

    expect(puppeteer.launch).toHaveBeenCalled();
    expect(page.setDefaultTimeout).toHaveBeenCalledWith(60000);
    expect(page.goto).toHaveBeenCalledWith("http://example.com", { waitUntil: "load" });
    expect(page.pdf).toHaveBeenCalled();
    expect(browser.close).toHaveBeenCalled();
  });

  test("should handle modal if present", async () => {
    process.argv[2] = "http://example.com";
    page.$.mockResolvedValueOnce(true).mockResolvedValueOnce({ click: jest.fn() });


    await main();

    expect(page.$).toHaveBeenCalledWith("div.modal-mask");
    expect(page.$).toHaveBeenCalledWith("button");
    expect(page.click).toHaveBeenCalled();
  });
});