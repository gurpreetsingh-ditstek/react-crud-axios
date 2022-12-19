import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);

    function deleteUser(id) {
        axios.delete(`http://local-react-app.com/api/delete/${id}`)
        .then(() => {
            getData();
        });
    }

    function setToLocalStorage(id, name, email) {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    }

    function getData() {
        axios.get('http://local-react-app.com/api/read')
        .then((res) => {
            setData(res.data.data);
        });
    }

    useEffect(() => {
        getData();
    },[]);
  return (
    <>
        <div className="d-flex justify-content-between m-2">
            <h2>User List</h2>
            <Link to="/">
                <button type="button" class="btn btn-outline-primary">Create</button>
            </Link>
        </div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            { data.map((eachData) => {
                return (
                    <>
                        <tr>
                            <th scope="row">{eachData.id}</th>
                            <td>{eachData.name}</td>
                            <td>{eachData.email}</td>
                            <td>
                                <Link to="/update">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setToLocalStorage(eachData.id,eachData.name,eachData.email)}>Edit</button>
                                </Link>{' '}
                                <button type="button" className="btn btn-outline-danger" onClick={() => deleteUser(eachData.id)}>Delete</button></td>
                        </tr>
                    </> 
                );
                })
            }
            </tbody>
        </table>
    </>
  )
}

export default Read