import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Col, Row } from 'react-bootstrap';
import Display from './Display.jsx'
import { Link } from 'react-router-dom';

const Search = () => {
    const { id } = useParams();
    const [request, setRequest] = useState([]);


    useEffect(() => {
        const getCrypto = async () => {
            const res = await axios.get(`http://localhost:4417/api/search/${id}`);
            console.log(res);
            const data = res.data;
            let requestedCrypto = [{
                 symbol: data[0].asset_id,
                 name: data[0].name,
                 price: data[0].price_usd
                 }]
             setRequest(requestedCrypto);
        };
    getCrypto();
    }, []);

    return (
        <Container>
              <Row xs={'auto'} md={'auto'} className="g-4">
                {
                    request.map((item) => (
                        <Col>
                            <Display
                                symbol={item.symbol}
                                name={item.name}
                                price={item.price}
                                />
                        </Col>
                    ))
                }
              </Row>
          </Container>

    )
}

export default Search;