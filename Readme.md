# timesheet-cli

Overview
---

```
yarn
yarn start

✔ Enter what you've worked on - Fixed Bug#1353
✔ Enter time spent - 2 hours
✔ Do you want to add more tasks? - No / Yes
```

```
Output json will be stored in a file named ./timesheet.json
{
  "7/22/2019": [
    { "task": "Fixed Bug#1353", "timeSpent": "2 hours" },
    { "task": "Worked on Task #17336", "timeSpent": "7 hours" }
  ],
  "order": ["7/22/2019"]
}
```

Todo
---
* Provide a functionality to export to CSV.
* Installable CLI
