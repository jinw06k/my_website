function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const texts = [
    "Jin Wook Shin",
    "2nd year in Computer Engineering",
    "Taking EECS 216,373,445",
    "VP of KISA",
    "Listening to J-POP",
    "EECS 545 Grader",
    "Into rock-climbing",
    "Self-studying LLM",
];

let currentIndex = 0;

const titleElement = document.querySelector(".name-title");

function updateText() {
    currentIndex = (currentIndex + 1) % texts.length; 
    titleElement.textContent = texts[currentIndex];
}

titleElement.addEventListener("click", updateText);
