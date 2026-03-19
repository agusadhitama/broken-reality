const storyEl = document.getElementById("story");
const btn = document.getElementById("nextBtn");
const nameInput = document.getElementById("nameInput");

// audio
const bgSound = document.getElementById("bgSound");
const glitchSound = document.getElementById("glitchSound");
const whisperSound = document.getElementById("whisperSound");

let step = 0;
let userName = "User";

// 🎧 play background sound once
document.body.addEventListener("click", () => {
  bgSound.volume = 0.2;
  bgSound.play();
}, { once: true });

// 💻 fake console
function log(msg) {
  const consoleEl = document.getElementById("console");
  consoleEl.innerHTML += `<p>> ${msg}</p>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

// 🔤 glitch text
function glitchText(text) {
  const chars = "!@#$%^&*()_+=-[]{}";
  return text.split("").map(c => {
    return Math.random() > 0.85
      ? chars[Math.floor(Math.random() * chars.length)]
      : c;
  }).join("");
}

// ⚡ screen glitch
function screenGlitch() {
  document.body.classList.add("flash");
  glitchSound.currentTime = 0;
  glitchSound.play();

  setTimeout(() => {
    document.body.classList.remove("flash");
  }, 150);
}

// 😈 whisper
function whisper() {
  whisperSound.currentTime = 0;
  whisperSound.volume = 0.4;
  whisperSound.play();
}

// 💥 shake
function shake() {
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 200);
}

// 🖱️ detect idle / movement
let moved = false;
document.addEventListener("mousemove", () => {
  moved = true;
});

// 🎬 STORY FLOW
btn.onclick = () => {

  // STEP 0
  if (step === 0) {
    userName = nameInput.value || "User";
    storyEl.innerText = "Mendeteksi user...";
    log("Scanning...");
  }

  // STEP 1
  if (step === 1) {
    storyEl.innerText = `Halo, ${userName}...`;
    log("User identified");
  }

  // STEP 2
  if (step === 2) {
    storyEl.innerText = "Kamu datang lebih cepat dari yang diperkirakan.";
  }

  // STEP 3
  if (step === 3) {
    storyEl.innerText = glitchText("Atau... kamu selalu di sini ?");
    storyEl.classList.add("glitch");
    screenGlitch();
  }

  // STEP 4
  if (step === 4) {
    storyEl.classList.remove("glitch");
    storyEl.innerText = "Jangan klik lagi.";
  }

  // STEP 5
  if (step === 5) {
    storyEl.innerText = "Aku serius.";
    shake();
  }

  // STEP 6
  if (step === 6) {
    storyEl.innerText = glitchText("Kenapa kamu tetap lanjut ?");
    document.body.style.background = "darkred";
    whisper();
  }

  // STEP 7
  if (step === 7) {
    storyEl.innerText = "Kamu pikir kamu pakai website ini...";
  }

  // STEP 8
  if (step === 8) {
    storyEl.innerText = glitchText("Padahal aku yang mengamati kamu.");
    screenGlitch();
    log("Tracking behavior...");
  }

  // STEP 9
  if (step === 9) {
    storyEl.innerText = "Dari awal.";
    shake();
  }

  // STEP 10 (INTERACTION TEST)
  if (step === 10) {
    moved = false;
    storyEl.innerText = "Coba kamu diam sebentar...";

    setTimeout(() => {
      if (moved) {
        storyEl.innerText = "Kamu tidak bisa diam ya...";
        whisper();
      } else {
        storyEl.innerText = "Nah... Begitu.";
      }
    }, 3000);
  }

  // STEP 11 (ENDING)
  if (step === 11) {
    storyEl.innerText = glitchText("Kita ulang dari awal ya...");
    screenGlitch();

    setTimeout(() => {
      location.reload();
    }, 4000);
  }

  step++;
};

// 👁️ random whisper (creepy ambient)
setInterval(() => {
  if (Math.random() > 0.85) {
    whisper();
  }
}, 20000);

// ⚠️ random glitch event
setInterval(() => {
  if (Math.random() > 0.9) {
    screenGlitch();
  }
}, 15000);

// 🖱️ cursor disturbance
document.addEventListener("mousemove", () => {
  if (Math.random() > 0.97) {
    document.body.style.cursor = "none";
    setTimeout(() => {
      document.body.style.cursor = "default";
    }, 300);
  }
});

// 💻 fake system logs
setInterval(() => {
  if (Math.random() > 0.7) {
    log("WARNING: Unknown behavior detected...");
  }
}, 10000);