const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

// change readFile so that it returns a Promise
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File is not found for read!");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("File write failed!");
      resolve("File write is done!");
    });
  });
};

module.exports.readFilePromise = readFilePromise;
module.exports.writeFilePromise = writeFilePromise;

const flag = false;
if (!flag) return;

readFilePromise(`${__dirname}/dog.txt`)
  .then((breed) => {
    console.log(`Breed: ${breed}`);

    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    return superagent.get(url);
  })
  // for a resolved promise
  .then((res) => {
    return writeFilePromise(`${__dirname}/dog-image.txt`, res.body.message);
  })
  .then(() => {
    console.log("Dog image is saved locally!");
  })
  // for a rejected promise
  .catch((err) => {
    console.log(err.message);
  });
