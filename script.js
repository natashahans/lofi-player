const audio = document.getElementById("audio");
const albumArt = document.getElementById("album-art");
const trackTitle = document.getElementById("track-title");
const artist = document.getElementById("artist");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

// Song data (replace with your actual songs)
const songs = [
  {
    title: "Redbone",
    artist: "Lofi Fruits",
    artwork: "images/1.gif",
    src: "music/Redbone [Lofi Fruits Release].mp3",
  },
  {
    title: "Lo-fi Type Beat",
    artist: "Rain",
    artwork: "images/2.gif",
    src: "music/Lo-fi Type Beat - Rain.mp3", // Replace with your actual audio file
  },
  {
    title: "Sakura Trees",
    artist: "Saib",
    artwork: "images/3.gif",
    src: "music/Sakura Trees.mp3", // Replace with your actual audio file
  },
  {
    title: "Lo-fi Type Beat",
    artist: "Lighter",
    artwork: "images/4.gif",
    src: "music/lighter.mp3", // Replace with your actual audio file
  },
  {
    title: "I'll Keep You Safe",
    artist: "sagun feat. Shiloh",
    artwork: "images/5.gif",
    src: "music/sagun - I'll Keep You Safe (feat. Shiloh).mp3", // Replace with your actual audio file
  },
  {
    title: "Silhouette",
    artist: "ENRA · dr. niar",
    artwork: "images/6.gif",
    src: "music/silhouette.mp3",
  },
  {
    title: "i miss u.",
    artist: "CHENELLE ft Shiloh Dynasty",
    artwork: "images/7.gif",
    src: "music/i miss u. ( ft Shiloh Dynasty ).mp3", // Replace with your actual audio file
  },
  {
    title: "Looking Up To The Sky",
    artist: "amies",
    artwork: "images/8.gif",
    src: "music/Looking Up To The Sky.mp3",
  },
  {
    title: "Living In Stereo",
    artist: "DJ Quads",
    artwork: "images/9.gif",
    src: "music/Dj Quads - Living In Stereo.mp3",
  },
  {
    title: "Good Times",
    artist: "Julian Avila",
    artwork: "images/10.gif",
    src: "music/Julian Avila - Good times.mp3",
  },
  {
    title: "First Time",
    artist: "DJ Quads",
    artwork: "images/11.gif",
    src: "music/Dj Quads - First Time.mp3",
  },
  {
    title: "Chill Noons",
    artist: "Kronicle",
    artwork: "images/12.gif",
    src: "music/Chill Noons.mp3",
  },
  {
    title: "Let's Go Surfing",
    artist: "Joakim Karud",
    artwork: "images/13.gif",
    src: "music/Let's Go Surfing.mp3",
  },
  {
    title: "Night Owl",
    artist: "BROCKBEATS",
    artwork: "images/14.gif",
    src: "music/Night Owl.mp3", // Replace with your actual audio file
  },
  {
    title: "Missing You",
    artist: "Purrple Cat",
    artwork: "images/15.gif",
    src: "music/Missing You.mp3",
  },
  {
    title: "Muguet",
    artist: "Greenface",
    artwork: "images/16.gif",
    src: "music/greenface - muguet.mp3",
  },

  {
    title: "Ocean",
    artist: "Thaehan",
    artwork: "images/17.gif",
    src: "music/Thaehan - Ocean.mp3",
  },
  {
    title: "There She Was",
    artist: "xx JBG",
    artwork: "images/18.gif",
    src: "music/There She Was by xx JBG - lofi hiphop music.mp3",
  },
  {
    title: "Branches",
    artist: "mell-ø & pointy features",
    artwork: "images/19.gif",
    src: "music/mell-ø & pointy features - branches.mp3",
  },
  {
    title: "Homies",
    artist: "Ouska",
    artwork: "images/20.gif",
    src: "music/Homies.mp3",
  },
  {
    title: "Are We Still Dreaming",
    artist: "cxlt.",
    artwork: "images/21.gif",
    src: "music/Are We Still Dreaming.mp3",
  },
  {
    title: "Bikes at the Pier",
    artist: "Nogymx",
    artwork: "images/22.gif",
    src: "music/bikes at the pier.mp3",
  },
];

let songIndex = 0;
let isPlaying = false;

// Load song details
function loadSong(song) {
  audio.src = song.src;
  albumArt.src = song.artwork;
  trackTitle.textContent = song.title;
  artist.textContent = song.artist;
}

loadSong(songs[songIndex]);

function toggleBarsAnimation(isPlaying) {
  const bars = document.querySelector(".bars");
  if (isPlaying) {
    bars.classList.add("playing");
  } else {
    bars.classList.remove("playing");
  }
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  toggleBarsAnimation(true);
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  toggleBarsAnimation(false);
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  if (isPlaying) {
    playSong();
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  if (isPlaying) {
    playSong();
  }
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
// function updateProgress(e) {
//   const { duration, currentTime } = audio;
//   const progressPercent = (currentTime / duration) * 100;
//   progress.style.width = `${progressPercent}%`;
// }

// Update progress bar
// Update progress bar
function updateProgress() {
  const { duration, currentTime } = audio;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Move the icon with the progress
    const icon = document.querySelector(".progress-icon");
    const progressContainerWidth = progressContainer.offsetWidth;
    const iconPosition = (progressPercent / 100) * progressContainerWidth;

    icon.style.left = `${iconPosition - 3}px`; // Adjust to center the icon
  }
}

audio.addEventListener("timeupdate", updateProgress);

// Set progress bar on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

//Autoplay next song at the end
audio.addEventListener("ended", nextSong);

// GSAP ANIMATIONS

// GSAP subtle channel-change glitch animation with sound effect
function glitchEffect(newArtwork) {
  // Play the glitch sound
  const glitchSound = new Audio("music/change-sound-effect.mp3");
  glitchSound.volume = 1; // Adjust volume if needed
  glitchSound.play();

  const tl = gsap.timeline();

  // Show glitch GIF instead of the album art
  albumArt.src = "images/glitch.gif";

  // Glitch animation sequence
  tl.to(albumArt, {
    duration: 0.1,
    opacity: 0, // Hide the image
    onStart: () => {
      albumArt.style.filter = "contrast(2) brightness(1.5) hue-rotate(30deg)";
      albumArt.style.transform = "scale(1.05) translateX(2px)";
    },
  })
    .to(albumArt, {
      duration: 0.1,
      opacity: 1, // Flash the glitch briefly
      filter: "contrast(0.8) brightness(0.8) hue-rotate(-20deg)",
      transform: "scale(0.98) translateX(-2px)",
    })
    .to(albumArt, {
      duration: 0.2,
      opacity: 1, // Keep the glitch GIF visible for 1 second
      onComplete: () => {
        albumArt.style.filter = "none";
        albumArt.style.transform = "none";
        albumArt.src = newArtwork; // Change to the new album art
      },
    })
    .to(albumArt, {
      duration: 0.5, // Smooth fade-in for the new image
      opacity: 1,
      ease: "power2.out",
    });
}

// Load song details
function loadSong(song) {
  audio.src = song.src;
  trackTitle.textContent = song.title;
  artist.textContent = song.artist;

  // Trigger glitch animation and set the new image afterward
  glitchEffect(song.artwork);
}
