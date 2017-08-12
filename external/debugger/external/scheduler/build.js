var tsbuild = require("tsbuild");

tsbuild("scheduler.ts", "./src", "./lib", "./dist", "Scheduler");
