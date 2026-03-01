/* ============================================================
   Oblique Strategies — App
   ============================================================ */

// --- Strategy data (classic Eno / Schmidt prompts) ---
const strategies = [
  "Honour thy error as a hidden intention",
  "What would your closest friend do?",
  "What to increase? What to reduce?",
  "Are there sections? Consider transitions",
  "Try faking it!",
  "Remove the middle, find the edges",
  "Work at a different speed",
  "Go slowly all the way round the outside",
  "A line has two sides",
  "Make a blank valuable by putting it in an exquisite frame",
  "Use an old idea",
  "State the problem in words as clearly as possible",
  "Only one element of each kind",
  "What would your closest friend do?",
  "What to increase? What to reduce?",
  "Disconnect from desire",
  "Emphasize repetitions",
  "Don't be frightened of clichés",
  "What is the reality of the situation?",
  "Simple subtraction",
  "Go outside. Shut the door.",
  "Be less critical more often",
  "Use fewer notes",
  "Breathe more deeply",
  "Give way to your worst impulse",
  "Infinitesimal gradations",
  "Change instrument roles",
  "Accretion",
  "Reverse",
  "Consult other sources — promising",
  "Consult other sources — unpromising",
  "Use an unacceptable colour",
  "Humanize something free of error",
  "Turn it upside down",
  "Courage!",
  "Twist the spine",
  "Take a break",
  "Fill every beat with something",
  "Remove specifics and convert to ambiguities",
  "Question the heroic approach",
  "Don't be afraid of things because they're easy to do",
  "Don't be frightened to display your talents",
  "Abandon normal instruments",
  "Is it finished?",
  "Put in earplugs",
  "Take away the elements in order of apparent non-importance",
  "The inconsistency principle",
  "Ghost echoes",
  "You don't have to be ashamed of using your own ideas",
  "Tidy up",
  "Do nothing for as long as possible",
  "Bridges — Loss of self-confidence",
  "Cluster analysis",
  "Always first steps",
  "Cut a vital connection",
  "Disciplined self-indulgence",
  "Discover the recipes you are using and abandon them",
  "Distorting time",
  "Do something boring",
  "Do we need holes?",
  "Emphasize differences",
  "Faced with a choice, do both",
  "From nothing to more than nothing",
  "Get your neck massaged",
  "Given the choice between two things, choose the one you haven't tried",
  "How would you have done it?",
  "In total darkness, or in a very large room, very quietly",
  "Into the impossible",
  "Is there something missing?",
  "It is quite possible (after all)",
  "Just carry on",
  "Left channel, right channel, centre channel",
  "Look at a very small object, look at its centre",
  "Look at the order in which you do things",
  "Look closely at the most embarrassing details and amplify them",
  "Lowest common denominator",
  "Make a sudden, destructive unpredictable action; incorporate",
  "Mechanize something idiosyncratic",
  "Mute and continue",
  "Not building a wall but making a brick",
  "Once the search is in progress, something will be found",
  "Only a part, not the whole",
  "Overtly resist change",
  "Remember those quiet evenings",
  "Remove ambiguities and convert to specifics",
  "Repetition is a form of change",
  "Retrace your steps",
  "Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap)",
  "Shut the door and listen from outside",
  "Spectrum analysis",
  "The most important thing is the thing most easily forgotten",
  "The tape is now the music",
  "Think of the radio",
  "Use 'unqualified' people",
  "Water",
  "What are you really thinking about just now? Incorporate",
  "What is the simplest solution?",
  "What mistakes did you make last time?",
  "What would your closest friend do?",
  "When is it for?",
  "Where is the edge?",
  "Which elements can be grouped?",
  "You are an engineer",
  "You can only make one dot at a time",
  "Imagine the piece as a set of disconnected events",
  "What context would look right?",
  "Decorate, decorate",
  "Abandon desire",
  "Define an area as 'safe' and use it as an anchor",
  "A very small object — its centre",
  "Revaluation (a warm feeling)",
  "Accept advice",
  "Adding on",
  "Ask people to work against their better judgement",
  "Balance the consistency principle with the inconsistency principle",
  "Be dirty",
  "Be extravagant",
  "Children's voices — speaking — singing",
  "Destroy — nothing — the most important thing",
  "Discard an axiom",
  "Do something sudden, destructive and unpredictable",
  "Don't stress one thing more than another",
  "Feedback recordings into an acoustic situation",
  "Go to an extreme, move back to a more comfortable place",
  "Idiot glee",
  "Intentions — credibility of — Loss of self-confidence",
  "Is the tuning appropriate?",
  "Listen to the quiet voice",
  "Lowest common denominator check — Loss of self-confidence",
  "Make an exhaustive list of everything you might do and do the last thing on the list",
  "Allow an easement (an easement is the abandonment of a stricture)",
  "Ask your body",
  "Consider different fading systems"
];

