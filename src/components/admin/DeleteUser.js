import React, { useState, useEffect } from 'react'
import { getUserById, deleteSingleUser } from './adminUtility';

const DeleteUser = ({ match, history }) => {

    // const [productId, setProductId] = useState(match.params.productId)
    const [userId, setUserId] = useState(match.params.userId);
    const [selectedUser, setSelectedUser] = useState([])


    useEffect(() => {
        getUserById(userId, setSelectedUser);
    }, [userId])

    function deleteUser(e, userId){
        e.preventDefault();
        deleteSingleUser(userId);
        history.push('/admin')
    }

    return (
        <div className='singleUserContainer'>
            {selectedUser 
            ? ( selectedUser.map((user) => (
                <div className='singleUserDetails' key={user.id}>
                    <h2>Are You Sure You Want to Delete {user.name}?</h2>
                    <p><span className='singleUserLabel'>email: </span> {user.email}</p>
                    <p><span className='singleUserLabel'>status: </span> {user.userStatus}</p>
                </div>
            ))
                
            ) : <p>Loading Selected User</p>}
            <form onSubmit={(e) => deleteUser(e, userId)}>
                <button className='singleUserBtn'>Yes, Delete</button>
            </form>
        </div>
    )
}

export default DeleteUser
