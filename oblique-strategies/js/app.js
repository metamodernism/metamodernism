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
let recentIndices = [];
let isAnimating = false;

// --- DOM ---
const card = document.querySelector(".card");
const strategyText = document.querySelector(".strategy-text");
const overlay = document.querySelector(".overlay");
const backBtn = document.querySelector(".back-btn");
const cornerAbout = document.querySelector(".corner-tr");
const cornerShuffle = document.querySelector(".corner-br");

// --- Pick a random strategy (avoid recent repeats) ---
function pickStrategy() {
  const maxRecent = Math.min(20, Math.floor(strategies.length / 2));
  let idx;
  do {
    idx = Math.floor(Math.random() * strategies.length);
  } while (recentIndices.includes(idx));

  recentIndices.push(idx);
  if (recentIndices.length > maxRecent) {
    recentIndices.shift();
  }
  return strategies[idx];
}

// --- Display a new card with animation ---
function shuffleCard() {
  if (isAnimating) return;
  isAnimating = true;

  // Exit animation
  card.classList.add("exiting");

  card.addEventListener("animationend", function onExit() {
    card.removeEventListener("animationend", onExit);

    // Swap text while invisible
    strategyText.textContent = pickStrategy();

    // Enter animation
    card.classList.remove("exiting");
    card.classList.add("entering");

    card.addEventListener("animationend", function onEnter() {
      card.removeEventListener("animationend", onEnter);
      card.classList.remove("entering");
      isAnimating = false;
    });
  });
}

// --- Initial card ---
strategyText.textContent = pickStrategy();

// --- Click / tap to shuffle ---
card.addEventListener("click", function (e) {
  // Don't shuffle if clicking the About corner
  if (e.target === cornerAbout) return;
  shuffleCard();
});

// --- Keyboard: any key shuffles ---
document.addEventListener("keydown", function (e) {
  if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
    e.preventDefault();
    shuffleCard();
  }
});

// --- Corner: Shuffle ---
cornerShuffle.addEventListener("click", function (e) {
  e.stopPropagation();
  shuffleCard();
});

// ==========================================================
// SWIPE-UP TO REVEAL UNDERLAY
// ==========================================================

let pointerStartY = 0;
let pointerStartTime = 0;
let isDragging = false;
let currentTranslateY = 0;
let overlayRevealed = false;

function showUnderlay() {
  overlayRevealed = true;
  overlay.style.transform = "";
  overlay.classList.add("transitioning", "revealed");
}

function hideUnderlay() {
  overlayRevealed = false;
  overlay.classList.add("transitioning");
  overlay.classList.remove("revealed");
  overlay.style.transform = "";
  // Clean up transitioning class after animation
  overlay.addEventListener("transitionend", function onEnd() {
    overlay.removeEventListener("transitionend", onEnd);
    overlay.classList.remove("transitioning");
  });
}

function snapBack() {
  overlay.classList.add("transitioning");
  overlay.style.transform = "translateY(0)";
  overlay.addEventListener("transitionend", function onEnd() {
    overlay.removeEventListener("transitionend", onEnd);
    overlay.classList.remove("transitioning");
    overlay.style.transform = "";
  });
}

// Pointer events for drag
overlay.addEventListener("pointerdown", function (e) {
  if (overlayRevealed) return;
  // Ignore if clicking card or interactive elements
  if (e.target.closest(".card")) return;

  isDragging = true;
  pointerStartY = e.clientY;
  pointerStartTime = Date.now();
  currentTranslateY = 0;
  overlay.classList.remove("transitioning");
  overlay.setPointerCapture(e.pointerId);
});

overlay.addEventListener("pointermove", function (e) {
  if (!isDragging) return;

  const deltaY = e.clientY - pointerStartY;
  // Only allow upward drag (negative)
  if (deltaY < 0) {
    currentTranslateY = deltaY;
    overlay.style.transform = "translateY(" + deltaY + "px)";
  }
});

overlay.addEventListener("pointerup", function (e) {
  if (!isDragging) return;
  isDragging = false;

  const deltaY = currentTranslateY;
  const elapsed = Date.now() - pointerStartTime;
  const velocity = Math.abs(deltaY) / elapsed; // px/ms

  const threshold = window.innerHeight * 0.2;

  if (Math.abs(deltaY) > threshold || velocity > 0.5) {
    showUnderlay();
  } else {
    snapBack();
  }
});

overlay.addEventListener("pointercancel", function () {
  if (!isDragging) return;
  isDragging = false;
  snapBack();
});

// Corner: About link
cornerAbout.addEventListener("click", function (e) {
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
