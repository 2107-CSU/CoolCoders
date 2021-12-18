import React, { useState, useEffect } from 'react'
import { getUserById, deleteSingleUser } from './adminUtility';

const DeleteUser = ({ match, history, token }) => {

    // const [productId, setProductId] = useState(match.params.productId)
    const [userId, setUserId] = useState(match.params.userId);
    const [selectedUser, setSelectedUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        async function getUser(){
            setIsLoading(true);
            const data = await getUserById(userId, token, setSelectedUser);
            setSelectedUser(data);
            setIsLoading(false);
        }
        getUser();
    }, [])

    function deleteUser(e, userId, token){
        e.preventDefault();
        deleteSingleUser(userId, token);
        history.push('/admin')
    }

    return (
        <div className='singleUserContainer'>
            {!isLoading 
            ? ( 
                <div className='singleUserDetails' key={selectedUser.id}>
                    <h2>Are You Sure You Want to Delete {selectedUser.name}?</h2>
                    <p><span className='singleUserLabel'>email: </span> {selectedUser.email}</p>
                    <p><span className='singleUserLabel'>status: </span> {selectedUser.userStatus}</p>
                </div>
            ) : <p>Loading Selected User</p>}
            <form onSubmit={(e) => deleteUser(e, userId, token)}>
                <button className='singleUserBtn'>Yes, Delete</button>
            </form>
        </div>
    )
}

export default DeleteUser
