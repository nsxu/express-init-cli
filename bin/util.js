import chalk from "chalk";

export function info(msg) {
  console.log(chalk.blue(msg));
}

export function error(msg) {
  console.log(chalk.red(msg));
}

export function getMiddlewareStatus(middlewares = []) {
  const map = {
    json: false,
    urlencoded: false,
    formdata: false,
    staticMiddleware: false,
  };
  map.json = middlewares.includes("application/json");
  map.urlencoded = middlewares.includes("application/x-www-form-urlencoded");
  map.formdata = middlewares.includes("multipart/form-data");
  map.staticMiddleware = middlewares.includes("static");
  return map;
}
