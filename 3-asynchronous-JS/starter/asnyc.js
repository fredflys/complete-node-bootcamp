const superagent = require("superagent");
const { readFilePromise, writeFilePromise } = require("./promise.js");

console.log(readFilePromise);
const getDogPic = async () => {
  try {
    console.log("Async: start retrieving");
    const breed = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${breed}`);

    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const pic = (await superagent.get(url)).body.message;
    console.log(`Pic url: ${pic}`);

    await writeFilePromise("dog-img.txt", pic);
    console.log("Pic url is written into the file.");
  } catch (err) {
    console.log(err);
    throw err;
  }

  return "Ready: 👌";
};

module.exports.getDogPic = getDogPic;

getDogPic()
  .then((res) => {
    console.log(res);
    console.log("Image retrieved!");
  })
  .catch((err) => {
    console.log("ERROR: 🚫s");
  });
