import { useState } from 'react'
import Form from './Form.jsx';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault()
        console.log(e)
    }

    const handleUserName = (e) => {
        setUsername(e.target.value);
        console.log(username)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log(password)
    }

    const submit = () => {
        // console.log("UN: ", username)
        // console.log("PW: ", password)
        axios.post("http://localhost:4417/login", {
            username: username,
            password: password
        })
        .then(res => {
            console.log("RES: ", res)
            if (res.data === "Login failed") {
                setStatus(res.data); 
            } else {
                setStatus(res.data); 
                navigate("/");   
            } 
        })
        console.log("STATUS: ", status)

    }

    return (
        <>
        <Form formHandler={formHandler} handleUserName={handleUserName} handlePassword={handlePassword} />
        <Button variant="primary" type="button" onClick={submit}>Log In</Button>
        <p>{status}</p>
        <div>
            <br />
            <p>Not got an account?</p>
            <Link to={`../signup`}><Button variant="warning" type="button">Register</Button></Link>
        </div>
        </>
    )
}

export default Login;