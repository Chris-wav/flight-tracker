const POSITION_SOURCE_MAP = {
  0: "ADS-B",
  1: "ASTERIX",
  2: "MLAT",
  3: "FLARM",
};

export const getPositionSource = (source) => {
  return POSITION_SOURCE_MAP[source] ?? "Unknown";
};
