const fs = require("fs");
let timesheetObj = {};
const TIMESHEET_PATH = "./timesheet.json";

try {
  timesheetObj = require(TIMESHEET_PATH);
} catch (e) {}

function getFormattedDate() {
  return new Date().toLocaleDateString();
}

const todaysDate = getFormattedDate();

const writeToTimesheet = tasks => {
  if (!timesheetObj[todaysDate]) {
    timesheetObj[todaysDate] = [];
  }
  if (!timesheetObj.order) {
    timesheetObj.order = [];
  }

  const dateOrders = new Set(timesheetObj.order);
  dateOrders.add(todaysDate);

  timesheetObj[todaysDate] = timesheetObj[todaysDate].concat(tasks);
  timesheetObj.order = Array.from(dateOrders);

  fs.writeFile(TIMESHEET_PATH, JSON.stringify(timesheetObj), function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

module.exports = {
  writeToTimesheet
};
