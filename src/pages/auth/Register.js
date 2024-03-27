import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(password === confirmPassword){
                const result = await auth.createUserWithEmailAndPassword(email, password);
                await result.user.updateProfile({
                    displayName: "User"
                });
                await db.collection("Users").doc(result.user.uid).set({
                    uid: result.user.uid,
                    firstName: "",
                    lastName: "",
                    phoneNumber: 0,
                    address: "",
                    email: email,
                    profileUrl: "/profile.png"
                });
                toast.success("Register Successful");
                navigate("/user/todo");
            }
            else{
                toast.error("Password not matched");
            }
        }
        catch(error){
            toast.error("Enter Valid Details or Valid Already Exists");
        }
    };

    return (
        <Layout>
        <form className="container" onSubmit={handleSubmit}>
            <h3 className="text-center my-5">Register</h3>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </Layout>
    );
};

export default Register;