import React, { useEffect } from "react";

const Logout = (props) => {
<<<<<<< HEAD
  const { setToken } = props;
=======
  const { setToken, setCartObj, setUser, setIsAdmin, setCartItems } = props;
>>>>>>> 64-My-Account-OrderHistory

  useEffect(() => {
    setToken("");
    setCartObj({});
    setCartItems([]);
    setUser({});
    localStorage.removeItem("token");
<<<<<<< HEAD

=======
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    setIsAdmin(false);
>>>>>>> 64-My-Account-OrderHistory
  }, []);
  return (
    <div>
      <h1 className="marginTop">You are now logged out.</h1>
    </div>
  );
};

export default Logout;
