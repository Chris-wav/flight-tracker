import { FlightsContextProvider } from "../Context/FlightsContext";
import { MapContextProvider } from "../Context/MapContext";
import { UIContextProvider } from "../Context/UIContext";
import HomeLayout from "./HomeLayout";

const Home = () => {
  return (
    <div className="flex  h-full w-full">
      <FlightsContextProvider>
        <MapContextProvider>
          <UIContextProvider>
            <HomeLayout />
          </UIContextProvider>
        </MapContextProvider>
      </FlightsContextProvider>
    </div>
  );
};

export default Home;
