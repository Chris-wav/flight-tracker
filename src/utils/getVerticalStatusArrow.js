const ARROW_MAP = {
  1: "↗",
  0: "→",
  "-1": "↘",
};

export const getVerticalArrow = (verticalRate) => {
  return ARROW_MAP[Math.sign(verticalRate)];
};
