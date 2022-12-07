import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import Details from './Details.jsx';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState();
    const [amount, setAmount] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleForm = (e) => {
        setAmount(e.target.value);
    }

    const updateCrypto = () => {
        let body = {
            crypto: amount
        }
        axios.put(`http://localhost:8080/portfolio/${id}`, body)
        .then(response => console.log(response.data));
    }

    useEffect(() => {
        const getCrypto = async () => {
            const res = await axios.get(`http://localhost:4417/getPortfolio/${id}`);
            console.log(res.data[0]);
            setCrypto(res.data[0]);
        };
        getCrypto();
      }, [id]);


    return crypto && (
        <> 
            <Nav />
            <Container>
              <Row xs={'auto'} md={'auto'} className="g-4">
   
              <Details
                    id={id}
                    name={crypto.name}
                    crypto={crypto.crypto}
                    />

                <form onSubmit={handleSubmit}>
                <input placeholder="New Amount:" type="number" value={amount} onChange={handleForm} />
                <Link to="/portfolio"><Button variant="primary" onClick={updateCrypto}>Update</Button></Link>
                </form>
                
              </Row>
            </Container>
        </>
    )
}
export default Edit;