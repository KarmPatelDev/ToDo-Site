import React from "react";
import { useAuth } from "../context/Auth";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {

    // eslint-disable-next-line
    const [user, setUser] = useAuth();

    return (
        <Layout>
        {
            <>
                <header className="masthead">
                <div className="container h-100" >
                    <div className="row h-100 align-items-center position-relative">
                    <div className="col-12 text-center position-absolute top-50 end-0">
                            <h1 className="font-weight-bold text-uppercase bg-warning mb-5">Organize your work and life, finally.</h1>
                            {
                                user ? <>
                                <Link to="/user/todo"><button className="btn btn-danger mx-2">Add Notes</button></Link>
                                </> : <>
                                <Link to="/login"><button className="btn btn-primary mx-2">Login</button></Link>
                                <Link to="/register"><button className="btn btn-danger mx-2">SignUp</button></Link>
                                </>
                            }
                    </div>
                    </div>
                </div>
                </header>
            </>
        }
        </Layout>
    )
};

export default HomePage;