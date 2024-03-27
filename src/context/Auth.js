import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if(user){
            setUser(user);
          }
          else{
            setUser(null);
          }
        });
        return (() => unsubscribe());
    }, []);

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };