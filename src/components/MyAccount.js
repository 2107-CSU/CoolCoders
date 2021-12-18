import React, {useState, useEffect} from "react";

import OrderHistory from "./OrderHistory";

//import helper functions
import { editUser, getUser } from "../api/users";

const MyAccount = ({user, setUser, token, history}) => {
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
                        await editUser(token, user.id, newEmail, newName);

                        //make an api call and update user state
                        await setUser(await getUser(user.id));

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
                    <div className="form-group form-spacing">
                        <label htmlFor="newName" className="margin-right">Password: </label>
                            <input
                                disabled
                                id="newPassword"
                                type="password"
                                className="form-control input-formatting"
                                value="********"
                                onChange={
                                (event) => {
                                    setNewName(event.target.value);
                                    console.log(newName)
                                }
                            }/>
                    </div>
                    <br />
                <button type="submit" className="btn-primary" id="update-btn">Update</button>
                <button type="button" className="btn-danger" id="delete-btn"
                    onClick = { () => {
                        console.log("DEACTIVATING ACCOUNT: ", user.id);
                    }
                    }
                >Deactivate Account</button>
                </form>
            </div>
            <br />
            <hr id="horizontal-line" />
            <OrderHistory />
        </div>
    )
}

export default MyAccount;