import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "./adminUtility";
const AllUsers = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      const data = await fetchAllUsers(token);
      localStorage.setItem("allUsers", JSON.stringify(data.users));
      setUsers(data.users);
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers"));
    setUsers(allUsers);
  }, []);

  return (
    <>
      <h2 className="allUsersTitle">All Users</h2>
      <div className="allUsersContainer">
        {users.length ? (
          users.map((user) => (
            <div key={user.id} className="individualUser">
              <div className="individualUserDetails">
                <p>{user.email}</p>
                <p>{user.name}</p>
                <p>{user.userStatus}</p>
              </div>
              {user.userStatus !== "admin" ? (
                <div className="individualUserOptions">
                  <Link
                    to={`/admin/makeadmin/${user.id}`}
                    className="individualUserBtn"
                  >
                    Make Admin
                  </Link>
                  <Link
                    to={`/admin/deleteuser/${user.id}`}
                    className="individualUserBtn"
                  >
                    Delete User
                  </Link>
                </div>
              ) : (
                <div className="individualUserOptions">
                  <Link
                    to={`/admin/deleteuser/${user.id}`}
                    className="individualUserBtn"
                  >
                    Delete Admin
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <h3>Loading Users...</h3>
        )}
      </div>
    </>
  );
};

export default AllUsers;
