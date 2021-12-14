import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from './updateCustomProperty.js';

const SPEED = 0.05;
const PINECONE_INTERVAL_MIN = 500;
const PINECONE_INTERVAL_MAX = 2000;

const worldElem = document.querySelector('[data-world');

let nextPineconeTime;

export function setupPinecone() {
  nextPineconeTime = PINECONE_INTERVAL_MIN;
  document.querySelectorAll('[data-pinecone]').forEach((pinecone) => {
    pinecone.remove();
  });
}

export function updatePinecone(delta, speedScale) {
    document.querySelectorAll("[data-pinecone]").forEach(pinecone => {
      incrementCustomProperty(pinecone, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(pinecone, "--left") <= -100) {
        pinecone.remove()
      }
    })
  
    if (nextPineconeTime <= 0) {
      createPinecone()
      nextPineconeTime =
        randomNumberBetween(PINECONE_INTERVAL_MIN, PINECONE_INTERVAL_MAX) / speedScale
    }
    nextPineconeTime -= delta
  }

export function getPineconeRects() {
    return [...document.querySelectorAll("[data-pinecone]")].map(pinecone => {
      return pinecone.getBoundingClientRect()
    })
  }

function createPinecone() {
    const pinecone = document.createElement("img")
    pinecone.dataset.pinecone = true
    pinecone.src = "./assests/sprite/pinecone.webp"
    pinecone.classList.add("pinecone")
    setCustomProperty(pinecone, "--left", 100)
    worldElem.append(pinecone)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }