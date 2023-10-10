const superagent = require("superagent");
const { readFilePromise, writeFilePromise } = require("./promise.js");

const getPics = async () => {
  console.log("Multiple Async: start retrieving");
  const breed = await readFilePromise(`${__dirname}/dog.txt`);
  console.log(`Breed: ${breed}`);

  const url = `https://dog.ceo/api/breed/${breed}/images/random`;

  let results = [];
  for (let i = 0; i < 3; i++) {
    results.push(superagent.get(url));
  }

  const urls = (await Promise.all(results)).map((res) => res.body.message);
  console.log(urls);

  await writeFilePromise("dog-imgs.txt", urls.join("\n"));
};

getPics();
