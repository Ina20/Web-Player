let link = "";
let level = [];
let hls;

window.onload = function() {

  document.getElementById('inputState').addEventListener('change', function() {

    link = this.value;
    switch(link) {
      case "Big Buck Bunny":
        link = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        break;
      case "About Parkour":
        link = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
        break;
      case "Sintel":
        link = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
        break;
      case "Interview":
        link = "https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8";
        break;
    default:
      console.log("default");
    }
  });
}

function customURL(event){
  if(event.which == 13){
    console.log(document.getElementById("url").value);
    link = document.getElementById("url").value;
    setVideo();
  }
}

function makeP(){
  var p = document.createElement("p");
  p.innerHTML = "Available bitrates: "
  p.setAttribute("id", "bitratesTxt");
  document.getElementById("bitrateButtons").appendChild(p);
}

function makeButton(level, i){
  var btn = document.createElement("BUTTON");
  btn.innerHTML = level + " kb";
  btn.setAttribute("class", "qualityButton");
  btn.setAttribute("id", "qualityButton" + i);
  btn.addEventListener("click", function(){
    let splitID = this.id.split('qualityButton')[1];
    let newLevel = parseInt(splitID);
    hls.currentLevel = newLevel;
    showInfo(level, newLevel);
  });
  document.getElementById("bitrateButtons").appendChild(btn);
}

function removeButton(){
  const parent = document.getElementById("bitrateButtons");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function showInfo(level, i){
  let bitrate = document.getElementById("infoBitrate");
  let width = document.getElementById("infoWidth");
  let height = document.getElementById("infoHeight");
  let vCodec = document.getElementById("infoVCodec");
  let aCodec = document.getElementById("infoACodec");
  bitrate.innerHTML = level + " kb";
  width.innerHTML = hls.levels[i].width;
  height.innerHTML = hls.levels[i].height;
  vCodec.innerHTML = hls.levels[i].codecs;
  aCodec.innerHTML = hls.levels[i].codecs;
}

function setVideo(){
  console.log("Hello!");
  removeButton();
  makeP();
  if (Hls.isSupported()) {
    console.log("hello hls.js!");
    var video = document.getElementById('video');
    hls = new Hls();
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log("video and hls.js are now bound together !");
      hls.loadSource(link);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log("manifest loaded, found " + data.levels.length + " quality level");
        for(i=0; i < hls.levels.length; i++){
          level[i] = Math.round(hls.levels[i].bitrate/1024);
          makeButton(level[i], i);
        }
      });
    });
  }
};
