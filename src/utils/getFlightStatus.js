const STATUS_MAP = {
  true: "LANDED",
  false: "EN ROUTE",
};

export const getFlightStatus = (selectedFlight) => {
  console.log(selectedFlight);

  return STATUS_MAP[selectedFlight?.onGround] || "Unknown";
};
