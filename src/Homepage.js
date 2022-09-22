import "./App.css";
import React from "react";
import { useContext } from "react";
import userContext from "./userContext";
import "./Homepage.css";

/** Homepage : it renders a welcome homepage
 *
 * JoblyRoutes -> Homepage
 */

function Homepage() {
  console.log("In Homepage");
  const { currUser } = useContext(userContext);

  return (
    <div className="Homepage">
      {currUser.isLoggedIn ? (
        <div className="homepage-headers">
          <h1>Jobly</h1>
          <h2>All the jobs in one, convenient place.</h2>
          <h1> Welcome back, {currUser.data.firstName} </h1>
        </div>
      ) : (
        <div className="homepage-headers">
          <h1>Jobly</h1>
          <h2>All the jobs in one, convenient place.</h2>
        </div>
      )}
    </div>
  );
}

export default Homepage;
