import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import ViewTask from "./ViewTask";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  let [tasks, setTasks] = useState([])
  let navigate = useNavigate();
  async function fetchTasks() {
    try {
      let token = JSON.parse(localStorage.getItem('token')).token
      let res = await axios.get('/api/task', {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })


      //console.log(res.data)
      setTasks(res.data)


    } catch (error) {
      console.log(error)
    }
  }


  async function deleteTask(taskId) {
    try {
      let token = JSON.parse(localStorage.getItem('token')).token;
      await axios.delete(`/api/task/${taskId}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });

      let updatedTasks = tasks.filter((ele) => ele._id !== taskId);
      setTasks(updatedTasks);
      //fetchTasks(); // Refresh the tasks after deleting a task
    } catch (error) {
      console.log(error);
    }
  }


  function onClickHandler(taskid, taskName, deadline) {
   
    navigate(
      '/task/edit',
      {
        state: {
          taskid, taskName, deadline:new Date(deadline.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
        }
      }
    )
  }


  useEffect(() => {
    fetchTasks()
  }, [])





  return (
    <>
      <div className="dashboard_main">
        <div className="dashboard_img">
          <img src="https://th.bing.com/th/id/R.91dd0ef5bca86a269c39abe8ba4ed19d?rik=afBuubf455YtjA&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f573a5a8f62cd94560724a170%2ft%2f621d3c9517b3ee55f55df129%2f1646083221928%2fHL-websites-logos-dashboard-02.png%3fformat%3d1500w&ehk=BpxITSA%2fFL%2fDeoaAbdsrKk6OXFrlZS14PUEFcW7JqsE%3d&risl=&pid=ImgRaw&r=0"
            width={"1150px"} height={"90px"} />
        </div>
        <div className="addtask">
          <Link to='/addtask'><button><b>Add New Tasks</b></button></Link>
        </div>
        <div className="logout">
          <button onClick={() => {
            localStorage.removeItem('token')
            navigate("/");
          }}>
            Log Out
          </button>
        </div>
        <div className="dashboard_data">
          <table>
            <tr>
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>View</th>

            </tr>



            {tasks.map(task => {
              return (
                <tr>
                  <td>{task.taskName}</td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td>{task.isCompleted ? "completed" : "Pending"}</td>
                  <td><button className="delete-button" type="delete" onClick={() => deleteTask(task._id)}>&#10006;</button></td>
                  <td><button className="edit-button" onClick={() => onClickHandler(task._id,task.taskName,task.deadline)} type="edit">&#9998;</button></td>
                  <td><Link to={`/task/${task._id}`} className="view-link">View</Link></td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard