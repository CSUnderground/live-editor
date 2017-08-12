multirecorder
=============

A library for recording multiple sounds from your mic, deleting them, and combining them together.

This library is based heavily on https://github.com/mattdiamond/Recorderjs, and is mostly a modification for my specific use case of combining multiple recordings. There's also a rewrite of how the Web Worker communication works to make it easier to call multiple functions simultaneously.

Usage
=============

    var multirecorder = new MultiRecorder()

    multirecorder.startRecording()
    multirecorder.stopRecording()
    multirecorder.isRecording()
    multirecorder.combineRecordings(recordings)

Many of these methods will return Deferreds, which will resolve and pass a Recorder object as an argument. You can then store those objects for later use (like to combine), and call methods like
createAudioPlayer and createDownloadLink.

Check out multirecorder.html to really see how to use it!