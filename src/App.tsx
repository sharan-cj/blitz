import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar, Background } from "./Components";
import { Chat, Friends, Profile, Dev, Login, SignUp, Page404 } from "./Pages";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Layout } from "./Styles";
import { UserContext } from "./Utils";

function App() {
  let localUser = "";
  const User = localStorage.getItem("User");
  if (User) {
    localUser = JSON.parse(User);
  }

  const [user, setUser] = useState(localUser);
  const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <div className="App">
          <Background />
          <Navbar />
          <Layout>
            <Switch>
              <PrivateRoute exact path="/" component={Chat} />
              <PrivateRoute exact path="/Friends" component={Friends} />
              <PrivateRoute exact path="/Profile" component={Profile} />
              <PrivateRoute exact path="/Dev" component={Dev} />
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
