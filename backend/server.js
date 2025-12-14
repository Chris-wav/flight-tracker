import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

let cache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 20000;

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
  } catch (error) {
    console.error("OpenSky API Error:", error.message);

    if (cache) {
      return res.json(cache);
    }

    return res.status(error.response?.status || 500).json({
      error: "Failed to fetch flights from OpenSky",
      details: error.message,
    });
  }
});

app.listen(4000, () => {
  console.log("Backend server running at http://localhost:4000");
});
