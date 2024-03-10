import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';

export default function Edituser() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [user,setUser]=useState({
        name:"",
        username:"",
        email:""
    });

    const{name, username, email}=user  

    const onInputChange=(event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    };

    const onSubmit= async (event)=>{
        event.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user);
        navigate("/"); 
    };

    useEffect(()=>{
        loadUsers()
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>

                <form onSubmit={(event)=>onSubmit(event)}>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-lable">
                            Name
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your name"
                            name="name"
                            value={name}
                            onChange={(event)=>onInputChange(event)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Username" className="form-lable">
                            Username
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your username"
                            name="username"
                            value={username}
                            onChange={(event)=>onInputChange(event)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Email" className="form-lable">
                            Email
                        </label>
                        <input
                            type={"email"}
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={(event)=>onInputChange(event)}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-primary">Register</button>
                    <Link type="submit" className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}