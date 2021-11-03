"use strict";

const replaceInReadme = require("./lib/replace-in-readme.js");

const mainData = require("../data/index.json");

const header = `
# Admin: ${mainData.orgName
  .split("-")
  .map((word) => word[0].toUpperCase() + word.slice(1))
  .join(" ")}

- [${mainData.homeRepoName}](https://github.com/${mainData.orgName}/${
  mainData.homeRepoName
})
- [Random Groups](https://${mainData.orgName}.github.io/${
  mainData.homeRepoName
}/randomizer)
`;

replaceInReadme(header, "HEADER");
