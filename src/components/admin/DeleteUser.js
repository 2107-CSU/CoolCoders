import React, { useState, useEffect } from 'react'
import { getUserById, deleteSingleUser } from './adminUtility';
// so I want to fetch the user by Id
// and then set selected user to be whatever is returned
// fill in user info here
// have a form with just a button that on submit makes a fetch request to deactivate the user
// return you back to the admin user page

const DeleteUser = ({ match, history }) => {

    // const [productId, setProductId] = useState(match.params.productId)
    const [userId, setUserId] = useState(match.params.userId);
    const [selectedUser, setSelectedUser] = useState([])

    useEffect(() => {
        async function getUser(){
            await getUserById(userId, setSelectedUser);
        }
        getUser();
    }, [userId])
    // usersRouter.delete("/:userId", async (req, res, next) => {
    //     const { userId } = req.params;
      
    //     try {
    //       const response = await deactivateUser(userId);
      
    //       if (response) {
    //         res.send({ msg: `user #${userId} has been successfully deactivated` });
    //       } else {
    //         res.send({
    //           msg: `something went wrong trying to delete user #${userId}`,
    //         });
    //       }
    //     } catch (error) {
    //       next(error);
    //     }
    //   });

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
                
            ) : <p>No Selected User</p>}
            <form onSubmit={(e) => deleteUser(e, userId)}>
                <button>Delete User</button>
            </form>
        </div>
    )
}

export default DeleteUser
