import { Card } from 'react-bootstrap';


function Details({
    id, name, crypto,
  }) {
    return (
        <Card border="primary" style={{ width: '10rem' }}>
          <Card.Body>
            <Card.Title>{id}</Card.Title>
            <Card.Subtitle>{name}</Card.Subtitle>
            <Card.Text>{crypto}</Card.Text>
          </Card.Body>
        </Card>
    );
  }

export default Details