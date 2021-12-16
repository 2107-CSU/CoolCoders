import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    return (
        <div className='marginTop'>
        <ul>
            <li><Link to='createnewproduct'>Create New Product</Link></li>
            <li><Link to='deleteproduct'>Delete a Product</Link></li>
            <li><Link to='updateproduct'>Edit a Product</Link></li>
        </ul>
        </div>
    )
}

export default AdminDashboard
