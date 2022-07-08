import question from "./bin/question.js";
import fs from "fs";
import { execa } from "execa";
import path from "path";
import { info, error } from "./bin/util.js";
import { generateIndexTemplate } from "./bin/template/index.js";
import { generatePackageTemplate } from "./bin/template/package.js";

async function startup() {
  const config = await question();
  console.log("config", config);

  // 1. 创建项目
  const { dir } = config;
  const dirPath = path.resolve(process.cwd(), dir);
  try {
    fs.mkdirSync(dirPath);
    info(`创建项目: ${dir}`);
  } catch (err) {
    error(err.message);
    process.exit();
  }

  // 2. 创建文件index.js
  const indexFile = "index.js";
  const indexPath = path.resolve(dirPath, indexFile);
  fs.writeFileSync(indexPath, generateIndexTemplate(config));
  info(`创建文件: ${indexFile}`);

  // 3. 创建文件package.json
  const jsonFile = "package.json";
  const jsonPath = path.resolve(dirPath, jsonFile);
  fs.writeFileSync(jsonPath, generatePackageTemplate(config));
  info(`创建文件: ${jsonFile}`);
}

startup();
