const VERTICAL_STATUS_MAP = {
  1: "Ascending",
  0: "Cruising",
  "-1": "Descending",
};

export const getVerticalRate = (verticalRate) => {
  return VERTICAL_STATUS_MAP[Math.sign(verticalRate)];
};

