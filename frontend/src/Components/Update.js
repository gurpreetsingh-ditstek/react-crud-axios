import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
    },[]);

    const history = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://local-react-app.com/api/update/${id}`,{
            name: name,
            email: email
        }).then(() => {
            history("/read");
        });
    }

    return <>
    <div className="d-flex justify-content-between m-2">
        <h2>Update</h2>
    </div>
    <form>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type='submit' className="btn btn-primary" onClick={handleUpdate}>Update</button>
    </form>
</>
}

export default Update