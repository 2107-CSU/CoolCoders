import React, { useState } from "react";
import { upgradeGuest } from "../api/users";

const UpgradeGuest = (props) => {
  const { setUser, setToken, token, user } = props;

  const [makeAccount, setMakeAccount] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [formMsg, setFormMsg] = useState("");

  const handleSubmit = async () => {
    const response = await upgradeGuest(token, name, password, user.id);
    if (response) {
      setToken(response.token);
      setUser(response.user);
      return response.message;
    }
  };

  return (
    <div className="guestLogin">
      {formMsg ? <p>{formMsg}</p> : null}
      {makeAccount ? (
        <form
          className="guestLoginForm"
          onSubmit={(e) => {
            e.preventDefault();
            if (password === confirmedPass) {
              const resp = handleSubmit();
              if (resp) {
                setName("");
                setPassword("");
                setConfirmedPass("");
              }
            } else {
              setFormMsg("Both passwords must match.");
            }
          }}
        >
          <button
            type="button"
            className="guestBtn"
            onClick={() => setMakeAccount(false)}
          >
            CANCEL
          </button>
          <label>Name:</label>
          <input
            className="guestLoginInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Jane Doe"
          ></input>
          <label>Password:</label>
          <input
            className="guestLoginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="At least 8 characters"
            minLength={8}
          ></input>
          <label>Confirm password:</label>
          <input
            className="guestLoginInput"
            type="password"
            value={confirmedPass}
            onChange={(e) => setConfirmedPass(e.target.value)}
            required
            placeholder="Passwords must match"
            minLength={8}
          ></input>
          <button type="submit" className="guestBtn">
            CREATE ACCOUNT
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="guestBtn"
          onClick={() => setMakeAccount(true)}
        >
          Would you like to create an account?
        </button>
      )}
    </div>
  );
};

export default UpgradeGuest;
