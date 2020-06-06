let link = "";

window.onload = function() {

  document.getElementById('inputState').addEventListener('change', function() {
    link = this.value;
    switch(link) {
      case "Big Buck Bunny":
        link = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        console.log(link);
        break;
      case "About Parkour":
        link = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
        console.log(link);
        break;
      case "Durian Open Movie Project":
        link = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
        console.log(link);
        break;
    default:
      console.log("default");
    }
  });

}

function setVideo(){
  console.log("Hello!");
  if (Hls.isSupported()) {
    console.log("hello hls.js!");
    var video = document.getElementById('video');
    var hls = new Hls();
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log("video and hls.js are now bound together !");
      hls.loadSource(link);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log("manifest loaded, found " + data.levels.length + " quality level");
      });
    });
  }
};
