import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';
import calculateReminder from '../utils/reminder.js';

export async function createTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskName, taskDeadLine } = req.body

        //read the file 
        let fileData = await fs.readFile('./database/data.json');
        fileData = JSON.parse(fileData);
        //console.log(fileData);


        // find user id database
        let userFound = fileData.find((ele) => ele.id == req.payload.user_id);
        //console.log(userFound)
        if (!userFound) {
            return res.status(404).json({ error: 'not found' })
        }
        //console.log("before push---------------")
        //console.log(userFound)

        let cur_date = new Date();
        let deadline_date = new Date(taskDeadLine);


        let reminders = calculateReminder(cur_date, deadline_date);
        //taskObj.reminder = [...reminders]


        let taskObj = {
            taskName,
            taskId: uuidv4(),
            taskCreateDate: cur_date,
            taskDeadLine: deadline_date,
            isCompleted: false,
            // reminder: []
            reminders
        }

        //let { r1, r2, r3 } = calculateReminder(taskObj.taskCreateDate, taskObj.taskDeadLine);
        //console.log(r1, r2, r3)
        let foundtaskname=userFound.task.find((ele)=>ele.taskName==taskName)
        if (foundtaskname) {
            return res.status(404).json({ error: 'task alread exist' })
        }

        userFound.task.push(taskObj);
        //console.log("after push------------------")
        //console.log(userFound)


        //write to file
        await fs.writeFile('./database/data.json', JSON.stringify(fileData))




        res.status(200).json({ msg: "task created successfylly" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}



export async function deleteTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskid } = req.params

        //read the file 
        let fileData = await fs.readFile('./database/data.json');
        fileData = JSON.parse(fileData);
        //console.log(fileData);


        // find user id database
        let userFound = fileData.find((ele) => ele.id == req.payload.user_id);
        //console.log(userFound)
        if (!userFound) {
            return res.status(404).json({ error: 'not found' })
        }

        //find the task with the taskid after that remove the task from the array. cancel the jobs.  
        //console.log(userFound);

        let taskIndex = userFound.task.findIndex((ele) => ele.taskId == taskid)
       // console.log(taskIndex)

       if(taskIndex==-1){return res.status(404).json({ error: 'task not found' })}

        userFound.task.splice(taskIndex, 1)

        //write to file
        await fs.writeFile('./database/data.json', JSON.stringify(fileData))

        res.status(200).json({ msg: "task deleted successfylly" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })

    }
}
