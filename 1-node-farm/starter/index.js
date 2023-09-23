const fs = require("fs");

console.log("------Synchronous way of reading and writing a file------");
const inputFile = "./txt/input.txt";
const encoding = "utf-8";
const { text } = require("stream/consumers");
const textIn = fs.readFileSync(inputFile, encoding);
const textOut = `This is what we know about avacado: ${textIn}.\nCreated on ${Date.now()}.\n`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File has been written.\n");

console.log("------Asynchronous way of reading and writing a file------");
fs.readFile("./txt/start.txt", encoding, (err, input) => {
  if (err) console.log("ERROR! 🚫");
  fs.readFile(`./txt/${input}.txt`, encoding, (err, data) => {
    console.log(data);

    fs.readFile(`./txt/append.txt`, encoding, (err, appendData) => {
      console.log(appendData);

      fs.writeFile(
        `./txt/final.txt`,
        `${data}\n${appendData}"`,
        (err, finalData) => {
          console.log("File has been written.😁");
        }
      );
    });
  });
});
