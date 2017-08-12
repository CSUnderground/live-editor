var fs = require("fs");
var browserify = require("browserify");
var to5ify = require("6to5ify");

var options;

options = {
    standalone: "Debugger"
};

var stream = fs.createWriteStream("./build/debugger.js");
var runtime = fs.readFileSync("./node_modules/regenerator/runtime.js");
stream.write(runtime);
browserify(options)
    .transform(to5ify)
    .require("./src/debugger.js", { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(stream);

options = {
    standalone: "ProcessingDebugger"
};

browserify(options)
    .transform(to5ify)
    .require("./src/processing-debugger.js", { entry: true })
    .exclude("./src/debugger.js")
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(fs.createWriteStream("./build/processing-debugger.js"));
