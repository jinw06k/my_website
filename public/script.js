function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const texts = [
    "Jin Wook Shin",
    "2nd Year in\nComputer Engineering",
    "taking\nEECS 216, 373, 442",
    "EECS 545 Grader",
    "VP of KISA",
    "into rock-climbing",
    "self-studying LLM",
];

let currentIndex = 0;

const titleElement = document.querySelector(".name-title");

function updateText() {
    currentIndex = (currentIndex + 1) % texts.length; 
    titleElement.textContent = texts[currentIndex];
}

titleElement.addEventListener("click", updateText);
