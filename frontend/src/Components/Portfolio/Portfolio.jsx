import { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './Details.jsx'
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav from './Nav.jsx'

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const getPortfolio = async () => {
            const response = await axios.get('http://localhost:8080/portfolio');
            const data = response.data;
            let clonePortfolio = [];
            for (let i = 0; i < data.length; i++){
                let newCrypto = {
                    symbol: data[i]._id,
                    name: data[i].name,
                    crypto: data[i].crypto
                }

                clonePortfolio.push(newCrypto);
                
            }
            setPortfolio(clonePortfolio);
        };
    getPortfolio();
    }, []);


    return portfolio && (
        <div>
            <Nav />      
            <br />
            <Container>
              <Row xs={'auto'} md={'auto'} className="g-4">
                {
                    portfolio.map((item) => (
                        <Col>
                        <Details
                                id={item.symbol}
                                name={item.name}
                                crypto={item.crypto}
                                />
                            <Link to={`./edit/${item.symbol}`}><Button variant="success" type="button">Edit</Button></Link>
                            <Link to={`./remove/${item.symbol}`}><Button variant="danger" type="button">Remove</Button></Link>
                        </Col>
                    ))
                }
              </Row>
          </Container>
        </div>
    )
}

export default Portfolio;