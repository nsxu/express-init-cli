import inquirer from "inquirer";
const questions = [
  {
    type: "input",
    name: "dir",
    message: "project name",
    validate(val) {
      if (val) {
        if (val.trim().length === val.length) {
          return true;
        } else {
          return "there must be no spaces at the beginning and end of the directory";
        }
      }
      return "please enter a new project directory.";
    },
  },
  {
    type: "input",
    name: "port",
    message: "set the server port address",
    validate(val) {
      if (val >= 1000 && val <= 65535) return true;
      return "port address range >=1000 and <=65535";
    },
    default() {
      return 20000;
    },
  },
  {
    type: "checkbox",
    message: "select middleware",
    name: "middlewares",
    choices: [
      {
        name: "application/json",
      },
      {
        name: "application/x-www-form-urlencoded",
      },
      {
        name: "multipart/form-data",
      },
      {
        name: "static",
      },
    ],
  },
];

export default () => {
  return inquirer.prompt(questions);
};
