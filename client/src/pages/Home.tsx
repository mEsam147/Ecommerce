import React from "react";
import ExploreCategory from "../components/home/ExploreCategory";
import NewArrival from "../components/home/NewArrival";
import Featured from "../components/home/Featured";

const Home: React.FC = () => {
  return (
    <div>
      <ExploreCategory />
      <NewArrival />
      <Featured />
    </div>
  );
};

export default Home;
