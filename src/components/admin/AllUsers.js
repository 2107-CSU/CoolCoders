import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AllUsers = ({ token }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getAllUsers(){
            const res = await fetch(`http://localhost:2345/api/users`)
            const allUsers = await res.json();
            setUsers(allUsers.users);
        }
        getAllUsers();
    }, [])

    return (
        <div>
           <h2>All Users</h2>
           {users.length
           ? (
                users.map((user) => (
                    <div key={user.id} className='marginTop user'>
                        <p>{user.email}</p>
                        <p>{user.name}</p>
                        <p>{user.userStatus}</p>
                        <Link to={`/admin/makeadmin/${user.id}`}>Make Admin</Link>
                        <Link to={`/admin/deleteuser/${user.id}`}>Delete User</Link>
                    </div>
                ))
           ) : <h3>Loading Users...</h3>}
        </div>
    )
}

export default AllUsers
