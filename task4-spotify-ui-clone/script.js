// DOM Elements Selection
const playPauseBtn = document.querySelector('.play-pause-btn');
const progressBar = document.querySelector('.progress-bar');
const currTimeEl = document.querySelector('.curr-time');
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.querySelector('.controls .fa-volume-high');

const albumImg = document.querySelector('.album-img');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const musicCards = document.querySelectorAll('.card');

// Global Track State ManagementVariables
let isPlaying = false;
let currentSeconds = 0;
const totalSeconds = 213; // 3:33 in absolute seconds
let playbackInterval = null;

/**
 * Converts integer seconds into a structured MM:SS display layout
 * @param {number} totalSecs - Absolute seconds count
 * @return {string} Formatted output string
 */
function formatTime(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function handlePlaybackProgress() {
    if (currentSeconds < totalSeconds) {
        currentSeconds++;
        // Sync range slider position percent
        progressBar.value = (currentSeconds / totalSeconds) * 100;
        // Sync UI display clock metrics
        currTimeEl.textContent = formatTime(currentSeconds);
    } else {
        // Track completed -> Reset state completely
        togglePlayState(false);
        currentSeconds = 0;
        progressBar.value = 0;
        currTimeEl.textContent = "0:00";
    }
}

function togglePlayState(shouldPlay) {
    isPlaying = shouldPlay;
    if (isPlaying) {
        // Switch icon class from circle-play to circle-pause
        playPauseBtn.classList.remove('fa-circle-play');
        playPauseBtn.classList.add('fa-circle-pause');
        playPauseBtn.style.color = '#1db954'; // Spotify Iconic Accent Green
        // Initiate step intervals
        playbackInterval = setInterval(handlePlaybackProgress, 1000);
    } else {
        // Switch back to target default configuration
        playPauseBtn.classList.remove('fa-circle-pause');
        playPauseBtn.classList.add('fa-circle-play');
        playPauseBtn.style.color = '#ffffff';
        // Kill background process threads securely
        clearInterval(playbackInterval);
    }
}

// Event Listener: Centralized Play/Pause Controls Trigger
playPauseBtn.addEventListener('click', () => {
    togglePlayState(!isPlaying);
});

// Event Listener: User Scrubs/Updates Progress Bar Timeline Manual Override
progressBar.addEventListener('input', () => {
    const targetPercent = progressBar.value;
    currentSeconds = Math.floor((targetPercent / 100) * totalSeconds);
    currTimeEl.textContent = formatTime(currentSeconds);
});

// Event Listener: Interactive Card Selection Core Updates
musicCards.forEach(card => {
    card.addEventListener('click', () => {
        // Extract structural values embedded in elements safely
        const targetedTitle = card.querySelector('.card-title').textContent;
        const targetedImgSrc = card.querySelector('.card-img').getAttribute('src');
        // Map data transformations instantly to the lower playback footer dashboard panel
        songTitle.textContent = targetedTitle;
        albumImg.src = targetedImgSrc;
        // Simple mock assignment variation mapping rules based on catalog context
        if (targetedTitle.includes("Global")) {
            songArtist.textContent = "Top Global Artists";
        } else if (targetedTitle.includes("Mega")) {
            songArtist.textContent = "Various Artists";
        } else {
            songArtist.textContent = "Lofi Sleep Beats Project";
        }
        // Instant play auto-start invocation override configuration
        currentSeconds = 0;
        progressBar.value = 0;
        currTimeEl.textContent = "0:00";
        clearInterval(playbackInterval);
        togglePlayState(true);
    });
});

// Event Listener: Adaptive Volume Control Node Tweaks
volumeBar.addEventListener('input', () => {
    const vol = volumeBar.value;
    if (vol == 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark control-icon';
    } else if (vol < 50) {
        volumeIcon.className = 'fa-solid fa-volume-low control-icon';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high control-icon';
    }
});