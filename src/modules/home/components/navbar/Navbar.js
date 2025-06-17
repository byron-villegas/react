import './Navbar.css';
import { useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="navbar navbar-dark navbar-expand-lg mb-3" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">React</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${currentPath === '/' ? 'active' : ''}`} aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${currentPath === '/users' ? 'active' : ''}`} href="/users">Users</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${currentPath === '/about' ? 'active' : ''}`} href="/about">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;