import { Link } from 'react-router-dom';
function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    background: '#333',
    padding: '10px',
    color: 'white'
  };
  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  };
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

export default Navbar;

