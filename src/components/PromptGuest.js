import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";

import { registerGuest } from "../api/users";

const PromptGuest = (props) => {
  const { setUser, setToken, setPromptGuest } = props;
  let history = useHistory();

  const [guest, setGuest] = useState(false);
  const [email, setEmail] = useState("");
  const [guestMsg, setGuestMsg] = useState("");

  const handleSubmit = async () => {
    const guest = await registerGuest(email);
    console.log(guest);
    if (guest.user) {
      setUser(guest.user);
    }
    if (guest.token) {
      setToken(guest.token);
      localStorage.setItem("token", guest.token);
    }
    if (guest.message) setGuestMsg(guest.message);
  };

  return (
    <div className="guestPrompt">
      {!guestMsg ? (
        <Fragment>
          <p>Please login or continue as guest</p>
          <button
            type="button"
            className="guestBtn"
            onClick={() => history.push("/login")}
          >
            LOGIN
          </button>
          <button
            type="button"
            className="guestBtn"
            onClick={() => setGuest(true)}
          >
            CONTINUE AS GUEST
          </button>
          {guest && !guestMsg ? (
            <form
              className="guestForm"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label htmlFor="guest-email">
                Please enter an email for shipping updates.
              </label>
              <input
                id="guest-email"
                name="guest-email"
                type="text"
                required
                placeholder="youremail@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <button type="submit" className="guestBtn">
                SUBMIT
              </button>
            </form>
          ) : null}
        </Fragment>
      ) : null}
      {guestMsg ? (
        <div className="guestMsg">
          <p>{guestMsg}</p>
          <button
            type="button"
            className="guestBtn"
            onClick={() => setPromptGuest(false)}
          >
            CONTINUE
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PromptGuest;
