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
        <div className='marginTop'>
            {selectedUser 
            ? ( selectedUser.map((user) => (
                <div className='marginTop' key={user.id}>
                    <h2>Are You Sure You Want to Delete {user.name}?</h2>
                    <p >email: {user.email}</p>
                    <p>status: {user.userStatus}</p>
                </div>
            ))
                
            ) : <p>Loading Selected User</p>}
            <form onSubmit={(e) => deleteUser(e, userId)}>
                <button>Delete User</button>
            </form>
        </div>
    )
}

export default DeleteUser
