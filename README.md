# MyAnimeList to PDF

Using Puppeteer to generate PDFs from [myanimelist.net/news](https://myanimelist.net/news). This can be useful for uploading PDFs to sites like Scribd.

## How to Use

1. Clone the repository:
    ```terminal
    $ git clone https://github.com/yourusername/myanimelist-to-pdf.git
    $ cd myanimelist-to-pdf
    ```

2. Install dependencies:
    ```terminal
    $ npm install
    ```

3. Run the script:
    ```terminal
    $ node index.js [URL]
    ```

    Replace `[URL]` with the URL of the MyAnimeList news page you want to convert to PDF.

## Example

```terminal
$ node index.js https://myanimelist.net/news
```

## How It Works

The script performs the following steps:

1. **URL Validation**: Ensures a valid URL is provided.
2. **Filename Generation**: Uses `faker` to generate a unique filename for the PDF.
3. **Directory Check**: Ensures the target directory exists, creating it if necessary.
4. **Browser Automation**: Launches Puppeteer, navigates to the provided URL, and handles any modal dialogs.
5. **PDF Generation**: Saves the webpage as a PDF in the `./pdfs` directory.

## Dependencies

- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [faker](https://www.npmjs.com/package/faker)
- [ms](https://www.npmjs.com/package/ms)

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.

