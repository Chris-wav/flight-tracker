import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
app.use(cors());

let cache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 20_000;

/**
 * Proxy endpoint for aircraft route information.
 * Fetches recent departure/arrival data for a specific aircraft.
 */
app.get("/api/flights/aircraft", async (req, res) => {
  try {
    const { icao24 } = req.query;

    if (!icao24) {
      return res.status(400).json({ error: "icao24 is required" });
    }

    const end = Math.floor(Date.now() / 1000);
    const begin = end - 60 * 60 * 12;

    const response = await axios.get(
      "https://opensky-network.org/api/flights/aircraft",
      {
        params: { icao24, begin, end },
        auth: {
          username: process.env.OPENSKY_USER,
          password: process.env.OPENSKY_PASS,
        },
        timeout: 10_000,
      }
    );

    const flights = response.data;

    if (!Array.isArray(flights) || flights.length === 0) {
      return res.json({
        departure: null,
        arrival: null,
        firstSeen: null,
        lastSeen: null,
      });
    }

    const currentFlight =
      flights.find((f) => f.lastSeen === null) ||
      flights.sort((a, b) => b.firstSeen - a.firstSeen)[0];

    return res.json({
      departure: currentFlight.estDepartureAirport || null,
      arrival: currentFlight.estArrivalAirport || null,
      firstSeen: currentFlight.firstSeen || null,
      lastSeen: currentFlight.lastSeen || null,
    });
  } catch {
    return res.json({
      departure: null,
      arrival: null,
      firstSeen: null,
      lastSeen: null,
    });
  }
});

/**
 * Proxy endpoint for live flight states.
 * Uses short-term in-memory caching to reduce API load.
 */
app.get("/api/flights", async (req, res) => {
  const now = Date.now();

  if (cache && now - lastFetchTime < CACHE_DURATION) {
    return res.json(cache);
  }

  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all"
    );

    cache = response.data;
    lastFetchTime = now;

    return res.json(cache);
  } catch {
    if (cache) {
      return res.json(cache);
    }

    return res.status(500).json({
      error: "Failed to fetch flights from OpenSky",
    });
  }
});

app.listen(4000, () => {
  console.log("Backend server running on http://localhost:4000");
});
