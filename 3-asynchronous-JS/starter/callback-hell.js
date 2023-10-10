const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  const url = `https://dog.ceo/api/breed/${data}/images/random`;
  superagent.get(url).end((err, res) => {
    console.log(res.body.message);

    fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
      if (err) return console.log("Error while writing into the file.");
      console.log("Image saved!");
    });
  });
});
