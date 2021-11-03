"use strict";

const renderStudent = (student, mainData) => {
  const orgURL = `https://github.com/${mainData.orgName}`;
  const homeRepoURL = `${orgURL}/${mainData.homeRepoName}`;
  const studentProfile =
    `<table> <tr>\n` +
    `  <td><img src='./students/.avatars/${student.userName}.jpeg' height="200px" width="200px" alt='${student.userName} avatar' /></td>\n` +
    `  <td> <h3 display="inline" id="${student.userName}">${student.name}</h3>\n` +
    `
<ul>
  <li>
    <a href="./students/${student.userName}/README.md">admin notes</a>
  </li>
  <li>
    <a href="${orgURL}/${student.userName}">private repo</a>
  </li>
  <li>
    <a href="${homeRepoURL}#${student.userName}">home profile</a>
  </li>
</ul>` +
    `  </td>\n` +
    `</tr></table> `;

  return studentProfile;
};

module.exports = renderStudent;
