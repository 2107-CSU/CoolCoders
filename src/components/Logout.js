import React, { useEffect } from "react";

const Logout = (props) => {
  const { setToken, setCartObj } = props;

  useEffect(() => {
    setToken("");
    setCartObj({});
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  }, []);
  return (
    <div>
      <h1 className="marginTop">You are now logged out.</h1>
    </div>
  );
};

export default Logout;
