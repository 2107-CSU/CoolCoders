import React, { useEffect } from "react";

const Logout = (props) => {
  const { setToken, setIsAdmin } = props;

  useEffect(() => {
    setToken("");
    localStorage.removeItem("token");
    setIsAdmin(false);
  }, []);
  return (
    <div>
      <h1 className="marginTop">You are now logged out.</h1>
    </div>
  );
};

export default Logout;
