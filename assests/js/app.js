import { updateGround, setupGround } from './ground.js';
import { updateChicken, setupChicken, getChickenRect, setChickenLose } from './chicken.js';
import { updatePinecone, setupPinecone, getPineconeRects} from './pinecone.js';


const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector('[data-world]');
const scoreElement = document.querySelector('[data-score]');
const startScreenElem = document.querySelector('[data-start-screen]');


setPixelToWorldScale();
// Set the exact size
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function update(time) {
    // Set to actual time before add to delta time
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return
    }

    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateChicken(delta, speedScale);
    updatePinecone(delta, speedScale);
    updateSpeedScale(delta, speedScale);
    updateScore(delta, score);

    if( checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkLose () {
    const chickenRect = getChickenRect();
    return getPineconeRects().some(rect => isCollision(rect, chickenRect));
}

function isCollision (rect1, rect2) {
    return (
    rect1.left < rect2.right && 
    rect1.top < rect2.bottom && 
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
    )
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
    score += delta * 0.1
    scoreElement.textContent = 'SCORE: ' + Math.floor(score);
}

function handleStart() {
    startScreenElem.classList.add('hide');
    lastTime = null;
    score = 0;
    speedScale = 1;
    setupGround();
    setupChicken();
    setupPinecone();
    window.requestAnimationFrame(update);
}

function handleLose() {
    setChickenLose()
    setTimeout(() => {
      document.addEventListener("keydown", handleStart, { once: true })
      startScreenElem.classList.remove("hide")
    }, 100)
  }

function setPixelToWorldScale() {
    let worldToPixelScale;

    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / window.WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}