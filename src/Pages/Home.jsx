import { useEffect } from "react";
import Map from "../Map/Map";
import useFlightsQuery from "../Services/useFlightsQuery";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, isLoading, error } = useQuery(useFlightsQuery());

  return (
    <div className="flex flex-col h-full w-full">
      <Map flights={data} />
    </div>
  );
};

export default Home;
