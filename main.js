window.onload = function() {
  if (Hls.isSupported()) {
    console.log("hello hls.js!");
    var video = document.getElementById('video');
    var hls = new Hls();
    // bind them together
    hls.attachMedia(video);
    // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log("video and hls.js are now bound together !");
      hls.loadSource("http://my.streamURL.com/playlist.m3u8");
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log("manifest loaded, found " + data.levels.length + " quality level");
        video.play();
      });
    });
  }
}
