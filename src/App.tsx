import React, { useState } from "react";
import Particles from "react-particles-js";
import "./App.css";
import { Navbar } from "./Components";
import { Chat, Friends, Profile, Dev, Login, SignUp, Page404 } from "./Pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "./Styles";
import { UserContext } from "./Utils";

function App() {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <div className="App">
          <Particles
            width="100%"
            height="100%"
            params={{
              particles: {
                number: {
                  value: 50,
                },
                size: {
                  value: 3,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
            }}
          />
          <Navbar />
          <Layout>
            <Switch>
              <Route exact path="/" component={Chat} />
              <Route exact path="/Friends" component={Friends} />
              <Route exact path="/Profile" component={Profile} />
              <Route exact path="/Dev" component={Dev} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Signup" component={SignUp} />
              <Route path="*" component={Page404} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
