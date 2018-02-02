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
          var blob = new Blob(chunks_1, { 'type' : 'audio/ogg; codecs=opus' });
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
