import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useNavigate();

    const header = {"Access-Control-Allow-Origin":"*"};
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://local-react-app.com/api/create',
            {
                name: name, 
                email: email,
                password: password,
                header
            }
        )
        .then(() => {
            history("/read");
        });
    };
  return <>
        <div className="d-flex justify-content-between m-2">
            <h2>Create</h2>
            <Link to="/read">
                <button type="button" class="btn btn-outline-primary">Read</button>
            </Link>
        </div>
        <form>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </>
};

export default Create;