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

        let taskObj = {
            taskName,
            taskId: uuidv4(),
            taskCreateDate: new Date(),
            taskDeadLine: new Date(taskDeadLine),
            isCompleted: false,
            reminder: []
        }

        //let { r1, r2, r3 } = calculateReminder(taskObj.taskCreateDate, taskObj.taskDeadLine);
       //console.log(r1, r2, r3)


        let calculatedReminder = calculateReminder(taskObj.taskCreateDate, taskObj.taskDeadLine);
        taskObj.reminder = [...calculatedReminder, taskObj.taskDeadLine]

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
