import schedule from 'node-schedule';


const date = new Date(2023, 11, 28, 8, 7, 0);

const job = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});