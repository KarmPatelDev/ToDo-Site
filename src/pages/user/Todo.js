import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

let unsubscribe = () => {}

const Todo = () => {

    const ref = useRef(null);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskText, setTaskText] = useState('');
    const [taskImp, setTaskImp] = useState(false);
    const [prevTasks, setPrevTasks] = useState([]);
    const [editTasks, setEditTasks] = useState(false);

    useEffect(() => {
        const uid = auth.currentUser.uid;
        const  docRef = db.collection("Tasks").doc(uid);
        unsubscribe = docRef.onSnapshot((docSnap) => {
            if(docSnap.exists){
                setPrevTasks(docSnap.data().task);
            }
        });

        return (()=>{unsubscribe();});
        
    }, []);

    const addToDo = (e) => {
        e.preventDefault();

        const liveTime = new Date().toLocaleString();
        const uid = auth.currentUser.uid;
        db.collection("Tasks").doc(uid).set({
            task: [{
                title: taskTitle,
                note: taskText,
                important: taskImp,
                time: liveTime,
            }, ...prevTasks],
        });
        setTaskTitle('');
        setTaskText('');
        setTaskImp(false);
        toast.success("Task is added");
    };

    const deleteToDo = (deleteIndex) => {
        const uid = auth.currentUser.uid;
        const  docRef = db.collection("Tasks").doc(uid);
        docRef.get().then((docSnap) => {
            const result = docSnap.data().task.filter((todo, index) => index !== deleteIndex);
            docRef.update({
                task: result,
            });
        });
        if(editTasks){
            toast.success("Now, You can edit and add again");
            setEditTasks(false);
        }
        else{
            toast.success("Task is deleted");
        }
    };

    const editToDo = (editTask, editIndex) => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
        setTaskTitle(editTask.title);
        setTaskText(editTask.note);
        setTaskImp(editTask.important);
        setEditTasks(true);
        deleteToDo(editIndex);
    };

    return (
        <Layout>

        <div className="container mt-5" style={{marginBottom:"5rem"}}>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title" ref={ref}>Add A Note</h5>
                <form onSubmit={addToDo}>
                <div className="mb-3">
                <input className="form-control my-3" type="text" name="taskTitle" maxLength="25" placeholder="Enter Title" aria-label="Title" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
                <textarea className="form-control" name="taskText" rows="3" value={taskText} onChange={(e)=>setTaskText(e.target.value)}></textarea>
                <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" name="taskImp" role="switch" id="flexSwitchCheckChecked" checked={taskImp} onChange={()=>setTaskImp(!taskImp)}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Mark As Important</label>
                </div>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
            </div>

            <hr/>
            <h1>Your Notes</h1>
            <hr/>

            <div id="notes" className="row container-fluid">
                {
                    prevTasks.map((task, index) => {
                        return (
                            <div className="noteCard my-2 mx-3 p-0 card" key={index}>
                                <div className="card-header d-flex justify-content-between">     
                                <div className="card-text">{task.time}</div>
                                {
                                    task.important ? <div className="badge text-bg-danger">Important</div> : null
                                }
                                </div>
                                <div className="card-body">
                                <h5 className="card-title noteCardTitle">{task.title}</h5>
                                <p className="card-text noteCardText">{task.note}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                <button type="button" className="btn btn-success" onClick={() => {editToDo(task, index);}}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => {deleteToDo(index);}}>Delete</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        </Layout>
    );
};

export default Todo;