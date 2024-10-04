import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import React, { useState , useEffect} from "react";
import NewsF from "./components/NewsFetching";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Profile from "./login/client/Profile";
import Leaderboard from "./login/client/Leaderboard";
import Login from "./login/client/Login";
import AddContest from "../src/components/MDB/addOneContest";
import Practices from "./components/Practices";
import Contest from "./components/Contest";



function App() {

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLoginStatusChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("username");
    setIsLoggedIn(!!isUserLoggedIn);
  }, []);

  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);
  return (
    <>
      <Router>
      <Navbar
  title="CodexHub"
  mode={mode}
  isLoggedIn={isLoggedIn}
  handleLoginStatusChange={setIsLoggedIn}
  aboutText="Contests"
  toggleMode={toggleMode}
/>
        <div className={`container my-3 ${pathname === "/technews" || pathname === "/login" ? "remove-padding-margin" : ""}`}>
          <Switch>
            <Route exact path="/home">
              <Home key="home" isLoggedIn={isLoggedIn} mode={mode} />
            </Route>
            <Route exact path="/practice">
              <Practices key="practice" mode={mode} isLoggedIn={isLoggedIn} style={{backgroundColor:"red"}}/>
            </Route>
            <Route exact path="/profile">
              <Profile key="prof" mode={mode} />
            </Route>
            <Route exact path="/login">
              <Login key="user" handleLoginStatusChange={setIsLoggedIn} mode={mode} />
            </Route>
            <Route exact path="/contest">
              <Contest key="prep" mode={mode}/>
            </Route>
            <Route exact path="/addcontest">
              <AddContest key="prep" mode={mode}/>
            </Route>
            <Route exact path="/leaderboard">
              <Leaderboard key="lead" mode={mode}/>
            </Route>

            <Route exact path="/technews">
              <NewsF
                key="hack"
                pageSize={21}
                category="technology"
                mode={mode}
              />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
