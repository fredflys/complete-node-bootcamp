const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

// set thread pool size, default 4
process.env.UV_THREADPOLL_SIZE = 4;

setTimeout(() => {
  console.log("Timer 1 finished.");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 finished.");
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished.");
  console.log("------Event Loop------");

  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 0);
  setImmediate(() => {
    console.log("Immediate 2 finished.");
  });
  process.nextTick(() => {
    console.log("Tick 1 finished.");
  });

  // synchronous version
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha256", () => {
    console.log(Date.now() - start, "Encryption is finished.");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha256", () => {
    console.log(Date.now() - start, "Encryption is finished.");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha256", () => {
    console.log(Date.now() - start, "Encryption is finished.");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha256", () => {
    console.log(Date.now() - start, "Encryption is finished.");
  });
});
