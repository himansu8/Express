import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
    let navigate = useNavigate();

    let [formData, setFormData] = useState({
        taskName: "",
        taskDeadLine: ""
    })
    const { taskName, taskDeadLine } = formData;


    function onChangeHandler(e) {
        console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e) {
        try {
            let token = JSON.parse(localStorage.getItem('token')).token;
            e.preventDefault();
            //console.log(formData)
            let res = await axios.post('/api/task', formData, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            console.log(res.data)
            navigate('/dashboard');

        }
        catch (error) {
            console.log(error)
        }

    }
    function onClear(e) {
        e.preventDefault();
        setFormData({
            taskName: "",
            taskDeadLine: ""
        });
    }
    return (
        <>
<div className="addtask_page">
            <form>
                <div >
                <center><br /><h1 className="jinu1">ADD TASK</h1></center>

                    <label>
                        <b>Task Name</b><br />
                        <input type="text" placeholder="Enter firstName" name="taskName" onChange={onChangeHandler} value={taskName} />
                    </label>
                    <br />
                    <label>
                        <b>Dead Line</b><br />
                        <input type="datetime-local" name="taskDeadLine" placeholder="Date and Time" onChange={onChangeHandler} value={taskDeadLine} />
                    </label>
                    <br />
                    <button type="submit" onClick={onSubmit}>Submit</button>
                    <br />
                    <button type="button" onClick={onClear}>Cancel</button>
                </div>
            </form>
            </div>

        </>
    )
}

export default AddTask