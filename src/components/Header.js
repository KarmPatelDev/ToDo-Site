import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";

const Header = () => {

    // eslint-disable-next-line
    const [user, setUser] = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try{
            await auth.signOut();
            toast.success("Logout Successful");
            navigate("/login");
        }
        catch(error){
            toast.error("Something Went wrong");
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                    <img
                        src="https://clipground.com/images/logo-light-2.jpg"
                        alt="Logo"
                        draggable="false"
                        height="30"
                        className="mx-3"
                    />
                    ToDo Site
                    </Link>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        {
                            user ? 
                            <>
                            <li className="nav-item">
                            <NavLink to="/user/todo" className="nav-link mx-2">Todos</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink to="/user/profile" className="nav-link mx-2">Profile</NavLink>
                            </li>
                            <li className="nav-item ms-3">
                            <button onClick={handleSignOut} className="nav-link">Logout</button>
                            </li>
                            </>
                            :
                            <>
                            <li className="nav-item ms-3">
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                            </li>
                            <li className="nav-item ms-3">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                            </>
                        }
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;