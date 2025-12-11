import Map from "../Map/Map";
import { FlightsContextProvider } from "../Context/FlightsContext";
import { MapContextProvider } from "../Context/MapContext";

const Home = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <FlightsContextProvider>
        <MapContextProvider>
          <Map />
        </MapContextProvider>
      </FlightsContextProvider>
    </div>
  );
};

export default Home;
