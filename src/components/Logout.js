import React, { useEffect } from "react";

const Logout = (props) => {
  const { setToken, setCartObj, setUser, setIsAdmin } = props;

  useEffect(() => {
    setToken("");
    setCartObj({});
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    setIsAdmin(false);
  }, []);
  return (
    <div>
      <h1 className="marginTop">You are now logged out.</h1>
    </div>
  );
};

export default Logout;
