import React, { useEffect, useState } from "react";
import GamelistSlider from "../components/GamelistSlider/GamelistSlider";
import Game from "../components/ExchnageUtility/GameUtility/Games";
import Slider from "../components/Slider/Slider";
import GamenewListSlider from "../components/GamelistSlider/GamenewListSlider";
import { fetchData } from "../api/ClientFunction";
import useSWR from "swr";
import { use } from "react";

const Exchange = () => {
  const [gametype, setGametype] = useState("Tennis");
  const [sportsData, setSportsData] = useState([]);
  const [game, setgame] = useState("NFL");

  const handlegameName = (gname) => {
    setGametype(gname);
  };

  const getSingleSportsData = async (game) => {
    setgame(game);
  };

  // console.log("this is our gametype state", gametype);

  const { data, error } = useSWR(
    gametype ? `/sports/get-allmatch-by-sportname?sport=${game}` : null,
    fetchData,
    { refreshInterval: 1000 }
  );
  const { data: indvSportsData, indvSportsDataerror } = useSWR(
    gametype ? `/sports/get-odds-by-sportname?sport=${gametype}` : null,
    fetchData,
    { refreshInterval: 5000 }
  );



  useEffect(() => {
    getSingleSportsData(gametype);
  }, [gametype]);

  useEffect(() => {
    if (data && data?.data) {
      setSportsData(data?.data);
    }
  }, [data]);

  return (
    <div
      style={{
        color: "#fff",
        padding: "8px 5px",
      }}
    >
      <Slider />
      {/* <GamelistSlider titles={"Live"} /> */}
      <GamelistSlider titles={"Live"} handlegameName={handlegameName} />
      <p className="exchange_page_container_header">
        No Limit Sports Betting Exchanges
      </p>
      <div className="game_exchange_odds_container">
        <Game sportsData={sportsData} indvSportsData={indvSportsData} gametype= {gametype} />
        
       
      </div>
    </div>
  );
};

export default Exchange;
