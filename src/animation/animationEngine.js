import { movementModeling } from "../utils/movementModeling";

const markersMap = {};
const animatedState = {};
const correctionTimers = {};

function registerMarker(MarkerInstance, id) {
  markersMap[id] = MarkerInstance;
}

function updateMarkers(id, newLat, newLong) {
  animatedState[id].lat = newLat;
  animatedState[id].long = newLong;
}

function getAnimatedState(id, lat, lon, heading, velocity, lastUpdateTime) {
  animatedState[id] = { lat, lon, heading, velocity, lastUpdateTime };
}

function getCorrectionTimers(id) {
  correctionTimers[id] = { startTime: now(), finishTime: now() + 1000 };
}

function animate(id) {
  now = now();
  deltaTime = now - lastFrameTime;
  lastFrameTime = now;

  const { newLat, newLong } = movementModeling(
    heading,
    velocity,
    currentAnimatedLat,
    currentAnimatedLon,
    deltaTime
  );
  animatedState[id].lat = newLat;
  animatedState[id].long = newLong;
  markersMap[id].setLatLng([newLat, newLong]);

  requestAnimationFrame(animate);
}
