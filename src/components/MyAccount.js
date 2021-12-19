import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import OrderHistory from "./OrderHistory";

//import helper functions
import { editUser, getUser, deleteUser } from "../api/users";

const MyAccount = ({user, setUser, token, history}) => {
    const userId = user.id;

    //state for user info fields to edit
    const [newEmail, setNewEmail] = useState(user.email);
    const [newName, setNewName] = useState(user.name);

    //when the page loads, set pieces of state to track user info
    useEffect( () => {
        setNewEmail(user.email);
        setNewName(user.name);
    }, [user])


    return (
        <div id="myaccount-page">
            <div id="your-account-container">
                <h1>Your Account</h1>
                <br />
                <form id="edit-account-form"
                    onSubmit = { async (event) => {
                        event.preventDefault();

                        //api call to edit user
                        await editUser(token, userId, newEmail, newName);

                        //make an api call and update user state
                        await setUser(await getUser(userId));

                        history.push('/myaccount');
                    }}
                >
                    <div className="form-group form-spacing">
                        <label htmlFor="newEmail" className="margin-right">E-mail: </label>
                            <input
                                required
                                id="newEmail"
                                type="text"
                                className="form-control input-formatting"
                                value={newEmail}
                                onChange={
                                (event) => {
                                    setNewEmail(event.target.value);
                                }
                            }/>
                    </div>
                    <br />
                    <div className="form-group form-spacing">
                        <label htmlFor="newName" className="margin-right">Name: </label>
                            <input
                                required
                                id="newName"
                                type="text"
                                className="form-control input-formatting"
                                value={newName}
                                onChange={
                                (event) => {
                                    setNewName(event.target.value);
                                }
                            }/>
                    </div>
                    <br />
                    <button type="button" className="btn-link" id="btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <span id="change-pass">Change password?</span>
                    </button>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <br />
                    <br />
                <button type="submit" className="btn-primary btn-radius btn-padding" id="update-btn">Update</button>
                {
                    user.active ?
                        <button type="button" className="btn-danger btn-radius btn-padding" id="delete-btn"
                        onClick = { async (event) => {
                            event.preventDefault();

                            //api call to deactivate account
                            await deleteUser(token, userId);

                            //make an api call and update user state
                            await setUser(await getUser(userId));

                            history.push('/myaccount');
                        }
                        }
                        >Deactivate Account</button>
                    : <button type="button" className="btn-success btn-radius btn-padding" id="activate-btn"
                        onClick = { async (event) => {
                            console.log("Reactivating account");
                            event.preventDefault();

                            const active = true;
                            //api call to update user status
                            await editUser(token, userId, newEmail, newName, active);

                            //make an api call and update user state
                            await setUser(await getUser(userId));

                            history.push('/myaccount');
                        }
                        }
                    >Activate account</button>

                }
                </form>
            </div>
            <br />
            <hr id="horizontal-line" />
            <OrderHistory />
        </div>
    )
}

export default MyAccount;