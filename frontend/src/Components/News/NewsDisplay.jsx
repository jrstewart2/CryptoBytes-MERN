import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const NewsDisplay = ({id, author, date, title, source}) => {

    return (
        
        <Accordion>
            <Accordion.Item eventKey={id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
                Author: {author}. {date}<br />
                Source: {source}
                <form action={source}>
                    <Button variant="outline-danger" type="submit">Go</Button>
                </form>
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
export default NewsDisplay;