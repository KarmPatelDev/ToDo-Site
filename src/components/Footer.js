import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        
        <footer class="d-flex flex-wrap justify-content-between align-items-center px-5 py-2 bg-dark fixed-bottom">
            <p class="col-md-4 mb-0 text-white">All Right Reserved &copy; ToDo Site</p>

            <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item"><Link to="/" class="nav-link px-2">Home</Link></li>
            <li class="nav-item"><Link to="/about" class="nav-link px-2">About</Link></li>
            <li class="nav-item"><Link to="/contact" class="nav-link px-2">Contact</Link></li>
            <li class="nav-item"><Link to="/policy" class="nav-link px-2">Policy</Link></li>
            </ul>
        </footer>
        
    );
}

export default Footer;