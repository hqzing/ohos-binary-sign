#!/usr/bin/env node

const { execFileSync }= require("child_process")
const { getBinarySignToolPath } = require("../utils/utils.js")

const binarySignToolPath = getBinarySignToolPath();
execFileSync(binarySignToolPath, process.argv.slice(2), { stdio: "inherit" });
