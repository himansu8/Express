import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditTask() {
    let navigate = useNavigate();
    const { state } = useLocation();
    //console.log(state.taskid)
    const [data, setData] = useState({
        updateTaskName: "",
        taskDeadLine: "",
        newIsCompleted: "",
    })

    function onChangeHandler(e) {
       // console.log(e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const inputData = async (taskid) => {

        try {
            let token = JSON.parse(localStorage.getItem('token')).token;
            console.log(token)
            let res = await axios.patch(`/api/task/${taskid}`, data,{
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            console.log(res.data)
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>


            <div className="edit_page">
                <div className="edit_form">
                <center><br /><h1 className="jinu1">UPDATE TASK</h1></center>

            <label>
                <b>newTaskName</b><br />
                <input type="text" placeholder="Enter TaskName" name="updateTaskName" onChange={onChangeHandler} />
            </label>
            <br />
            <label>
                <b>newDeadLine</b><br />
                <input type="datetime-local" placeholder="Enter Deadline" name="taskDeadLine" onChange={onChangeHandler} />
            </label>
            <br />
            <label>
                <b>Status</b><br />
                <input type="text" placeholder=" isCompleted (yes or no)" name="newIsCompleted" onChange={onChangeHandler} />
            </label>
            <button type="submit" onClick={() => inputData(state.taskid)}>Submit</button>
            </div>
            </div>
        </>

    )
}

export default EditTask