const fs = require("fs");
const http = require("http");

const largeFilePath = "test-file.txt";
const localhost = "127.0.0.1";
const port = 8000;

const server = http.createServer();
server.on("request", (req, res) => {
  // Solution 1: read the whole file
  // reading a large file into memory will drain the resources very quickly and
  //   fs.readFile(largeFilePath, (err, data) => {
  //     if (err) console.log("Error.");
  //     res.end(data);
  //   });

  // Solution 2: read the file stream, will cause back pressure because reading a file from disk is much faster than writing a chunk over the network
  const readable = fs.createReadStream(largeFilePath);
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });

  // Solution 3: pipe the file stream directly to writable request
  readable.pipe(res);
});

server.listen(port, localhost, () => {
  console.log("Waiting for requests.");
});
