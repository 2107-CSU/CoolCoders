import React, { useEffect } from "react";

const Logout = (props) => {
  const { setToken } = props;

  useEffect(() => {
    setToken("");
    localStorage.removeItem("token");

  }, []);
  return (
    <div>
      <h1 className="marginTop">You are now logged out.</h1>
    </div>
  );
};

export default Logout;
