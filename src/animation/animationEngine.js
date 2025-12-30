import { movementModeling } from "../utils/movementModeling";

// Runtime registries (outside React state for performance)
const markersMap = {};
const animatedState = {};
export const lastFrameTime = {};
const rafIds = {};

// Start animation only when marker + valid state exist
function startIfReady(id) {
  if (rafIds[id]) return;

  const marker = markersMap[id];
  const state = animatedState[id];
  if (!marker || !state || state.lat == null || state.lon == null) return;

  // Initialize frame timing to avoid zero delta
  lastFrameTime[id] = performance.now();
  rafIds[id] = requestAnimationFrame(() => animate(id));
}

// Stop RAF loop and clean timing refs
function stop(id) {
  if (rafIds[id]) {
    cancelAnimationFrame(rafIds[id]);
    delete rafIds[id];
  }
  delete lastFrameTime[id];
}

// Register Leaflet marker instance
export function registerMarker(markerInstance, id) {
  markersMap[id] = markerInstance;
  startIfReady(id);
}

// Remove marker and animation state
export function unregisterMarker(id) {
  delete markersMap[id];
  delete animatedState[id];
  stop(id);
}

// Update animation state from API data
export function getAnimatedState(
  id,
  lat,
  lon,
  heading,
  velocity,
  lastUpdateTime
) {
  // Invalid coordinates -> stop animation
  if (lat == null || lon == null) {
    delete animatedState[id];
    stop(id);
    return;
  }

  const prev = animatedState[id];

  animatedState[id] = {
    lat,
    lon,
    heading,
    velocity,
    lastUpdateTime,
  };

  // Reset timing after long API gaps to prevent jumps
  if (
    prev?.lastUpdateTime != null &&
    lastUpdateTime != null &&
    lastUpdateTime - prev.lastUpdateTime > 2000
  ) {
    lastFrameTime[id] = performance.now();
  }

  startIfReady(id);
}

// RAF-driven animation loop
export function animate(id) {
  const marker = markersMap[id];
  const state = animatedState[id];
  if (!marker || !state || state.lat == null || state.lon == null) {
    stop(id);
    return;
  }

  const now = performance.now();
  const prev = lastFrameTime[id] ?? now;
  let deltaTime = now - prev;

  // Clamp to avoid jumps (inactive tabs / lag)
  deltaTime = Math.min(Math.max(deltaTime, 16), 250);
  lastFrameTime[id] = now;

  const { newLat, newLon } = movementModeling(
    state.heading,
    state.velocity,
    state.lat,
    state.lon,
    deltaTime
  );

  if (newLat == null || newLon == null) {
    stop(id);
    return;
  }

  state.lat = newLat;
  state.lon = newLon;
  marker.setLatLng([newLat, newLon]);

  rafIds[id] = requestAnimationFrame(() => animate(id));
}
