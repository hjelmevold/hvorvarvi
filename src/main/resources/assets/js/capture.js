var stop_1 = document.querySelector('.stop');
var save_1 = document.querySelector('.save');
chunks_1 = [];

function getUserMedia_1(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

function getStream_1 (type) {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints_1 = {};
    constraints_1[type] = true;
    getUserMedia_1(constraints_1, function (stream) {

        var stop_1 = document.querySelector('.stop');

        var mediaRecorder_1 = new MediaRecorder(stream);
        mediaRecorder_1.start();

        stop_1.onclick = function(e) {
            e.preventDefault();
            mediaRecorder_1.stop();
        }

        mediaRecorder_1.ondataavailable = function(e) {
            chunks_1.push(e.data);
        }

        mediaRecorder_1.onstop = function(e) {
            var blob = new Blob(chunks_1, { 'type' : 'audio/mpeg' });
            chunks_1 = [];
            var audioURL = window.URL.createObjectURL(blob);

            save_1 = document.querySelector('.save');

            save_1.href = audioURL;
            save_1.click();

            mediaControl_1.srcObject = null;
            mediaControl_1.src = null;

            console.log(audioURL);
        }

        var mediaControl_1 = document.querySelector(type);
        if (navigator.mozGetUserMedia) {
            mediaControl_1.mozSrcObject = stream;
        } else {
            mediaControl_1.srcObject = stream;
            mediaControl_1.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }


    }, function (err) {
        alert('Error: ' + err);
    });
}


function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

var chunks = [];
function getStream (type) {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {};
    constraints[type] = true;
    getUserMedia(constraints, function (stream) {
        var mediaControl = document.querySelector(type);
        if (navigator.mozGetUserMedia) {
            mediaControl.mozSrcObject = stream;
        } else {
            mediaControl.srcObject = stream;
            mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }

        chunks = [];

        var mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstop = stopRecording;
        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        };
        mediaRecorder.start();
        setTimeout(function() {
            mediaRecorder.stop();

        },2000);

    }, function (err) {
        alert('Error: ' + err);
    });
}

function stopRecording() {
    console.log('Stop recording');
    var blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
    chunks = [];
    sendBlob(blob);
}

function sendBlob(blob) {
    var fd = new FormData();
    fd.append('videoname', 'myvideo');
    fd.append('video', blob);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'upload');
    xhr.send(fd);
}
