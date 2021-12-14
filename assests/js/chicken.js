import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from './updateCustomProperty.js';

const chickenElem = document.querySelector('[data-chicken]');
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0020;
const CHICKEN_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let chickenFrame;
let currentFrameTime;
let yVelocity;

export function setupChicken() {
  isJumping = false;
  chickenFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(chickenElem, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateChicken(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getChickenRect() {
  return chickenElem.getBoundingClientRect();
}

export function setChickenLose() {
  chickenElem.src = './assests/sprite/chicken-lose.webp';
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    chickenElem.src = './assests/sprite/chicken-stationary.webp';
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    chickenFrame = (chickenFrame + 1) % CHICKEN_FRAME_COUNT;
    chickenElem.src = './assests/sprite/chicken-run-' + chickenFrame + '.webp';
    currentFrameTime -= FRAME_TIME;
  }

  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(chickenElem, '--bottom', yVelocity * delta);

  if (getCustomProperty(chickenElem, '--bottom') <= 0) {
    setCustomProperty(chickenElem, '--bottom',  0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== 'Space' || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
