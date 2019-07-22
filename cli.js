#! /usr/bin/env node
const prompts = require("prompts");
const opn = require("opn");
const { writeToTimesheet, TIMESHEET_PATH } = require("./utils");

let tasks = [];
let count = 0;

const requiredValidator = (value, message) => {
  if (value) {
    return true;
  } else {
    return message;
  }
};

const addTaskPrompt = async () => {
  const { task, timeSpent } = await prompts(
    [
      {
        type: "text",
        name: "task",
        validate: value => requiredValidator(value, "Please add a task"),
        message: `Enter what you've worked on ${
          count > 3 ? "Yo working too hard! You deserve a candy!" : ""
        }`
      },
      {
        type: "text",
        name: "timeSpent",
        validate: value => requiredValidator(value, "Please add a duration"),
        message: `Enter time spent`
      }
    ],
    {
      onCancel: () => {
        process.exit();
        return false;
      }
    }
  );

  count++;
  return { task, timeSpent };
};

const addTasks = async () => {
  const taskObject = await addTaskPrompt();
  if (taskObject) {
    tasks.push(taskObject);
    const { addMore } = await wantToAddMore();
    if (addMore) {
      addTasks();
    } else {
      console.log(`${count} tasks added `, tasks);
      writeToTimesheet(tasks);
    }
  }
};

const wantToAddMore = () => {
  return prompts(
    [
      {
        type: "toggle",
        name: "addMore",
        message: "Do you want to add more tasks?",
        initial: true,
        active: "Yes",
        inactive: "No"
      }
    ],
    {
      onCancel: () => {
        process.exit();
        return false;
      }
    }
  );
};

const main = () => {
  const args = process.argv.slice(2);
  if (args[0] === "show") {
    opn(TIMESHEET_PATH);
  } else {
    addTasks();
  }
};
main();
