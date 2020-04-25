let fs = require("fs");
let usersString = fs.readFileSync("./db/users.json").toString();
let usersArray = JSON.parse(usersString);

const newUser = { id: 2, name: "李知恩", age: "18" };
usersArray.push(newUser);
fs.writeFileSync("./db/users.json", JSON.stringify(usersArray));