// --- State ---
let history = [];       // cards we've seen (strategy strings)
let historyPos = -1;    // current position in history
let isAnimating = false;

// --- DOM ---
const card = document.querySelector(".card");
const strategyText = document.querySelector(".strategy-text");
const overlay = document.querySelector(".overlay");
const backBtn = document.querySelector(".back-btn");
const navAbout = document.querySelector(".nav-label--tr");
const navLeft = document.querySelector(".nav-label--bl");
const navShuffle = document.querySelector(".nav-label--bc");
const navRight = document.querySelector(".nav-label--br");

// --- Pick a random strategy (avoid recent repeats) ---
function pickStrategy() {
  const recentCount = Math.min(20, Math.floor(strategies.length / 2));
  const recent = history.slice(-recentCount);
  let text;
  do {
    text = strategies[Math.floor(Math.random() * strategies.length)];
  } while (recent.includes(text) && strategies.length > recentCount);
  return text;
}

// --- Animate card transition ---
function transitionCard(newText) {
  if (isAnimating) return;
  isAnimating = true;

  card.classList.add("exiting");

  card.addEventListener("animationend", function onExit() {
    card.removeEventListener("animationend", onExit);

    strategyText.textContent = newText;

    card.classList.remove("exiting");
    card.classList.add("entering");

    card.addEventListener("animationend", function onEnter() {
      card.removeEventListener("animationend", onEnter);
      card.classList.remove("entering");
      isAnimating = false;
    });
  });
}

// --- Navigation ---
function goRight() {
  if (historyPos < history.length - 1) {
    // Move forward through history
    historyPos++;
    transitionCard(history[historyPos]);
  } else {
    // Draw new card
    var text = pickStrategy();
    history.push(text);
    historyPos = history.length - 1;
    transitionCard(text);
  }
}

function goLeft() {
  if (historyPos > 0) {
    historyPos--;
    transitionCard(history[historyPos]);
  }
}

function shuffleCard() {
  var text = pickStrategy();
  // Truncate forward history, add new card
  history = history.slice(0, historyPos + 1);
  history.push(text);
  historyPos = history.length - 1;
  transitionCard(text);
}

// --- Initial card ---
(function init() {
  var text = pickStrategy();
  history.push(text);
  historyPos = 0;
  strategyText.textContent = text;
})();

// --- Click / tap card to go right ---
card.addEventListener("click", function () {
  goRight();
});

// --- Keyboard ---
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goLeft();
  } else if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
    e.preventDefault();
    goRight();
  }
});

// --- Nav buttons ---
navRight.addEventListener("click", function (e) {
  e.stopPropagation();
  goRight();
});

navLeft.addEventListener("click", function (e) {
  e.stopPropagation();
  goLeft();
});

navShuffle.addEventListener("click", function (e) {
  e.stopPropagation();
  shuffleCard();
});

// ==========================================================
// SWIPE-UP TO REVEAL UNDERLAY (parallax sheet transition)
// ==========================================================

var underlayEl = document.querySelector(".underlay");
let pointerStartY = 0;
let pointerStartTime = 0;
let isDragging = false;
let currentTranslateY = 0;
let overlayRevealed = false;

