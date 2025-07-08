import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import icon from "../../assets/coin.png";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import {
  FaBasketballBall,
  FaFootballBall,
  FaBaseballBall,
} from "react-icons/fa";
import { GiTennisRacket, GiSoccerBall } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import { MdSportsKabaddi, MdSportsMartialArts } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { PiBoxingGloveFill, PiCricketBold } from "react-icons/pi";
import { CiBasketball } from "react-icons/ci";
import { FaTableTennis } from "react-icons/fa";
import { MdSportsEsports } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { BiGift } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { FaBaseball, FaPeopleGroup, FaConfluence } from "react-icons/fa6";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavRoute } from "../../context/navRoute";
import { RiBoxingLine } from "react-icons/ri";
import { useTab } from "../../context/TabContext";
import { useAuth } from "../../context/AuthContext";
import {
  useMultipleSports,
  useMultipleUpSports,
} from "../../api/AllSportsData";
import { useMultipleExchSport } from "../../api/AllExchange";

export const Sidebar = ({ handlePopup }) => {
  const { user } = useAuth();
  const { setActiveGameId } = useTab();
  const { handleNavRoute, liveUpcome } = useNavRoute();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const { handleOpenLogin } = useNavRoute();
  const openLogin = () => {
    if (location.pathname === "/signin") {
      handleOpenLogin();
    }
  };
  const aiAdvisaryOpen = () => {
    if (location.pathname === "/signin") {
      handleOpenLogin();
    } else {
      navigate("/resChatAI");
      handleClose();
    }
  };

  // Sync activeTab with the current route
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes("/exchange") ? "Exchange" : "Book"
  );

  useEffect(() => {
    // Update activeTab when the route changes
    setActiveTab(location.pathname.includes("/exchange") ? "Exchange" : "Book");
  }, [location.pathname]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    navigate(tab === "Book" ? "/" : "/exchange");
  };

  const handleSportsNav = (name, sportId) => {
    if (
      location.pathname != "/home" &&
      location.pathname != "/signin" &&
      location.pathname != "/exchange"
    ) {
      navigate("/home");
    }
    handleNavRoute(name);
    setActiveGameId(sportId);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sportsNames = useMultipleSports();
  const upSportsNames = useMultipleUpSports();

  const filteredSports = sportsNames
    .filter((game) => game?.data?.sports?.length > 0)
    .map((game) => game?.visibleName);

  const filteredUpSports = upSportsNames
    .filter((game) => game?.data?.sports?.length > 0)
    .map((game) => game?.visibleName);

  const activeGameNames =
    liveUpcome === "live" ? filteredSports : filteredUpSports;

  const sportsItems = [
    {
      name: "American Football",
      visibleName: "NFL",
      sportId: "sr:sport:16",
      icon: <FaConfluence />,
    },
    {
      name: "Basketball",
      visibleName: "NBA",
      sportId: "sr:sport:2",
      icon: <CiBasketball />,
    },
    {
      name: "Baseball",
      visibleName: "Baseball",
      sportId: "sr:sport:3",
      icon: <CiBasketball />,
    },
    {
      name: "Volleyball",
      visibleName: "Volleyball",
      sportId: "sr:sport:23",
      icon: <CiBasketball />,
    },
    {
      name: "Ice Hockey",
      visibleName: "NHL",
      sportId: "sr:sport:4",
      icon: <FaPeopleGroup />,
    },
    {
      name: "Mixed Martial Arts",
      visibleName: "MMA",
      sportId: "sr:sport:117",
      icon: <MdSportsMartialArts />,
    },
    { name: "Boxing", visibleName: "Boxing", icon: <PiBoxingGloveFill /> },
    {
      name: "Table Tennis",
      visibleName: "Table Tennis",
      sportId: "sr:sport:20",
      icon: <FaTableTennis />,
    },
    {
      name: "Tennis",
      visibleName: "Tennis",
      sportId: "sr:sport:5",
      icon: <FaTableTennis />,
    },
    {
      name: "Cricket",
      visibleName: "Cricket",
      sportId: "sr:sport:21",
      icon: <PiCricketBold />,
    },
    {
      name: "Soccer",
      visibleName: "Football",
      sportId: "sr:sport:1",
      icon: <CiBasketball />,
    },
    {
      name: "Kabaddi",
      visibleName: "Kabaddi",
      sportId: "sr:sport:138",
      icon: <RiBoxingLine />,
    },
    {
      name: "Rugby",
      visibleName: "Rugby",
      sportId: "sr:sport:12",
      icon: <RiBoxingLine />,
    },
    {
      name: "Badminton",
      visibleName: "Badminton",
      sportId: "sr:sport:31",
      icon: <GiTennisRacket />,
    },
    {
      name: "Darts",
      visibleName: "Darts",
      sportId: "sr:sport:22",
      icon: <FaBaseball />,
    },
    {
      name: "Snooker",
      visibleName: "Snooker",
      sportId: "sr:sport:19",
      icon: <FaTableTennis />,
    },
    {
      name: "Futsal",
      visibleName: "Futsal",
      sportId: "sr:sport:29",
      icon: <FaBaseball />,
    },
  ];

  const sportsActiveName = sportsItems.filter((game) =>
    activeGameNames.includes(game.visibleName)
  );

  const activeExchSport = useMultipleExchSport();
  const filteredExchSport = activeExchSport
    .filter((game) => game?.data?.data?.length > 0)
    .map((game) => game?.visibleName);
  const exchnageItems = [
    { name: "American Football", visibleName: "NFL", icon: <FaConfluence /> }, // National Football League
    { name: "Basketball", visibleName: "NBA", icon: <CiBasketball /> }, // National Basketball Association
    // { name: "Ice Hockey", visibleName: "NHL", icon: <FaPeopleGroup /> },
    // {
    //   name: "Mixed Martial Arts",
    //   visibleName: "MMA",
    //   icon: <MdSportsMartialArts />,
    // },
    { name: "Boxing", visibleName: "Boxing", icon: <PiBoxingGloveFill /> },
    // { name: "Baseball", visibleName: "MLB", icon: <FaBaseball /> },
    { name: "Tennis", visibleName: "Tennis", icon: <FaTableTennis /> },
    { name: "Cricket", visibleName: "Cricket", icon: <PiCricketBold /> },
    { name: "Soccer", visibleName: "Football", icon: <CiBasketball /> },
    { name: "Darts", visibleName: "Darts", icon: <FaBaseball /> },
    { name: "Snooker", visibleName: "Snooker", icon: <FaTableTennis /> },
  ];

  const exchActiveName = exchnageItems.filter((game) =>
    filteredExchSport.includes(game.visibleName)
  );

  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        {/* Nolimit Token */}
        <div className="sidebar-item">
          <img src={icon} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Balance</p>
            <p style={{ fontWeight: "600" }}>
              {user?.money ? Number(user.money).toFixed(2) : "00.00"}
            </p>
          </div>
          <p className="sidebar-item-arrow">
            <IoIosArrowForward />
          </p>
        </div>

        {/* Dropdown with Tabs */}
        <div className="dropdown-content">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "Book" ? "active-tab" : ""}
              onClick={() => handleTabSwitch("Book")}
            >
              Sportsbook
            </button>
            <button
              className={activeTab === "Exchange" ? "active-tab" : ""}
              onClick={() => handleTabSwitch("Exchange")}
            >
              Exchange
            </button>
          </div>

          {/* Tab Content */}
          <ul className="dropdown-list">
            {(activeTab === "Book" ? sportsActiveName : exchActiveName).map(
              (item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    handleSportsNav(item.name, item.sportId);
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  {item.visibleName}
                </li>
              )
            )}
          </ul>
        </div>

        {/* AI Advisory */}
        <div
          className="ai-dropdown"
          onClick={() => aiAdvisaryOpen("chatbox", true)}
        >
          <div className="dropdown-header">
            <p className="ai-dropdown-item">
              <span style={{ fontSize: "1.4rem" }}>
                <FaRobot />
              </span>
              AI Advisory
            </p>
          </div>
        </div>

        {/* Other Navigation Items */}
        <div className="Other-sidebar-item">
          <div className="other-sidebar-items">
            <FaCrown
              style={{
                color: "#FFD700",
                fontSize: "1.2rem",
                marginRight: "4px",
              }}
            />
            <span style={{ color: "#4bec82" }} onClick={openLogin}>
              VIP Club
            </span>
          </div>
          <div
            className="other-sidebar-items"
            onClick={() => {
              if (openLogin) {
                openLogin();
              } else {
                navigate("/bonus");
              }
            }}
          >
            <BiGift
              style={{
                color: "#FF6347",
                fontSize: "1.2rem",
                marginRight: "4px",
              }}
            />
            Bonus
          </div>
          <div className="other-sidebar-items" onClick={openLogin}>
            <MdGroup
              style={{
                color: "#1E90FF",
                fontSize: "1.2rem",
                marginRight: "4px",
              }}
            />
            Affiliate
          </div>
          {/* <div className="other-sidebar-items">
            <BiMessageDetail
              style={{
                color: "#FF4500",
                fontSize: "1.2rem",
                marginRight: "4px",
              }}
            />
            Forum
          </div> */}
          {/* <div className="other-sidebar-items">
            <AiOutlineSafetyCertificate
              style={{
                color: "#32CD32",
                fontSize: "1.2rem",
                marginRight: "4px",
              }}
            />
            Provably Fair
          </div> */}
        </div>

        {/* Live Support */}
        {/* <div className="dropdown">
          <div className="dropdown-header">
            <p className="dropdown-item">
              <span style={{ fontSize: "1.4rem" }}>
                <BiSupport />
              </span>
              Live Support
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export const ResponsiveSidebar = ({ handleClose }) => {
  const { user } = useAuth();
  const { setActiveGameId } = useTab();
  const { handleNavRoute, liveUpcome } = useNavRoute();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLogin } = useAuth();
  const [activeTab, setActiveTab] = useState("Sportsbook");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    // Navigate to the appropriate route
    // if (tab === "Sportsbook") {
    //   navigate("/");
    // } else if (tab === "Exchange") {
    //   navigate("/exchange");
    // }
  };

  const { handleOpenLogin } = useNavRoute();
  const openLogin = () => {
    if (location.pathname === "/signin") {
      handleOpenLogin();
    }
  };
  const aiAdvisaryOpen = () => {
    if (location.pathname === "/signin") {
      handleOpenLogin();
    } else {
      navigate("/resChatAI");
      handleClose();
    }
  };
  const handleTabChange = (id, route) => {
    setActiveGameId(id);
    handleNavRoute(route);
    handleClose();
    if (activeTab === "Sportsbook") {
      navigate("/");
    } else if (activeTab === "Exchange") {
      navigate("/exchange");
    }
  };
  const handleTabExchangeChange = (route) => {
    // console.log(route);
    handleNavRoute(route);

    handleClose();
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab); // Save active tab to local storage
  }, [activeTab]);

  const sportsNames = useMultipleSports();
  const upSportsNames = useMultipleUpSports();

  const filteredSports = sportsNames
    .filter((game) => game?.data?.sports?.length > 0)
    .map((game) => game?.visibleName);

  const filteredUpSports = upSportsNames
    .filter((game) => game?.data?.sports?.length > 0)
    .map((game) => game?.visibleName);

  const activeGameNames =
    liveUpcome === "live" ? filteredSports : filteredUpSports;

  const sportsItems = [
    {
      name: "American Football",
      visibleName: "NFL",
      sportId: "sr:sport:16",
      icon: <FaConfluence />,
    },
    {
      name: "Basketball",
      visibleName: "NBA",
      sportId: "sr:sport:2",
      icon: <CiBasketball />,
    },
    {
      name: "Baseball",
      visibleName: "Baseball",
      sportId: "sr:sport:3",
      icon: <CiBasketball />,
    },
    {
      name: "Volleyball",
      visibleName: "Volleyball",
      sportId: "sr:sport:23",
      icon: <CiBasketball />,
    },
    {
      name: "Ice Hockey",
      visibleName: "NHL",
      sportId: "sr:sport:4",
      icon: <FaPeopleGroup />,
    },
    {
      name: "Mixed Martial Arts",
      visibleName: "MMA",
      sportId: "sr:sport:117",
      icon: <MdSportsMartialArts />,
    },
    { name: "Boxing", visibleName: "Boxing", icon: <PiBoxingGloveFill /> },
    {
      name: "Table Tennis",
      visibleName: "Table Tennis",
      sportId: "sr:sport:20",
      icon: <FaTableTennis />,
    },
    {
      name: "Tennis",
      visibleName: "Tennis",
      sportId: "sr:sport:5",
      icon: <FaTableTennis />,
    },
    {
      name: "Cricket",
      visibleName: "Cricket",
      sportId: "sr:sport:21",
      icon: <PiCricketBold />,
    },
    {
      name: "Soccer",
      visibleName: "Football",
      sportId: "sr:sport:1",
      icon: <CiBasketball />,
    },
    {
      name: "Kabaddi",
      visibleName: "Kabaddi",
      sportId: "sr:sport:138",
      icon: <RiBoxingLine />,
    },
    {
      name: "Rugby",
      visibleName: "Rugby",
      sportId: "sr:sport:12",
      icon: <RiBoxingLine />,
    },
    {
      name: "Badminton",
      visibleName: "Badminton",
      sportId: "sr:sport:31",
      icon: <GiTennisRacket />,
    },
    {
      name: "Darts",
      visibleName: "Darts",
      sportId: "sr:sport:22",
      icon: <FaBaseball />,
    },
    {
      name: "Snooker",
      visibleName: "Snooker",
      sportId: "sr:sport:19",
      icon: <FaTableTennis />,
    },
    {
      name: "Futsal",
      visibleName: "Futsal",
      sportId: "sr:sport:29",
      icon: <FaBaseball />,
    },
  ];

  const sportsActiveName = sportsItems.filter((game) =>
    activeGameNames.includes(game.visibleName)
  );
  // console.log(sportsActiveName);

  const exchnageItems = [
    { name: "Cricket", icon: <FaConfluence /> },
    { name: "Soccer", icon: <CiBasketball /> },
    { name: "Tennis", icon: <FaPeopleGroup /> },
    { name: "Basketball", icon: <MdSportsMartialArts /> },
    { name: "Boxing", icon: <IoIosFootball /> },
    { name: "American Football", icon: <PiCricketBold /> },
    { name: "Darts", icon: <FaBaseball /> },
    { name: "Snooker", icon: <FaTableTennis /> },
  ];

  const activeExchSport = useMultipleExchSport();
  const filteredExchSport = activeExchSport
    .filter((game) => game?.data?.data?.length > 0)
    .map((game) => game?.visibleName);
  const exchActiveName = exchnageItems.filter((game) =>
    filteredExchSport.includes(game.visibleName)
  );
  return (
    <div className="responsive-sidebar">
      {/* <div className="responsive-sidebar-header">
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div> */}
      <div className="responsive-sidebar-content">
        <div className="responsive-sidebar-container">
          <div className="sidebar-items">
            {/* Nolimit Token */}
            <div className="responsive-sidebar-item">
              <div style={{ display: "flex", gap: "1rem" }}>
                <img src={icon} alt="" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Balance</p>
                  <p style={{ fontWeight: "600" }}>
                    {user?.money ? Number(user.money).toFixed(2) : "00.00"}
                  </p>
                </div>
              </div>
              <p className="responsive-sidebar-item-arrow">
                <IoIosArrowForward />
              </p>
            </div>

            {/* Dropdown with Tabs */}
            <div className="dropdown-content">
              {/* Tabs */}
              <div className="tabs">
                <button
                  className={activeTab === "Sportsbook" ? "active-tab" : ""}
                  onClick={() => handleTabSwitch("Sportsbook")}
                >
                  Sportsbook
                </button>
                <button
                  className={activeTab === "Exchange" ? "active-tab" : ""}
                  onClick={() => handleTabSwitch("Exchange")}
                >
                  Exchange
                </button>
              </div>

              {/* Tab Content */}
              <ul className="dropdown-list">
                {activeTab === "Sportsbook" ? (
                  <>
                    {sportsActiveName.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => handleTabChange(item.sportId, item.name)}
                      >
                        <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                        {activeTab === "Book" ? item.name : `${item.name}`}{" "}
                      </li>
                    ))}
                  </>
                ) : null}

                {activeTab === "Exchange" ? (
                  <>
                    {exchActiveName.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => handleTabExchangeChange(item.name)}
                      >
                        <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                        {activeTab === "Book" ? item.name : `${item.name}`}{" "}
                      </li>
                    ))}
                  </>
                ) : null}
              </ul>
            </div>

            {/* AI Advisory */}
            <div className="ai-dropdown" onClick={aiAdvisaryOpen}>
              <div className="dropdown-header">
                <p className="ai-dropdown-item">
                  <span style={{ fontSize: "1.4rem" }}>
                    <FaRobot />
                  </span>
                  AI Advisory
                </p>
              </div>
            </div>

            {/* Other Navigation Items */}
            <div className="Other-sidebar-item">
              <div className="other-sidebar-items" onClick={openLogin}>
                <FaCrown
                  style={{
                    color: "#FFD700",
                    fontSize: "1.2rem",
                    marginRight: "4px",
                  }}
                />
                <span style={{ color: "#4bec82" }}>VIP Club</span>
              </div>
              <div className="other-sidebar-items" onClick={openLogin}>
                <BiGift
                  style={{
                    color: "#FF6347",
                    fontSize: "1.2rem",
                    marginRight: "4px",
                  }}
                />
                Bonus
              </div>
              <div className="other-sidebar-items" onClick={openLogin}>
                <MdGroup
                  style={{
                    color: "#1E90FF",
                    fontSize: "1.2rem",
                    marginRight: "4px",
                  }}
                />
                Affiliate
              </div>
              {/* <div className="other-sidebar-items">
                <BiMessageDetail
                  style={{
                    color: "#FF4500",
                    fontSize: "1.2rem",
                    marginRight: "4px",
                  }}
                />
                Forum
              </div>
              <div className="other-sidebar-items">
                <AiOutlineSafetyCertificate
                  style={{
                    color: "#32CD32",
                    fontSize: "1.2rem",
                    marginRight: "4px",
                  }}
                />
                Provably Fair
              </div> */}
            </div>

            {/* Live Support */}
            {/* <div className="dropdown">
          <div className="dropdown-header">
            <p className="dropdown-item">
              <span style={{ fontSize: "1.4rem" }}>
                <BiSupport />
              </span>
              Live Support
            </p>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
