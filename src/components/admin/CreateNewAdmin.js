import React, { useState } from 'react'
import { registerUser } from "../../api/users";

const CreateNewAdmin = ({ token, user, history }) => {
    
    const [adminEmail, setAdminEmail] = useState('')
    const [name, setName] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [adminConfirmedPassword, setAdminConfirmedPassword] = useState('')

    // const user = await createUser({ email, name, password, userStatus });
    async function handleRegister() {
        try {
          await registerUser(adminEmail, name, adminPassword, 'admin');
          history.push("/admin");
        } catch (err) {
          console.error(err);
        }
      }

    return (
        <div className='marginTop'>
            <h1>Create a new Admin here</h1>
            <form onSubmit={() => handleRegister()}>
                <div>
                    <label>New Admin Email:</label>
                    <input
                    type='text' 
                    placeholder='admin email'
                    required
                    autoFocus
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="form-control mb-2"
                    />
                </div>
                <div>
                    <label>New Admin Name:</label>
                    <input
                    type='text' 
                    placeholder='admin name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control mb-2"
                    />
                </div>
                <div>
                    <label>New Admin Password:</label>
                    <input
                    type='password' 
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="form-control mb-2"
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                    type='password' 
                    required
                    value={adminConfirmedPassword}
                    onChange={(e) => setAdminConfirmedPassword(e.target.value)}
                    className="form-control mb-2"
                    />
                </div>
                <button>Register New Admin</button>
            </form>
        </div>
    )
}

export default CreateNewAdmin
