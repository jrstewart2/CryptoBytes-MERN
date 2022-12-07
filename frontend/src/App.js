import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {
  BrowserRouter as Router, Link, Routes, Route,
} from 'react-router-dom';
import NavLogo from './Components/imgs/logo-nav.png'
import FootLogo from './Components/imgs/foot-logo.png';
import Portfolio from './Components/Portfolio/Portfolio.jsx'
import Edit from './Components/Portfolio/Edit.jsx'
import Remove from './Components/Portfolio/Remove.jsx'
import AddCrypto from './Components/Portfolio/AddCrypto.jsx'
import SearchPortfolio from './Components/Portfolio/Search.jsx'
import Trading from './Components/Trading/Trading.jsx'
import Buy from './Components/Trading/Buy.jsx'
import Search from './Components/Trading/Search.jsx'
import News from './Components/News/News.jsx'
import Home from './Components/Home.jsx'
import Signup from './Components/Auth/Sign-up.jsx'
import Login from './Components/Auth/Login.jsx'


function App() {

  return (
    <div className="appDiv">
      <Router>
        <nav className="navBar">
          <table width="90%">
            <tbody>
              <tr>
                <th><Link to="/"><img src={NavLogo} alt="CryptoBytes Logo" /></Link></th>
                <th>
                  <Link to="/portfolio"><Button variant="outline-primary" type="button">Portfolio</Button></Link>
                  <Link to="/trading"><Button variant="outline-success" type="button">Trading</Button></Link>
                  <Link to="/news"><Button variant="outline-info" type="button">News</Button></Link>
                </th>
                <th>
                  <Link to="/login"><Button variant="outline-light" type="button">Log In</Button></Link>
                </th>
              </tr>
            </tbody>
          </table>

        </nav>
        <div className="contentDiv">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/edit/:id" element={<Edit />} />
            <Route path="/portfolio/remove/:id" element={<Remove />} />
            <Route path="/portfolio/search/:id" element={<SearchPortfolio />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/trading/buy/:id" element={<Buy />} />
            <Route path="/trading/search/buy/:id" element={<Buy />} />
            <Route path="/trading/search/:id" element={<Search />} />
            <Route path="/addcrypto" element={<AddCrypto />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </Router>
      <footer className="headFoot">
        <img className="footLogo" src={FootLogo} alt="Footer CryptoBytes Logo" />
      </footer>
    </div>
  );
}

export default App;
