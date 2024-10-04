import React, { useState, useEffect } from "react";
import { keyframes, createGlobalStyle } from "styled-components";
// import data from "./data.json";
import cc from "./Images/cc.png";
import lc from "./Images/lc.png";
import cf from "./Images/cf.webp";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const BackGrng = createGlobalStyle`
  #root, html {
    background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(128, 128, 128, 0.3), rgba(0, 0, 0, 0.6), rgba(128, 128, 128, 0.3), white);
    font-family: Arial, sans-serif;
    background-size: 500% 500%;
    animation: ${gradientAnimation} 10s ease infinite;
  }
`;

export default function Prep(props) {

  const [apiData, setApiData] = useState([]);
  const [contests, setContests] = useState();
  const [liveContests, setLiveContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('http://localhost:5000/contest');
        const data = await response.json();
        setApiData(data);
        setContests(data); // Store the fetched data in the contests state
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };

    fetchContests();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();

      const updatedLiveContests = contests.filter((contest) => {
        const startTime = convertToIST(new Date(contest.start)).getTime();
        const endTime = convertToIST(new Date(contest.end)).getTime();
        return startTime <= currentTime && currentTime < endTime;
      });

      const updatedUpcomingContests = contests.filter((contest) => {
        const startTime = convertToIST(new Date(contest.start)).getTime();
        return startTime > currentTime;
      });

      const updatedPreviousContests = contests.filter((contest) => {
        const endTime = convertToIST(new Date(contest.end)).getTime();
        return endTime <= currentTime;
      });

      setLiveContests(updatedLiveContests);
      setUpcomingContests(updatedUpcomingContests);
      setPreviousContests(updatedPreviousContests);
    }, 1000);

    return () => clearInterval(timer);
  }, [contests]); // Add contests to the dependency array5

  const getPlatformLogo = (platform) => {
    switch (platform) {
      case "CodeChef":
        return cc;
      case "Leetcode":
        return lc;
      case "CodeForces":
        return cf;
      default:
        return null;
    }
  };
  const convertToIST = (utcTime) => {
    const istOffset = 7.5 * 60 * 60 * 1000; // Offset for IST in milliseconds
    return new Date(utcTime.getTime() - istOffset);
  };

  // const istOffset = 5.5 * 60 * 60 * 1000;
  const filterContests = (platform) => {
    setCurrentFilter(platform);
  };

  const filteredLiveContests =
    currentFilter === "All"
      ? liveContests
      : liveContests.filter((contest) => contest.platform === currentFilter);

  const filteredUpcomingContests =
    currentFilter === "All"
      ? upcomingContests
      : upcomingContests.filter((contest) => contest.platform === currentFilter);

  const filteredPreviousContests =
    currentFilter === "All"
      ? previousContests
      : previousContests.filter((contest) => contest.platform === currentFilter);

  return (
    <>
      <BackGrng />
      <div className="my-3">
        <div
          className="card video-container"
          style={{
            margin: "34px 0px",
            marginTop: "100px",
            color: props.mode === "dark" ? "black" : "black",
            backgroundColor: "white",
            borderBottom: "none",
            marginBottom: "0px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px black",
          }}
        >
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example2"
            data-bs-root-margin="0px 0px -40%"
            data-bs-smooth-scroll="true"
            className="scrollspy-example bg-body-tertiary rounded-2"
            tabIndex="0"
          >
            <div
              class="container text-center ps-4 pt-3 pe-4"
              style={{
                backgroundColor: "white",
                paddingTop: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <ul class="list-group list-group-horizontal ">
                <li class="list-group-item">
                  <button
                    type="button"
                    class={`btn ${currentFilter === "All" ? "btn-primary" : "btn-outline-primary"
                      }`}
                    onClick={() => filterContests("All")}
                  >
                    All Contest
                  </button>
                </li>
                <li class="list-group-item">
                  <button
                    type="button"
                    class={`btn ${currentFilter === "Leetcode" ? "btn-success" : "btn-outline-success"
                      }`}
                    onClick={() => filterContests("Leetcode")}
                  >
                    Leetcode
                  </button>
                </li>
                <li class="list-group-item">
                  <button
                    type="button"
                    class={`btn ${currentFilter === "CodeChef" ? "btn-danger" : "btn-outline-danger"
                      }`}
                    onClick={() => filterContests("CodeChef")}
                  >
                    CodeChef
                  </button>
                </li>
                <li class="list-group-item">
                  <button
                    type="button"
                    class={`btn ${currentFilter === "CodeForces" ? "btn-warning" : "btn-outline-warning"
                      }`}
                    onClick={() => filterContests("CodeForces")}
                  >
                    CodeForces
                  </button>
                </li>
              </ul>
              <hr style={{ marginBottom: "5px" }} />
              <nav class="navbar bg-body-tertiary mb-6">
                <ul class="nav nav-pills">
                  <li class="nav-item pe-3">
                    <a class="nav-link" href="#scrollspyHeading1">
                      Live Contest
                    </a>
                  </li>
                  <li class="nav-item pe-3">
                    <a class="nav-link" href="#scrollspyHeading2">
                      Upcoming Contest
                    </a>
                  </li>
                  <li class="nav-item pe-3">
                    <a class="nav-link" href="#scrollspyHeading3">
                      Past Contest
                    </a>
                  </li>
                </ul>
              </nav>
              <hr style={{ marginBottom: "0px", marginTop: "5px" }} />
            </div>

            <span id="scrollspyHeading1" className="m-0 p-5"></span>
            <div className="p-3 pt-1">
              <div className="row my-4">
                <h2
                  style={{
                    fontVariant: "small-caps",
                    fontWeight: "700",
                    paddingLeft: "30px",
                    paddingBottom: "10px",
                  }}
                >
                  Live Contests
                </h2>
                <hr className="mb-4" />
                {filteredLiveContests.map((contest, index) => (
                  <div className="col-4 p-2" key={index}>
                    <div className="background card-body hvre">
                      <span
                        className="badge rounded-pill bg-danger"
                        style={{ float: "left" }}
                      >
                        Live Now
                      </span>
                      <br />
                      <span
                        className="badge rounded-pill"
                        style={{ float: "right", margin: "5px" }}
                      >
                        <img
                          src={getPlatformLogo(contest.platform)}
                          width={contest.platform === "CodeChef" ? "120px" : "80px"}
                          alt={contest.platform}
                        />
                      </span>
                      <h5 className="card-title mt-3">
                        {contest.name} <br /> By {contest.platform}
                      </h5>
                      <p>
                        <i>
                          <span className="badge rounded-pill text-dark ps-0">
                            {contest.platform}
                          </span>
                        </i>
                      </p>
                      <p className="card-text">END : <br /> {contest.end}</p>
                      <p className="card-text">
                        Time remaining: <br />{" "}
                        <Timer
                          startTime={convertToIST(new Date(contest.start))}
                          endTime={convertToIST(new Date(contest.end))}
                          status="live"
                        />

                      </p>
                      <a
                        rel="noreferrer"
                        href={contest.url}
                        target="_blank"
                        className="btn btn-sm btn-success"
                      >
                        START NOW
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <span id="scrollspyHeading2" className="m-0 p-5"></span>
              <div className="row my-4">
                <h2
                  style={{
                    fontVariant: "small-caps",
                    fontWeight: "700",
                    paddingLeft: "30px",
                    paddingBottom: "10px",
                  }}
                >
                  Upcoming Contests
                </h2>
                <hr className="mb-4" />
                {filteredUpcomingContests.map((contest, index) => (
                  <div className="col-4 p-2" key={index}>
                    <div className="background card-body hvre">
                      <span
                        className="badge rounded-pill"
                        style={{ float: "right", margin: "15px" }}
                      >
                        <img
                          src={getPlatformLogo(contest.platform)}
                          width={contest.platform === "CodeChef" ? "130px" : "90px"}
                          alt={contest.platform}
                        />
                      </span>
                      <h5 className="card-title">
                        {contest.name} <br /> By {contest.platform}
                      </h5>
                      <p>
                        <i>
                          <span className="badge rounded-pill text-dark ps-0">
                            {contest.platform}
                          </span>
                        </i>
                      </p>
                      <p className="card-text mt-3">
                        START : <br /> {contest.start}
                      </p>
                      <p className="card-text">
                        END : <br /> {contest.end}
                      </p>
                      <Timer
                        startTime={convertToIST(new Date(contest.start))}
                        endTime={convertToIST(new Date(contest.end))}
                        status="live"
                      />

                      <a
                        rel="noreferrer"
                        href={contest.url}
                        target="_blank"
                        className="btn btn-sm btn-danger"
                      >
                        Register & View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <span id="scrollspyHeading3" className="m-0 p-5"></span>
              <h2
                style={{
                  fontVariant: "small-caps",
                  fontWeight: "700",
                  paddingLeft: "30px",
                  paddingBottom: "10px",
                }}
              >
                Past Contests
              </h2>
              <hr className="mb-4" />
              <div className="row">
                {filteredPreviousContests.map((contest, index) => (
                  <div className="col-6 pt-3" key={index}>
                    <div style={{ borderTopRightRadius: "8px", borderTopLeftRadius: "8px", borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)" }}>
                      <a rel="noreferrer"
                        href={contest.url}
                        target="_blank" style={{ color: "black" }}>
                        <div
                          className="card-header"
                          style={{ backgroundColor: "wheat", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                        >
                          Challenge Over
                        </div>
                        <span
                          className="badge rounded-pill"
                          style={{ float: "right", marginRight: "20px", padding: "10px" }}
                        >
                          <img
                            src={getPlatformLogo(contest.platform)}
                            width={contest.platform === "CodeChef" ? "100px" : "70px"}
                            alt={contest.platform}
                          />
                        </span>
                        <div
                          className="card-body"
                          style={{ backgroundColor: "white", borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
                        >
                          <h5 className="card-title">
                            <b>
                              {contest.name} by {contest.platform}
                            </b>
                          </h5>
                          <p className="card-text">
                            <i>{contest.platform}</i>
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const Timer = ({ startTime, endTime, status }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    status === "upcoming" ? startTime - new Date().getTime() : endTime - new Date().getTime()
  );

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const remaining =
        status === "upcoming" ? startTime - currentTime : endTime - currentTime;
      setTimeRemaining(remaining);

      if (remaining > 0) {
        requestAnimationFrame(updateTimer);
      }
    };

    requestAnimationFrame(updateTimer);

    return () => {
      // Clean up function
    };
  }, [startTime, endTime, status]);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {status === "upcoming" && timeRemaining > 0 ? (
        <p className="card-text">
          Starts in: <br /> {formatTime(timeRemaining)}
        </p>
      ) : status === "live" && timeRemaining > 0 ? (
        <p className="card-text">{formatTime(timeRemaining)}</p>
      ) : null}
    </div>
  );
};