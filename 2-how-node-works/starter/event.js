const EventEmitter = require("events");
const http = require("http");

class Sale extends EventEmitter {
  constructor() {
    super();
  }
}

// const emitter = new EventEmitter();
const emitter = new Sale();

emitter.on("sale", () => {
  console.log("Congratulations!");
});
emitter.on("sale", () => {
  console.log("Customer placed an order.");
});
emitter.on("sale", (stock) => {
  console.log(`There are ${stock} items left.`);
});

emitter.emit("sale", 10);

const server = http.createServer();
server.on("request", (req, res) => {
  res.end("Request ");
  console.log("Request arrived.");
});
server.on("request", () => {
  console.log("Request received.");
});
server.on("close", () => {
  console.log("Server closed.");
});
server.listen("8000", "127.0.0.1", () => {
  console.log("Waiting for requests now.");
});
