import React, { useEffect } from "react";

const Logout = (props) => {
  const { setToken, setCartObj, setUser, setIsAdmin, setCartItems } = props;

  useEffect(() => {
    setToken("");
    setCartObj({});
    setCartItems([]);
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
