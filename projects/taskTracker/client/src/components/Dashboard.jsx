import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import ViewTask from "./ViewTask";

function Dashboard() {

  let [tasks, setTasks] = useState([])

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
      fetchTasks(); // Refresh the tasks after deleting a task
    } catch (error) {
      console.log(error);
    }
  }


 
   
  
 



  useEffect(() => {
    fetchTasks()
  }, [])





  return (
    <>
      <div>Dashboard</div>
      <Link to='/addtask'>Add Tasks</Link>

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
              <td><button type="delete" onClick={() => deleteTask(task._id)}>&#10006;</button></td>
              <td><button type="edit">&#9998;</button></td>
              <td><Link to={`/task/${task._id}`} >View</Link></td>
            </tr>
          )
        })}
      </table>

    </>
  )
}

export default Dashboard