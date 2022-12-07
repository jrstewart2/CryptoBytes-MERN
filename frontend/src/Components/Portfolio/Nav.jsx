import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
    const [request, setRequest] = useState("")

    const changeHandler = (e) => {
        setRequest(e.target.value);
    };

    return (
        <header className="miniNav">
            <table width="90%">
                <tr>
                    <td><p className="portfolio">Your Portfolio</p></td>
                    <td>
                        <input type="text" default="searchPortfolio" value={request} onChange={changeHandler} />
                        <Link to={`./search/${request}`}><Button variant="outline-warning" type="button">Find</Button></Link>
                    </td>
                    <td><Link to="/addcrypto"><Button variant="outline-primary" type="button">Add Crypto</Button></Link></td>
                </tr>
            </table>
        </header>
    )
}

export default Nav;