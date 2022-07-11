import prettier from "prettier";
import { getMiddlewareStatus } from "../util.js";

export function generateIndexTemplate(config) {
  const { port, middlewares } = config;
  const { json, urlencoded, formdata, staticMiddleware } =
    getMiddlewareStatus(middlewares);

  let template = `
    const express = require("express");
    const app = express();
    const path = require("path");
    ${formdata ? 'const multer = require("multer");' : ""}
    
    ${formdata ? "app.use(multer().none());" : ""}
    ${json ? "app.use(express.json());" : ""}
    ${urlencoded ? "app.use(express.urlencoded({ extended: false }));" : ""}
    ${
      staticMiddleware
        ? 'app.use(express.static(path.join(__dirname, "public")));'
        : ""
    }
    
    app.get("/", (req, res) => {
      res.send("hello world");
    });
    
    app.listen(${port}, () => {
      console.log("listen on ${port}.");
    });
    `;

  template = prettier.format(template, { parser: "babel" });
  return template;
}
