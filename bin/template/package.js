import prettier from "prettier";
import { getMiddlewareStatus } from "../util.js";

export function generatePackageTemplate(config) {
  const { dir, port, middlewares } = config;
  const { json, urlencoded, formdata, staticMiddleware } =
    getMiddlewareStatus(middlewares);

  let template = `
  {
    "name": "${dir}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "scripts": {
      "serve": "node index.js"
    },
    "dependencies": {
      "express": "^4.18.1",
      ${formdata ? '"multer": "^1.4.4"' : ""}
    }
  }`;

  template = prettier.format(template, { parser: "json" });
  return template;
}
