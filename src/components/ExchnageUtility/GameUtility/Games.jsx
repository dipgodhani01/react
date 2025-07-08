import React, { useState, useEffect } from "react";
import "./GameUtility.css"; // Import the CSS file for styles
import { MdLiveTv } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  formatDateToRelative,
  formatDateToUTC,
} from "../../../api/ClientFunction";
import { useNavRoute } from "../../../context/navRoute";
import { useAuth } from "../../../context/AuthContext";

function OddsContainer({ marketId, oddsSports }) {
  const { handleOpenLogin } = useNavRoute();
  const filteredOdds =
    oddsSports?.data?.find((item) => item?.marketId === marketId)?.runners ||
    [];
  const teamOne = filteredOdds?.length > 0 ? filteredOdds[0] : [];
  const teamTwo = filteredOdds?.length > 1 ? filteredOdds[1] : [];
  const draw = filteredOdds?.length > 2 ? filteredOdds[2] : [];

  const { isLogin } = useAuth();
  const openLogin = () => {
    if (!isLogin) {
      handleOpenLogin();
    }
  };
  return (
    <>
      <div className="game_name_odds">
        <div className="game_name_odds-value">
          <p onClick={openLogin}>
            {teamOne?.ex?.availableToBack[0]?.price || "-"}
            <span> {teamOne?.ex?.availableToBack[0]?.size || "-"}</span>
          </p>
          <p onClick={openLogin}>
            {teamOne?.ex?.availableToLay[0]?.price || "-"}
            <span> {teamOne?.ex?.availableToLay[0]?.size || "-"}</span>
          </p>
        </div>
        <div className="game_name_odds-value">
          <p onClick={openLogin}>
            {draw?.ex?.availableToBack[0]?.price || "-"}
            <span> {draw?.ex?.availableToBack[0]?.size || "-"}</span>
          </p>
          <p onClick={openLogin}>
            {draw?.ex?.availableToLay[0]?.price || "-"}
            <span> {draw?.ex?.availableToLay[0]?.size || "-"}</span>
          </p>
        </div>
        <div className="game_name_odds-value">
          <p onClick={openLogin}>
            {teamTwo?.ex?.availableToBack[0]?.price || "-"}
            <span> {teamTwo?.ex?.availableToBack[0]?.size || "-"}</span>
          </p>
          <p onClick={openLogin}>
            {teamTwo?.ex?.availableToLay[0]?.price || "-"}
            <span> {teamTwo?.ex?.availableToLay[0]?.size || "-"}</span>
          </p>
        </div>
      </div>
    </>
  );
}
const Games = ({ sportsData, indvSportsData, gametype }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("InPlay");
  const { handleOpenLogin, activeNavRoute } = useNavRoute();

  const openLogin = () => {
    if (location.pathname === "/signin") {
      handleOpenLogin();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => (prev === "InPlay" ? "OutPlay" : "InPlay"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filterSportData =
    gametype === "Basketball"
      ? sportsData?.filter((game) => game?.name === "NBA")
      : sportsData;

  return (
    <>
      {filterSportData.length > 0 ? (
        <div className="exchange_page_container">
          {filterSportData?.map((market, index) => (
            <div
              key={index}
              className="game_container"
              // onClick={() =>
              //   navigate(
              //     `/exchange_details?marketId=${market?.marketId}&eventId=${market?.version}&time=${market?.marketStartTime}&marketName=${market?.marketName}&matchName=${market?.name}`
              //   )
              // }
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  zIndex: "0",
                }}
              >
                <div className="game_status_live">
                  <p className="status_text" onClick={openLogin}>
                    {market?.inplay === true ? "INPLAY" : "UPCOMING"}
                    <span>
                      {
                        formatDateToUTC(market?.marketStartTime)?.split(
                          "/"
                        )?.[0]
                      }
                    </span>
                    <span>
                      {
                        formatDateToUTC(market?.marketStartTime)?.split(
                          "/"
                        )?.[2]
                      }
                    </span>
                  </p>
                </div>
                <div className="game_name_bet">
                  <p onClick={openLogin}>
                    <span>{market.marketName.split("v")[0]}</span>
                  </p>
                  <p
                    style={{
                      color: "#FF7C99",
                      fontWeight: "600",
                    }}
                  >
                    {market?.name}
                  </p>
                </div>
                <div className="game_name_status tvforPhone">
                  <p className="live">
                    {market?.inplay === true ? (
                      <span>
                        <MdLiveTv />
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>

              <div className="game_name_bet_container">
                <div className="game_name_status tvforPc">
                  <p className="live">
                    {market?.inplay === true ? (
                      <span>
                        <MdLiveTv />
                      </span>
                    ) : null}
                  </p>
                </div>
                <OddsContainer
                  marketId={market?.marketId}
                  oddsSports={indvSportsData}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="datanotfound">
          <img
            src="https://bc.co/assets/common/empty.png"
            alt="No Data Found"
          />
          <p>Oops! There is no data yet!</p>
        </div>
      )}
    </>
  );
};

export default Games;
