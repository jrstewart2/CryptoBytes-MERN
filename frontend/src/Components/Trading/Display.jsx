import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Display({
    symbol, name, price,
  }) {
    return (
        <Card border="primary" style={{ width: '10rem' }}>
          <Card.Body>
            <Card.Title>{symbol}</Card.Title>
            <Card.Subtitle>{name}</Card.Subtitle>
            <Card.Text>{price}</Card.Text>
          </Card.Body>
          <Link to={`./buy/${symbol}`}><Button variant="success" type="button">Buy</Button></Link>
        </Card>
    );
  }

export default Display;