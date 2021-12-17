import React, { useState, useEffect } from 'react'
import { getUserById, makeAdmin } from './adminUtility'

const MakeAdmin = ({ match, history, token }) => {
    const [userId, setUserId] = useState(match.params.userId);
    const [selectedUser, setSelectedUser] = useState([])

    useEffect(() => {
        getUserById(userId, setSelectedUser);
    }, [userId])

    function upgradeUser(e, token, userId) {
        e.preventDefault();
        makeAdmin(token, userId);
        history.push('/admin');
    }

    return (
        <div className='marginTop'>
            {selectedUser 
            ? ( selectedUser.map((user) => (
                <div className='marginTop' key={user.id}>
                    <h2>Are You Sure You Want to Make {user.name} an Admin?</h2>
                    <p >email: {user.email}</p>
                    <p>Current status: {user.userStatus}</p>
                </div>
            ))
                
            ) : <p>Loading Selected User</p>}
            <form>
                <button onClick={(e) => upgradeUser(e, token, userId)}>Upgrade to Admin</button>
            </form>
        </div>
    )
}

export default MakeAdmin
