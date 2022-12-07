import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import Details from './Details.jsx';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Remove = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState();

    const removeCrypto = () => {
        axios.delete(`http://localhost:4417/delete/${id}`)
        .then(response => console.log(response));
    }

    useEffect(() => {
        const getCrypto = async () => {
            const res = await axios.get(`http://localhost:8080/portfolio/${id}`);
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

                <h3>Are you sure you want to Remove {id} From your Portfolio?</h3>
                <Link to="/portfolio"><Button variant="danger" onClick={removeCrypto}>Remove</Button></Link>
                <Link to="/portfolio"><Button variant="primary">Back to Safety</Button></Link>
                
                
              </Row>
            </Container>
        </>
    )
}
export default Remove;