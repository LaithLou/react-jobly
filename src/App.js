import "./App.css";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import JoblyRoutes from "./JoblyRoutes";
import { BrowserRouter } from "react-router-dom";
import userContext from "./userContext";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

const DEFAULT_USER = { data: null, isLoggedIn: false };

/** App : handles rendering the navigation bar
 *
 *  State:
 *  - currUser: { data:{username, firstName, lastName, isAdmin, jobs}, isLoggedIn }
 *        where jobs is { id, title, companyHandle, companyName, state }
 *  - token
 *
 *  Context:
 *  - currUser
 *
 * App ->{Nav, JoblyRoutes}
 */

function App() {
  const [currUser, setCurrUser] = useState(DEFAULT_USER);
  console.log("In App", "state:", currUser);
  let token = localStorage.getItem("token");
  console.log("token in localStorage=", token);

  useEffect(
    function getUserDataWithToken() {
      async function fetchUserDataWithToken() {
        // TODO: destructure decoded {username}
        const storedToken = localStorage.getItem("token");
        let decoded = jwt_decode(storedToken);
        let userResult = await JoblyApi.getUserData(
          decoded.username,
          storedToken
        );
        setCurrUser((currUser) => ({
          ...currUser,
          data: userResult,
        }));
      }
      // try localStorage.getItem("token" !== undefined)
      if (currUser.isLoggedIn !== false) {
        fetchUserDataWithToken();
      }
    },
    [currUser.isLoggedIn]
  );

  /** Login a user and update token. */

  async function login(username, password) {
    let newToken = await JoblyApi.getTokenForCurrUser(username, password);
    localStorage.setItem("token", `${newToken}`);
    token = localStorage.getItem("token");
    setCurrUser((currUser) => ({
      ...currUser,
      isLoggedIn: true,
    }));
  }

  /** Logout a user and remove token. */
  function logout(evt) {
    console.log("INSIDE LOGOUT!!!!");
    evt.preventDefault();
    localStorage.setItem("token", undefined);
    console.log("remove token?", localStorage.getItem("token"));
    setCurrUser((currUser) => ({
      ...currUser,
      data: null,
      isLoggedIn: false,
    }));
  }

  /** Signup a new user and update token. */
  // will be passed an object ******
  async function signup(userData) {
    let newToken = await JoblyApi.getTokenForNewUser(userData);
    localStorage.setItem("token", `${newToken}`);
  }

  /** editProfile takes user data changes user information to
   * the newly inputted ones
   */
  async function editProfile(userData) {
    const storedToken = localStorage.getItem("token");
    let updatedUser = await JoblyApi.updateUser(userData, storedToken);
    setCurrUser(updatedUser);
  }

  return (
    <div className="App">
      <header className="App-header">
        <userContext.Provider value={{ currUser }}>
          <BrowserRouter>
            <Nav logout={logout} editProfile={editProfile} />
            <JoblyRoutes
              editProfile={editProfile}
              login={login}
              signup={signup}
            />
          </BrowserRouter>
        </userContext.Provider>
      </header>
    </div>
  );
}

export default App;
