const wedding = {
  date: "2026-09-12T17:30:00+03:00",
  endDate: "2026-09-12T23:00:00+03:00",
  dateText: "12 сентября 2026"
};

const dateText = document.querySelector("[data-wedding-date-text]");
if (dateText) {
  dateText.innerHTML = wedding.dateText
    .toUpperCase()
    .split("")
    .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
    .join("");
}

const countdownFields = {
  weeks: document.querySelector("[data-weeks]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const target = new Date(wedding.date).getTime();
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const weeks = Math.floor(totalSeconds / 604800);
  const days = Math.floor((totalSeconds % 604800) / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownFields.weeks.textContent = pad(weeks);
  countdownFields.days.textContent = pad(days);
  countdownFields.hours.textContent = pad(hours);
  countdownFields.minutes.textContent = pad(minutes);
  countdownFields.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const music = document.querySelector("#wedding-music");
const musicButton = document.querySelector(".music-button");
const musicText = document.querySelector(".music-text");

if (music && musicButton && musicText) {
  music.volume = 0.6;

  function setMusicState(isPlaying) {
    musicButton.classList.toggle("is-playing", isPlaying);
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute("aria-label", isPlaying ? "Поставить музыку на паузу" : "Включить музыку");
    musicText.textContent = isPlaying ? "Пауза" : "Включить музыку";
  }

  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        setMusicState(true);
      } catch {
        setMusicState(false);
      }
      return;
    }

    music.pause();
    setMusicState(false);
  });

  music.addEventListener("pause", () => setMusicState(false));
  music.addEventListener("play", () => setMusicState(true));
}
