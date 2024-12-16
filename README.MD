# To-do-app

In this Project I'll be doing a simple to do API

## Functional Requirements
- [ ] Must Create a task
- [ ] Must list all tasks
- [ ] Must update task by id
- [ ] Must remove task by id
- [ ] Must mark task as completed by id
- [ ] Must import many tasks from a CSV file

## Business Rules
- [] Task must have the following fields:
  - id 
  - title 
  - description
  - completed_at => default must be null
  - creaated_at
  _ updated_at

## Non-Functional Requirements

- [ ] Validate title and description on post and put
- [ ] Validate if the task exists by id and return an error
