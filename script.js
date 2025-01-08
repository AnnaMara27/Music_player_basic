const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const art = document.getElementById("album-art");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Songs info
const songs = [
  {
    title: "All Night(Chosic.com).mp3",
    artist: "AudioCoffee",
    cover: "All Night(Chosic.com).jpg",
  },
  {
    title: "Future Technology(Chosic.com).mp3",
    artist: "MaxKoMusic",
    cover: "Future Technology(Chosic.com).jpg",
  },
  {
    title: "Journey(Chosic.com).mp3",
    artist: "Roa",
    cover: "Journey(Chosic.com).jpg",
  },
];

// To keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Load song details
function loadSong(song) {
  title.innerHTML = song.title;
  artist.innerHTML = song.artist;
  audio.src = `music/${song.title}`;
  art.src = `img/${song.cover}`;
}

let isPlaying = false;

// Play Song
function playSong() {
  isPlaying = true;
  playBtn.querySelector("i.fas").classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  audio.play();
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  playBtn.querySelector("i.fas").classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  audio.pause();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar and time

// Progress Bar Animation
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculations for duration display
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }

    // Delay display update till it loads
    if (durationSec) {
      durationEl.innerText = `${durationMin}:${durationSec}`;
    }
    // Calculations for current time display
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    // Delay display update till it loads
    if (durationSec) {
      currentTimeEl.innerText = `${currentMin}:${currentSec}`;
    }
  }
}

// Set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audio;
  //   value in seconds
  audio.currentTime = (clickX / width) * duration;
}

// EVENT LISTENERS

// Time update
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", nextSong);

// Navigation
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

progressContainer.addEventListener("click", setProgressBar);
