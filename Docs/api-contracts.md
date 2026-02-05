# API Contracts

## Machine Service
GET /machines/{id}
Returns machine status, last maintenance date, and next due date.

## Task Service
POST /tasks
Creates a new maintenance task.

GET /tasks?dueIn=7
Returns upcoming maintenance tasks.

PUT /tasks/{id}/complete
Marks a maintenance task as completed.

