import React, { useEffect } from "react";

const Logout = (props) => {
  const { setToken, setCartObj, setUser } = props;

  useEffect(() => {
    setToken("");
    setCartObj({});
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
  }, []);
  return (
    <div>
      <h1 className="marginTop">You are now logged out.</h1>
    </div>
  );
};

export default Logout;
