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
        <div className='singleUserContainer'>
            {selectedUser 
            ? ( selectedUser.map((user) => (
                <div className='singleUserDetails' key={user.id}>
                    <h2>Make {user.name} an admin here</h2>
                    <p><span className='singleUserLabel'>email:</span> {user.email}</p>
                    <p><span className='singleUserLabel'>Current status:</span> {user.userStatus}</p>
                </div>
            ))
                
            ) : <p>Loading Selected User</p>}
            <form>
                <button className='singleUserBtn' onClick={(e) => upgradeUser(e, token, userId)}>Upgrade to Admin</button>
            </form>
        </div>
    )
}

export default MakeAdmin
