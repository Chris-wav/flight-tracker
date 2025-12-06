import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

// cache για τα δεδομένα των πτήσεων
let cache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 20000; // 20 δευτερόλεπτα

app.get("/api/flights", async (req, res) => {
  const now = Date.now();

  // 1. Αν έχουμε cache και ΔΕΝ έχει λήξει → γύρνα την
  if (cache && now - lastFetchTime < CACHE_DURATION) {
    return res.json(cache);
  }

  // 2. Αλλιώς φέρε νέα δεδομένα από OpenSky
  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all?lamin=34&lomin=19&lamax=42&lomax=29"
    );

    // 3. Αποθήκευση στο cache
    cache = response.data;
    lastFetchTime = now;

    return res.json(cache);
  } catch (error) {
    console.error("OpenSky API Error:", error.message);

    // 4. Αν έχουμε παλιά cache, δώστην αντί για error
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
