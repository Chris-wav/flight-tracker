const DIRECTION_MAP = ["N", "N/E", "E", "S/E", "S", "S/W", "W", "N/W"];

export const getDirection = (heading) => {
  return DIRECTION_MAP[Math.floor(((heading + 22.5) / 45) % 8)];
};