// Map drag progress (0→1) to underlay parallax
function updateUnderlayParallax(progress) {
  // progress: 0 = fully covered, 1 = fully revealed
  var p = Math.max(0, Math.min(1, progress));
  var scale = 0.92 + 0.08 * p;     // 0.92 → 1.0
  var opacity = 0.4 + 0.6 * p;     // 0.4 → 1.0
  underlayEl.style.transform = "scale(" + scale + ")";
  underlayEl.style.opacity = opacity;
}

function clearUnderlayInlineStyles() {
  underlayEl.style.transform = "";
  underlayEl.style.opacity = "";
}

function showUnderlay() {
  overlayRevealed = true;
  // Clear inline styles so CSS transition takes over
  clearUnderlayInlineStyles();
  overlay.style.transform = "";
  overlay.classList.remove("dragging");
  overlay.classList.add("transitioning", "revealed");
  underlayEl.classList.add("active");

  overlay.addEventListener("transitionend", function onEnd(e) {
    if (e.target !== overlay) return;
    overlay.removeEventListener("transitionend", onEnd);
    overlay.classList.remove("transitioning");
  });
}

function hideUnderlay() {
  overlayRevealed = false;
  clearUnderlayInlineStyles();
  underlayEl.classList.remove("active");
  overlay.classList.add("transitioning");
  overlay.classList.remove("revealed");
  overlay.style.transform = "";

  overlay.addEventListener("transitionend", function onEnd(e) {
    if (e.target !== overlay) return;
    overlay.removeEventListener("transitionend", onEnd);
    overlay.classList.remove("transitioning", "dragging");
  });
}

function snapBack() {
  clearUnderlayInlineStyles();
  overlay.classList.remove("dragging");
  overlay.classList.add("transitioning");
  overlay.style.transform = "translateY(0)";
  overlay.addEventListener("transitionend", function onEnd(e) {
    if (e.target !== overlay) return;
    overlay.removeEventListener("transitionend", onEnd);
    overlay.classList.remove("transitioning");
    overlay.style.transform = "";
  });
}

// Pointer events for drag
overlay.addEventListener("pointerdown", function (e) {
  if (overlayRevealed) return;
  if (e.target.closest(".card")) return;
  if (e.target.closest(".nav-label")) return;

  isDragging = true;
  pointerStartY = e.clientY;
  pointerStartTime = Date.now();
  currentTranslateY = 0;
  overlay.classList.remove("transitioning");
  // Disable underlay CSS transition during drag for direct feedback
  underlayEl.style.transition = "none";
  overlay.setPointerCapture(e.pointerId);
});

overlay.addEventListener("pointermove", function (e) {
  if (!isDragging) return;

  var deltaY = e.clientY - pointerStartY;
  if (deltaY < 0) {
    currentTranslateY = deltaY;
    overlay.style.transform = "translateY(" + deltaY + "px)";

    // Parallax: map drag distance to 0→1 progress
    var progress = Math.abs(deltaY) / window.innerHeight;
    updateUnderlayParallax(progress);

    if (!overlay.classList.contains("dragging")) {
      overlay.classList.add("dragging");
    }
  }
});

overlay.addEventListener("pointerup", function () {
  if (!isDragging) return;
  isDragging = false;

  // Re-enable CSS transition on underlay
  underlayEl.style.transition = "";

  var deltaY = currentTranslateY;
  var elapsed = Date.now() - pointerStartTime;
  var velocity = Math.abs(deltaY) / elapsed;

  var threshold = window.innerHeight * 0.2;

  if (Math.abs(deltaY) > threshold || velocity > 0.5) {
    showUnderlay();
  } else {
    snapBack();
  }
});

overlay.addEventListener("pointercancel", function () {
  if (!isDragging) return;
  isDragging = false;
  underlayEl.style.transition = "";
  snapBack();
});

// About link
navAbout.addEventListener("click", function (e) {
  e.stopPropagation();
  showUnderlay();
});

// Back button
backBtn.addEventListener("click", function () {
  hideUnderlay();
});

// Desktop: scroll wheel on overlay (outside card)
overlay.addEventListener("wheel", function (e) {
  if (overlayRevealed) return;
  if (e.target.closest(".card")) return;

  if (e.deltaY < -50) {
    showUnderlay();
  }
}, { passive: true });
