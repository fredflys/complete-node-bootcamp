const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate.js");

const encoding = "utf-8";
const devPath = `${__dirname}/dev-data`;
const templatePath = `${__dirname}/templates`;

const overviewHtml = fs.readFileSync(
  templatePath + "/template-overview.html",
  encoding
);
const productHtml = fs.readFileSync(
  templatePath + "/template-product.html",
  encoding
);
const cardHtml = fs.readFileSync(
  templatePath + "/template-card.html",
  encoding
);

const data = fs.readFileSync(devPath + "/data.json", encoding);
const products = JSON.parse(data);
const slugs = data.map((item) => slugify(item, { lower: true }));

const server = http.createServer((req, res) => {
  const pattern = req.url;
  console.log(pattern);
  // second parameter decides whether the query string should be parsed
  const { query, pathname } = url.parse(req.url, true);
  // routing: implementing different actions for different urls
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = products
      .map((product) => replaceTemplate(product, cardHtml))
      .join("");
    const output = overviewHtml.replace(/{% PRODUCT_CARDS_HTML %}/g, cardsHtml);
    res.end(output);
    return;
  }

  // parse parameters from urls
  if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = products[query.id];
    const output = replaceTemplate(product, productHtml);
    res.end(output);
    return;
  }

  if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    return;
  }

  res.writeHead(404, {
    "Content-type": "text/html",
    "my-header": "customized",
  });
  res.end("<h1>Page Not Found!</h1>");
});

const localhost = "127.0.0.1";
const port = 8000;
server.listen(port, localhost, () => {
  console.log("A server is running and listening on 8000.");
});
