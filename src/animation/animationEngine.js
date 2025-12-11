import { movementModeling } from "../utils/movementModeling";

const markersMap = {};
const animatedState = {};
const correctionTimers = {};
export const lastFrameTime = {};

export function registerMarker(MarkerInstance, id) {
  markersMap[id] = MarkerInstance;
}

function updateMarkers(id, newLat, newLon) {
  animatedState[id].lat = newLat;
  animatedState[id].lon = newLon;
}

export function getAnimatedState(
  id,
  lat,
  lon,
  heading,
  velocity,
  lastUpdateTime
) {
  animatedState[id] = { lat, lon, heading, velocity, lastUpdateTime };
}

function getCorrectionTimers(id) {
  correctionTimers[id] = {
    startTime: performance.now(),
    finishTime: performance.now() + 1000,
  };
}

export function animate(id) {
  const now = performance.now();
  const deltaTime = now - lastFrameTime[id];
  lastFrameTime[id] = now;

  const { newLat, newLong } = movementModeling(
    animatedState[id].heading,
    animatedState[id].velocity,
    animatedState[id].lat,
    animatedState[id].lon,
    deltaTime
  );
  animatedState[id].lat = newLat;
  animatedState[id].lon = newLong;
  markersMap[id].setLatLng([newLat, newLong]);

  requestAnimationFrame(() => animate(id));
}
