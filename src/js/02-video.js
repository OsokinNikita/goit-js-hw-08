import Player from "@vimeo/player";
const throttle = require("lodash.throttle");

const iframe = document.querySelector("iframe");

const player = new Player(iframe);

player.on("timeupdate", throttle(onPlayWidtUpdate, 1000));


function onPlayWidtUpdate(e) {
  localStorage.setItem("videoplayer-current-time", JSON.stringify(e.seconds));
}

const saveTimeCode = localStorage.getItem("videoplayer-current-time");
if(saveTimeCode) {
  player.setCurrentTime(saveTimeCode);
}

