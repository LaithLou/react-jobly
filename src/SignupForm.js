import React, { useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

/** SearchForm: renders basic search box.
 *
 *  States:
 *  = error : an array of error messages
 *  - formData :
 *
 *  Props:
 *  - search fn: calls parent function to filter API request
 *
 *  { CompanyList, JobList } -> SearchForm
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  //TODO: update intialstate
  const initialState = {};
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState([]);
  console.log("In SignUpForm", "State:", formData);
  console.log("in signupForm", "signup = ", signup);

  /**handelChange : updates form input  */
  function handleChange(evt) {
    const { name, value } = evt.target;
    console.log("In handleChange", "name", name, "value", value);
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** handleSubmit : calls parent function to SignUp for results */
  async function handleSubmit(evt) {
    console.log("In handleSubmit=", formData.SignUp);
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/companies");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username
        <input
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </label>
      <label>Password
        <input
          name="password"
          placeholder="Enter password"
          type="password"
          onChange={handleChange}
        />
      </label>
      <label>First Name
        <input
          name="firstName"
          placeholder="Enter first name"
          onChange={handleChange}
        />
      </label>
      <label>Last Name
        <input
          name="lastName"
          placeholder="Enter last name"
          onChange={handleChange}
        />
      </label>
      <label>Email
        <input name="email" placeholder="Enter email" onChange={handleChange} />
      </label>
      {error.length !== 0 && <Alert error={error} />}
      <button>Submit</button>
    </form>
  );
}

export default SignupForm;
