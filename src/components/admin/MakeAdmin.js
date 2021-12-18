import React, { useState, useEffect } from 'react'
import { getUserById, makeAdmin } from './adminUtility'

const MakeAdmin = ({ match, history, token }) => {
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

    function upgradeUser(e, token, userId) {
        e.preventDefault();
        makeAdmin(token, userId);
        history.push('/admin');
    }


    return (
        <div className='singleUserContainer'>
            {!isLoading 
            ? ( 
                <>
                    <div className='singleUserDetails' key={selectedUser.id}>
                        <h2>Make {selectedUser.name} an admin here</h2>
                        <p><span className='singleUserLabel'>email:</span> {selectedUser.email}</p>
                        <p><span className='singleUserLabel'>Current status:</span> {selectedUser.userStatus}</p>
                    </div>
                    <form>
                    <button className='singleUserBtn' onClick={(e) => upgradeUser(e, token, userId)}>Make {selectedUser.name} an Admin</button>
                </form>
               </>
            
                
            ) : <p className='marginTop'>Loading Selected User</p>}
        </div>
    )
}

export default MakeAdmin
