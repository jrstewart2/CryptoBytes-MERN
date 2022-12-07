import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Buy = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [request, setRequest] = useState([]);
    const [fiat, setFiat] = useState("0");
    const [crypto, setCrypto] = useState("0");

    useEffect(() => {
        const getCrypto = async () => {
            console.log(id)
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
    }, [id]);

    const formHandler1 = (e) => {
        let cryptoAmount = parseFloat(e.target.value)
        setCrypto(cryptoAmount);
        let cryptoValue = parseInt(request[0].price)
        setFiat(cryptoAmount * cryptoValue)
    }

    const formHandler2 = (e) => {
        setFiat(parseFloat(e.target.value));
        setCrypto(parseFloat(e.target.value) / parseInt(request[0].price))
    }

    const placeOrder = () => {
        let purchasedCrypto = {
            _id: request[0].symbol,
            name: request[0].name,
            crypto: crypto
        }

        axios.post('http://localhost:4417/addCrypto', purchasedCrypto)
        .then(response => console.log(response));
        navigate("/portfolio");
    }

    return request && (
           
        <Container>
            <Row xs={'auto'} md={'auto'} className="g-4">
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{request[0].symbol}</Card.Title>
                    <Card.Subtitle>{request[0].name}</Card.Subtitle>
                    <Card.Text>{request[0].price}</Card.Text>
                </Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formAmount" onChange={formHandler1}>
                        <Form.Label>{id} to buy</Form.Label>
                        <Form.Control type="number" placeholder={crypto} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAmount" onChange={formHandler2}>
                        <Form.Label>Amount to pay ($)</Form.Label>
                        <Form.Control type="number" placeholder={fiat} />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={placeOrder}>Buy</Button>
            </Card>
            </Row>
        </Container>
    )
}
export default Buy