import React from "react";

import OrderHistory from "./OrderHistory";

//import helper functions

const MyAccount = () => {
    return (
        <div id="myaccount-page">
            <div id="your-account-container">
                <h1>Your Account</h1>
                <p>e-mail: </p>
                <p>name: </p>
                <p>password: </p>
            </div>
            <hr id="horizontal-line" />
            <OrderHistory />
        </div>
    )
}

export default MyAccount;