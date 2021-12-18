import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";

import { registerGuest } from "../api/users";

const PromptGuest = (props) => {
  const { setUser, setToken } = props;
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
    <div>
      {!guestMsg ? (
        <Fragment>
          <p>Please login or continue as guest</p>
          <button type="button" onClick={() => history.push("/login")}>
            LOGIN
          </button>
          <button type="button" onClick={() => setGuest(true)}>
            CONTINUE AS GUEST
          </button>
          {guest && !guestMsg ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label>
                Please enter an email for shipping updates.
                <input
                  type="text"
                  required
                  placeholder="youremail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </label>
              <button type="submit">SUBMIT</button>
            </form>
          ) : null}
        </Fragment>
      ) : null}
      ;{guestMsg ? <p>{guestMsg}</p> : null}
    </div>
  );
};

export default PromptGuest;
