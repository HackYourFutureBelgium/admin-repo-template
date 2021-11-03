"use strict";

/*
  still brittle around missing directories
  could clear all avatars before fetching
*/

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { promisify } = require("util");

// https://gist.github.com/tinovyatkin/4316e302d8419186fe3c6af3f26badff (the comment)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question[promisify.custom] = question => {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
};

(async () => {
  const abortInput = await promisify(rl.question)(
    "\nare you sure you want to populate the students? \nthis will erase any existing notes\n\n- enter 'yes' to continue\n\n"
  );

  rl.close();

  if (abortInput.toLowerCase() !== "yes") {
    process.exit(0);
  }
})();

const mainData = require("../data/index.json");
const orgURL = `https://github.com/${mainData.orgName}`;
const homeRepoURL = `${orgURL}/${mainData.homeRepoName}`;

const whichOnes = process.argv[2];

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../data/${whichOnes}.json`), "utf8")
);

const basePath = path.join(__dirname, `..`, whichOnes);
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

for (const user of users) {
  const userPath = path.join(basePath, user.userName);
  fs.mkdir(userPath, err => {
    if (err && err.code !== "EEXIST") {
      console.error(err);
      return;
    }

    const userReadmeStarter = `# ${user.name}

![${user.userName} avatar](../.avatars/${user.userName}.jpeg)

- [${user.userName}](https://github.com/${user.userName})
- [private repo](${orgURL}/${user.userName})
- [home profile](${homeRepoURL}#${user.userName})

---
`;

    const userReadmePath = path.join(userPath, "README.md");
    fs.writeFile(userReadmePath, userReadmeStarter, "utf-8", err =>
      err ? console.error(err) : null
    );
  });
}
