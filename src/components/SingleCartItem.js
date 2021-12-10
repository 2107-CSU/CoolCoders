import React from 'react'

const SingleCartItem = ({ item }) => {
    return (
        // change the value of the key! Just using title for testing out
        <tr scope='row' key={item.title}>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
        </tr>
    )
}

export default SingleCartItem
