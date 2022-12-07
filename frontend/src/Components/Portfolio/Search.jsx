import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Details from './Details.jsx'
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from './Nav.jsx';


const Search = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
        console.log('Loaded Search');

        const getPortfolioItem = async () => {
            const response = await axios.get(`http://localhost:8080/portfolio/${id}`);
            const data = response.data;
            let newCrypto = [{
                 symbol: data[0]._id,
                 name: data[0].name,
                 crypto: data[0].crypto
                 }]
             setItem(newCrypto);
        };
    getPortfolioItem();
    }, [id]);

  return (
    <>
    <Nav />
    <Container>
        <Row xs={'auto'} md={'auto'} className="g-4">
        {
        item.map((i) => (
            <Col>
                <Details
                    id={i.symbol}
                    name={i.name}
                    crypto={i.crypto}
                />
                <Link to={`../edit/${item.symbol}`}><Button variant="success" type="button">Edit</Button></Link>
                <Link to={`../remove/${item.symbol}`}><Button variant="danger" type="button">Remove</Button></Link>
            </Col>
                ))
            }
        </Row>
    </Container>
    </>
  );
}


export default Search;