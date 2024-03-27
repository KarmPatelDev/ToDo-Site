import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./Layout";

const Spinner = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [count, setCount] = useState(5);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        if(count === 0){
            navigate("/login", {
                state: location.pathname,
            });
        }
        return () => clearInterval(interval);
    }, [count, navigate, location]);

    return(
        <Layout>
            <h1 className="font-weight-bold text-uppercase bg-warning text-center">Sorry, You Can't Access -: {count}</h1>
        </Layout>
    );
};

export default Spinner;