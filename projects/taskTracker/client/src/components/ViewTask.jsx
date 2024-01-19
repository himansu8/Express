import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ViewTask() {
  const { taskid } = useParams();
  //console.log(taskid)
  const [task, setTask] = useState({});

  const fetchTask = async (taskid) => {

    try {
      let token = JSON.parse(localStorage.getItem('token')).token;
      let res = await axios.get(`/api/task/${taskid}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      setTask(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTask(taskid);
  },[]);


  return (
    <>
    <div className="edit_page">
    <center>
<center><br /><h1 className="jinu1">TASK DETAILS</h1></center>

      <table>
        <tr>
        <th>ID</th>
          <th>Task Name</th>
          <th>Creat Date</th>
          <th>Task Deadline</th>
          <th>Status</th>

        </tr>
        <tr>
        <td>{task._id}</td>
          <td>{task.taskName}</td>
          <td>{new Date(task.createdAt).toLocaleDateString()}</td>
          <td>{new Date(task.deadline).toLocaleDateString()}</td>
          <td>{task.isCompleted ? "completed" : "Pending"}</td>
        </tr>
      </table>
      </center>
      </div>
    </>
  );
}

export default ViewTask