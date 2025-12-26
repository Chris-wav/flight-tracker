import axios from "axios";

const API_URL = "http://localhost:4000/api/flights";
const API_FOR_ROUTE_INFO_URL = "http://localhost:4000/api/flights/aircraft";

export const fetchFlights = async () => {
  try {
    console.log("🚨 FETCH to OpenSky!");

    const response = await axios.get(API_URL, {});
    console.log(response);

    return response.data.states
      .filter((flight) => flight[5] !== null && flight[6] !== null)
      .map((flight) => ({
        icao24: flight[0],
        callsign: flight[1]?.trim() || null,
        originCountry: flight[2],
        timePosition: flight[3],
        lastContact: flight[4],
        longitude: flight[5],
        latitude: flight[6],
        baroAltitude: flight[7],
        onGround: flight[8],
        velocity: flight[9],
        trueTrack: flight[10],
        verticalRate: flight[11],
        sensors: flight[12],
        geoAltitude: flight[13],
        squawk: flight[14],
        spi: flight[15],
        positionSource: flight[16],
      }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRouteInfo = async (icao24) => {
  console.log("🚨 FETCH to OpenSky!");

  const response = await axios.get(API_FOR_ROUTE_INFO_URL, {
    params: { icao24 },
  });

  console.log(response.data);
  return response.data;
};
