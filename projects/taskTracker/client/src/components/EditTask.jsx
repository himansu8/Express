import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditTask() {
    let navigate = useNavigate();
    const { state } = useLocation();
    console.log(state.deadline)
    //console.log(state)
    let deadline = state.deadline.toLocaleString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata'
    });
    console.log(deadline)
    const [data, setData] = useState({
        updateTaskName: state.taskName,
        taskDeadLine: deadline,
        newIsCompleted: "false",

    })

    function onChangeHandler(e) {
        console.log(e.target.name, e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const inputData = async (taskid) => {

        try {
            let token = JSON.parse(localStorage.getItem('token')).token;
            console.log(token)
            let res = await axios.patch(`/api/task/${taskid}`, data, {
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

            {/* {data.newIsCompleted == "true" ? "true" : "false"} */}
            <div className="edit_page">
                <div className="edit_form">
                    <center><br /><h1 className="jinu1">UPDATE TASK</h1></center>

                    <label>
                        <b>newTaskName</b><br />
                        <input type="text" placeholder="Enter TaskName" name="updateTaskName" value={data.updateTaskName} onChange={onChangeHandler} />
                    </label>
                    <br />
                    <label>
                        <b>newDeadLine</b><br />
                        <input type="datetime" placeholder="Enter Deadline" name="taskDeadLine" value={data.taskDeadLine} onChange={onChangeHandler} />
                    </label>
                    <br />

                    <label>
                        <b>Status</b>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="newIsCompleted"
                                value="true"
                                onChange={onChangeHandler}
                                checked={data.newIsCompleted === "true"}
                            />
                            Completed
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="newIsCompleted"
                                value="false"
                                onChange={onChangeHandler}
                                checked={data.newIsCompleted === "false"}
                            />
                            Not Completed
                        </label>
                    </label>

                    <button type="submit" onClick={() => inputData(state.taskid)}>Submit</button>
                </div>
            </div>
        </>

    )
}

export default EditTask