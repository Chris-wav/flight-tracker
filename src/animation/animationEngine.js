import { movementModeling } from "../utils/movementModeling";

const markersMap = {};
const animatedState = {};
export const lastFrameTime = {};
const rafIds = {};

export function registerMarker(markerInstance, id) {
  markersMap[id] = markerInstance;
  lastFrameTime[id] = performance.now();
}

export function unregisterMarker(id) {
  delete markersMap[id];
  delete animatedState[id];
  delete lastFrameTime[id];

  if (rafIds[id]) {
    cancelAnimationFrame(rafIds[id]);
    delete rafIds[id];
  }
}

export function getAnimatedState(
  id,
  lat,
  lon,
  heading,
  velocity,
  lastUpdateTime
) {
  animatedState[id] = {
    lat,
    lon,
    heading,
    velocity,
    lastUpdateTime,
  };

  if (!lastFrameTime[id]) {
    lastFrameTime[id] = performance.now();
  }
}

export function animate(id) {
  if (!markersMap[id] || !animatedState[id]) return;

  const now = performance.now();

  if (!lastFrameTime[id]) {
    lastFrameTime[id] = now;
    rafIds[id] = requestAnimationFrame(() => animate(id));
    return;
  }

  const deltaTime = now - lastFrameTime[id];
  lastFrameTime[id] = now;

  const state = animatedState[id];

  const { newLat, newLon } = movementModeling(
    state.heading,
    state.velocity,
    state.lat,
    state.lon,
    deltaTime
  );

  // update internal state
  state.lat = newLat;
  state.lon = newLon;

  // update marker
  markersMap[id].setLatLng([newLat, newLon]);

  rafIds[id] = requestAnimationFrame(() => animate(id));
}
