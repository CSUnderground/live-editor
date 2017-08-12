[![Build Status](https://travis-ci.org/kevinb7/object-browser.svg)](https://travis-ci.org/kevinb7/object-browser)

# object-browser #

HTML widget for browser arbitrary JavaScript objects.  Very similar to the one
in Chrome Dev Tools.

## Features ##

- syntax highlighting
- summary view of collapsed (sub)objects
- array length
- handles circular references
- preserve the current tree expansion when replacing the object with a copy

## Future Work ##

- add tests (and update the paths dictionary appropriately when properties get removed)
- limit how many items are displayed for arrays
- limit the length of the summary when items are collapsed
- support properties using Object.defineProperty (via getOwnPropertyNames)
- embed CSS
- provide a way to style the control
- Web Component version?
