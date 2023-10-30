//C:\react-js\myreactdev\src\pages\CreateUser.js
import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.post('http://127.0.0.1:5000/useradd', inputs).then(function(response){
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
                <h1>Ajouter un patient</h1>
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