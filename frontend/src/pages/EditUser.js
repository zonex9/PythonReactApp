//C:\react-js\myreactdev\src\pages\EditUser.js
import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./UsersPage.css"; // Import the CSS file

export default function EditUser(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const {id} = useParams();
  
    useEffect(() => {
        getUser();
    }, []);
  
    function getUser() {
        axios.get(`http://127.0.0.1:5000/userdetails/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.put(`http://127.0.0.1:5000/userupdate/${id}`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
          
    }
     
    return (
    <div>
        <div className="container h-100">
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Modifier un patient</h1>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Nom </label>
                      <input type="text" className="form-control" name="nom" onChange={handleChange} />
                    </div>
                    <p/>
                    <div className="mb-3">
                      <label>Prénom </label>
                      <input type="text" className="form-control" name="prenom" onChange={handleChange} />
                    </div>
                    <p/>
                    <div className="mb-3">
                      <label>Adresse mail </label>
                      <input type="text" className="form-control" name="email" onChange={handleChange} />
                    </div>
                    <p/>
                    <div className="mb-3">
                      <label>Age </label>
                      <input type="text" className="form-control" name="age" onChange={handleChange} />
                    </div>
                    <p/> 
                    <div className="mb-3">
                      <label>Région </label>
                      <input type="text" className="form-control" name="region" onChange={handleChange} />
                    </div>
                    <p/>
                    <div className="mb-3">
                      <label>Ville </label>
                      <input type="text" className="form-control" name="ville" onChange={handleChange} />
                    </div>
                    <p/>
                    <div className="mb-3">
                      <label>Adresse </label>
                      <input type="text" className="form-control" name="adresse" onChange={handleChange} />
                    </div>
                    <p/> 
                    <button type="submit" name="add" className="btn btn-success">Savegarder</button>
                </form>
            </div>
            <div className="col-2"></div>
        </div>
        </div>
    </div>
  );
}