#!/usr/bin/env node

import question from "./bin/question.js";
import fs from "fs";
import path from "path";
import { info, error, success } from "./bin/util.js";
import { generateIndexTemplate } from "./bin/template/index.js";
import { generatePackageTemplate } from "./bin/template/package.js";
import { exec } from "child_process";
import ora from "ora";

async function startup() {
  const config = await question();

  // 1. create project
  const { dir } = config;
  const dirPath = path.resolve(process.cwd(), dir);
  try {
    fs.mkdirSync(dirPath);
    info(`create project: ${dir}`);
  } catch (err) {
    error(err.message);
    process.exit();
  }

  // 2. create index.js
  const indexFile = "index.js";
  const indexPath = path.resolve(dirPath, indexFile);
  fs.writeFileSync(indexPath, generateIndexTemplate(config));
  info(`create file: ${indexFile}`);

  // 3. create package.json
  const jsonFile = "package.json";
  const jsonPath = path.resolve(dirPath, jsonFile);
  fs.writeFileSync(jsonPath, generatePackageTemplate(config));
  info(`create file: ${jsonFile}`);

  // 4.install
  const spinner = ora("Installing packages...").start();
  exec(`cd ${dirPath} && npm install`, (err, stdout) => {
    if (err) {
      spinner.fail(err.messag);
      error(err.message);
      process.exit();
    }
    spinner.succeed();
    success(
      `\nSuccessfully created project ${dir}.\n$ cd ${dir}\n$ npm run serve`
    );
  });
}

startup();
