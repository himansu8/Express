import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';
import calculateReminder from '../utils/reminder.js';
import schedule from 'node-schedule';
import reminderScheduling from '../utils/scheduleJob.js'
import taskModel from '../models/taskModel.js';
import userModel from '../models/userModel.js';

export async function createTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskName, taskDeadLine } = req.body

        // find user id database
        let userFound = await userModel.findById(req.payload.user_id)
        //console.log(userFound)
        if (!userFound) {
            return res.status(404).json({ error: 'not found' })
        }

        let cur_date = new Date();
        let deadline_date = new Date(taskDeadLine);


        let reminders = calculateReminder(cur_date, deadline_date);
        //taskObj.reminder = [...reminders]


        let taskObj = {
            userId: req.payload.user_id,
            taskName,
            createdAt: cur_date,
            deadline: deadline_date,
            isCompleted: false,
            // reminder: []
            reminders
        }

        // let foundtaskname = userFound.task.find((ele) => ele.taskName == taskName)
        // if (foundtaskname) {
        //     return res.status(404).json({ error: 'task alread exist' })
        // }
        let task = await taskModel.create(taskObj);
        res.status(200).json({ msg: "task created successfylly" })

        //scheduling the reminders notification for the each task

        reminders.forEach((ele, index) => {
            schedule.scheduleJob(`${task.id}_${index + 1}`, ele, reminderScheduling);
        })

        //console.log("my reminder >>>> ", schedule.scheduledJobs);

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


        if (taskIndex == -1) {
            return res.status(404).json({ error: 'task not found' })
        }

        // delete the task from task array

        //remove the schedule jobs
        userFound.task[taskIndex].reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskid}_${index + 1}`);
        })

        console.log(schedule.scheduledJobs)

        userFound.task.splice(taskIndex, 1)



        //write to file
        await fs.writeFile('./database/data.json', JSON.stringify(fileData))
        res.status(200).json({ msg: "task deleted successfylly" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export async function updateTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
        const { taskid } = req.params
        const { taskDeadLine } = req.body

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

        if (taskIndex == -1) { return res.status(404).json({ error: 'task not found' }) }
        let deadline_date = new Date(taskDeadLine);
        userFound.task[taskIndex].taskName = req.body.taskName;
        userFound.task[taskIndex].taskDeadLine = deadline_date;

        let cur_date = userFound.task[taskIndex].taskCreateDate
        let create_date = new Date(cur_date)
        let update_reminders = calculateReminder(create_date, deadline_date);

        userFound.task[taskIndex].reminders = update_reminders

        //cancell the job 
        userFound.task[taskIndex].reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskid}_${index + 1}`);
        })


        //rescheduling the jobs===========================================
        userFound.task[taskIndex].reminders.forEach((ele, index) => {
            schedule.scheduleJob(`${taskid}_${index + 1}`, ele, reminderScheduling);
        })

        console.log(schedule.scheduledJobs)
        //userFound.task.push(taskObj);



        //write to file
        await fs.writeFile('./database/data.json', JSON.stringify(fileData))

        res.status(200).json({ msg: "task updated successfylly" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })

    }
}


export async function allTask(req, res) {
    try {
        //console.log("decoded==>>",req.payload.user_id);
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

        let alltask = userFound.task
        res.status(200).send(alltask)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export async function singleTask(req, res) {
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

        let taskIndex = userFound.task.findIndex((ele) => ele.taskId == taskid)
        // console.log(taskIndex)


        if (taskIndex == -1) {
            return res.status(404).json({ error: 'task not found' })
        }

        let singletask = userFound.task[taskIndex]
        res.status(200).send(singletask)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

