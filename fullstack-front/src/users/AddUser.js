import axios from 'axios';
import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';

export default function Adduser() {

    let navigate = useNavigate()

    const [user,setUser]=useState({
        name:"",
        username:"",
        email:""
    })

    const{name, username, email}=user  

    const onInputChange=(event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    };

    const onSubmit= async (event)=>{
        event.preventDefault();

        await axios.post("http://localhost:8080/user", user);
        navigate("/");
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Register User</h2>

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