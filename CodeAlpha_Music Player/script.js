const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const search = document.getElementById("search");

let currentIndex = 0;
let isPlaying = false;

const songs = [
  { title: "Song 1", artist: "alexGroh", src: "songs/song1.mp3", genre: "PopBurn The Track (Inspiring Rock Trailer)" },
  { title: "Song 2", artist: "Artist BProducesPlatinum", src: "songs/song2.mp3", genre: "Vlog Hip-Hop" },
  { title: "Song 3", artist: "tunetank", src: "songs/song3.mp3", genre: "Inspiring Cinematic Music" }
];

function loadPlaylist(list = songs) {
  playlistEl.innerHTML = "";
  list.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerText = `${song.title} - ${song.artist}`;
    li.onclick = () => {
      currentIndex = index;
      loadSong();
      playSong();
    };
    playlistEl.appendChild(li);
  });
}

function loadSong() {
  const song = songs[currentIndex];
  audio.src = song.src;
  title.innerText = song.title;
  artist.innerText = song.artist;
}

function playSong() {
  audio.play();
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong();
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong();
  playSong();
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query) ||
    song.genre.toLowerCase().includes(query)
  );
  loadPlaylist(filtered);
});

function toggleTheme() {
  document.body.classList.toggle("dark");
}

loadSong();
loadPlaylist();
