# Live Code Editor (unofficial)

This is the live coding environment developed for the [Khan Academy Computer Programming curriculum](https://www.khanacademy.org/computer-programming/). It gives learners an editor on the left (either ACE or our Blocks-based drag-and-drop editor) and an output on the right (either JS+ProcessingJS, HTML, or SQL).
Here's a [tour of how it's used on KA](https://www.youtube.com/watch?v=bPCWwEApKw4).

The demos will work and should be up to date in this repo. Simply download the repo and start a python http server as described below.

## Running

In order to run `live-editor` locally you'll have run a local web server.  If you have Python 2.x.x installed this can be accomplished by running the following command from the `live-editor` folder:

    python -m SimpleHTTPServer
    
Or, with Python 3.x.x:

    python -m http.server

You should see the following console output:

    Serving HTTP on 0.0.0.0 port 8000 ...

Open up a browser and navigate to http://0.0.0.0:8000/demos/simple.

## Building

You can use the pre-built copies of everything inside the `build/` directory. If you wish to make some changes and re-build the library from scratch you'll need to install some dependencies:

    git submodule update --init --recursive
    npm install
    bower install

    # Build the Ace editor files (This is usually *not* needed)
    cd bower_components/ace
    npm install
    node Makefile.dryice.js -nc

At this point you can make a fresh build, using [Gulp](http://gulpjs.com/):

    npm run build

If you have an issue with "this.merge" is undefined, then `rm -rf node_modules/gulp-handlebars/node_modules/handlebars`.

This issue also occurs if you do something wrong during the setup process.

## Testing

The tests are in the `/tests` folder. They use Mocha/Chai/Sinon. Gulp typically runs the tests when relevant files change, but you can explicitly run the tests with:

    npm test
    
You can also run single test suites at a time - see gulpfile.js for what suites are available:

    gulp test_output_pjs_assert

You can run the tests in the browser runner by opening the relevant webpage:
    
    open tests/output/sql/index.html
   

Please add tests whenever possible for any change that you make or propose.

## How you can help

Simply put in a PR and it will be reviewed, making sure to add tests if you like.

## How it works

You can watch these talks that the team has given about the editor:
* [John Resig on CodeGenius](https://www.youtube.com/watch?v=H4sSldXv_S4)
* [Pamela Fox at ReactConf](https://youtu.be/EzHsLt9vLbk?t=26m49s)
