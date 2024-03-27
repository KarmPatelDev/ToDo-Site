import { Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    
    // eslint-disable-next-line
    const [user, setUser] = useAuth();

    return user ? <Outlet /> : <Spinner />

};

export default PrivateRoute;