import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault()
    }

    const handleUserName = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const submit = () => {
        // console.log("UN: ", username);
        // console.log("PW: ", password);
        axios.post("http://localhost:4417/register", {
            username: username,
            email: email,
            password: password
        })
        .then(res => {
            if (res.data) {
                navigate("/login");    
            } else {
                setStatus("Failed");   
            }
            console.log("RES: ", res)
            console.log("STATUS: ", status)
        })

    }

    return (
        <>
        <form onSubmit={formHandler}>
            <input placeholder="Username" type="text" value={username} onChange={handleUserName} />
            <input placeholder="Email" type="text" value={email} onChange={handleEmail} />
            <input placeholder="Pasword:" type="text" value={password} onChange={handlePassword} />
            <Button variant="warning" type="button" onClick={submit}>Sign-Up</Button>
        </form>
        {status}    
        </>
    )
}

export default SignUp;