import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../firebase";

let unsubscribe = () => {}

const Profile = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [profileUrl, setProfileUrl] = useState("");

    const [updateFirstName, setUpdateFirstName] = useState("");
    const [updateLastName, setUpdateLastName] = useState("");
    const [updatePhoneNumber, setUpdatePhoneNumber] = useState("");
    const [updateAddress, setUpdateAddress] = useState("");

    useEffect(() => {
        handleProfileDetails();

        return (()=>{unsubscribe();});
        // eslint-disable-next-line
    }, []);

    const handleProfileDetails = async () => {
        const uid = auth.currentUser.uid;
        if(uid){
            const userDocRef = await db.collection("Users").doc(uid);
            userDocRef.onSnapshot((doc) => {
                if(doc.exists){
                    const userInfo = doc.data();
                    console.log(userInfo);
                    if(userInfo){
                        setFirstName(userInfo.firstName);
                        setLastName(userInfo.lastName);
                        setPhoneNumber(userInfo.phoneNumber);
                        setAddress(userInfo.address);
                        setEmail(userInfo.email);
                        setProfileUrl(userInfo.profileUrl);
                    }
                }
            });
            setUpdateFirstName(firstName);
            setUpdateLastName(lastName);
            setUpdatePhoneNumber(phoneNumber);
            setUpdateAddress(address);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try{   
            const uid = auth.currentUser.uid;
            const userDocRef = db.collection("Users").doc(uid);
            userDocRef.update({
                firstName: updateFirstName,
                lastName: updateLastName,
                phoneNumber: updatePhoneNumber,
                address: updateAddress
            });
            toast.success("Update Successful");
        }
        catch(error){
            toast.error("Update Unsuccessful");
        }
        
    };

    const handlePhoto = (e) => {
        e.preventDefault();
        
        const uid = auth.currentUser.uid;
        const fileRef = storage.ref().child(`/Users/${uid}/profile`);
        const uploadTask = fileRef.put(e.target.files[0]);
        uploadTask.on('state_changed', 
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress === 100){
                toast.success("Profile Image Changed");
            }
        }, 
        (error) => {
            toast.error("Profile Image not Uploaded");
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const uid = auth.currentUser.uid;
            const userDocRef = db.collection("Users").doc(uid);
            userDocRef.update({
                profileUrl: downloadURL,
            });
            });
        }
        );
    };

    return (
        <Layout>
        <div className="text-center my-3">
            <h3>Profile Details</h3>
            <div className="text-center">
            <img src={profileUrl} alt="Profile" width="200" height="200"/>
            </div>
        </div>

        <div className="modal fade" id="editProfile" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

                <form onSubmit={handleUpdate}>
                    <div className="file-field input-field">
                        <span>Upload Image</span>
                        <input type="file" className="form-control" name="profileImage" accept="image/*" onChange={handlePhoto}/>
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control" name="updateFirstName" placeholder="firstName" value={updateFirstName} onChange={(e)=>setUpdateFirstName(e.target.value)} />
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control" name="updateLastName" placeholder="lastName" value={updateLastName} onChange={(e)=>setUpdateLastName(e.target.value)} />
                    </div>
                    <div className="form-group">
                    <input type="number" className="form-control" name="updatePhoneNumber" placeholder="phoneName" value={updatePhoneNumber} onChange={(e)=>setUpdatePhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control" name="updateAddress" placeholder="address" value={updateAddress} onChange={(e)=>setUpdateAddress(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <div className="container d-flex flex-column align-items-center justify-content-center"> 
        <table className="table text-center table-bordered">
            <tbody>
            <tr>
            <th className="p-3">Name -:</th>
            <td>{firstName} {lastName}</td>
            </tr>
            <tr>
            <th className="p-3">Email -:</th>
            <td>{email}</td>
            </tr>
            <tr>
            <th className="p-3">PhoneNumber -:</th>
            <td>{phoneNumber}</td>
            </tr>
            <tr>
            <th className="p-3">Address -:</th>
            <td>{address}</td>
            </tr>
            </tbody>
        </table>
        <button type="button" className="btn btn-success my-3" data-bs-toggle="modal" data-bs-target="#editProfile" onClick={handleProfileDetails} >Edit Profile</button>
        </div>
        </Layout>
    );
};

export default Profile;