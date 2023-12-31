import calculateReminder from '../utils/reminder.js';
import schedule from 'node-schedule';
import reminderScheduling from '../utils/scheduleJob.js'
import taskModel from '../models/taskModel.js';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';

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
            schedule.scheduleJob(`${task._id}${index + 1}`, ele, reminderScheduling);
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

        if (!mongoose.isValidObjectId(taskid)) {
            return res.status(400).json({ error: 'please pass valid taskid' })
        }

        let singletask = await taskModel.findOneAndDelete({ _id: taskid });
        console.log(singletask)
        if (!singletask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        //remove the schedule jobs

        singletask.reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskid}_${index + 1}`);
        });

        //console.log(schedule.scheduledJobs)

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
        const { updateTaskName, taskDeadLine } = req.body

        if (!mongoose.isValidObjectId(taskid)) {
            return res.status(400).json({ error: 'please pass valid taskid' })
        }

        let deadline_date = new Date(taskDeadLine);
        let cur_date = new Date()
        let newReminders = calculateReminder(cur_date, deadline_date)


        let task = await taskModel.findByIdAndUpdate(
            taskid,
            { $set: { taskName: updateTaskName, deadline: deadline_date, reminders:newReminders  } },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'task not found' })
        }
        //console.log(task)

        //cancell the job 
        task.reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskid}_${index + 1}`);
        })


        //rescheduling the jobs===========================================
        task.reminders.forEach((ele, index) => {
            schedule.scheduleJob(`${taskid}_${index + 1}`, ele, reminderScheduling);
        })

        res.status(200).json({ msg: "task updated successfylly" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })

    }
}


export async function allTask(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.payload.user_id)) {
            return res.status(400).json({ error: 'please pass valid userid' })
        }

        let tasks = await taskModel.find({ userId: req.payload.user_id });


        if (!tasks) {
            return res.status(404).json({ error: 'task not found' })
        }

        res.status(200).send(tasks)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

export async function singleTask(req, res) {
    try {
        const { taskid } = req.params

        if (!mongoose.isValidObjectId(taskid)) {
            return res.status(400).json({ error: 'please pass valid taskid' })
        }


        let singletask = await taskModel.findById(taskid);
        //console.log(singletask)

        if (!singletask) {
            return res.status(404).json({ error: 'task not found' })
        }
        res.status(200).send(singletask)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" })
    }
}

