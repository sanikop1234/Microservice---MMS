# Microservice---MMS

## Overview
The Machine Maintenance Scheduler is a microservice-based web application designed to automate periodic machine maintenance, reduce unplanned downtime, and ensure maintenance traceability in manufacturing plants.

# Introduction

Nowadays, many enterprise applications are built using a microservices architecture, which allows a solution to be split into multiple loosely coupled and independently deployable services. Each microservice can have its own development lifecycle, release process, and even technology stack, while still collaborating with other services through well-defined communication mechanisms.

The Machine Maintenance Scheduler (MMS) applies these microservice principles in a real-world manufacturing use case. MMS is designed as a collection of independent services responsible for machine management, maintenance scheduling, and task lifecycle handling. By adopting this approach, the system improves scalability, fault isolation, and maintainability, while ensuring high availability and reliable performance as data volume and system load grow.

## Problem Statement
A microservice-based Machine Maintenance Scheduler combines automated scheduling with a clean web dashboard to reduce downtime and improve maintenance visibility.

## Objective
Build a robust web application that:
- Displays real-time machine status
- Schedules maintenance tasks
- Queries upcoming and overdue maintenance
- Updates and maintains maintenance records

## Architecture
The system follows a microservices architecture with clear service boundaries:
- Machine Service
- Maintenance Scheduler Service
- Task Management Service
- Frontend Web Application

Each service owns its data and communicates via REST APIs.

## Services
### Machine Service
- Manages machine metadata
- Exposes machine status and maintenance details

### Scheduler Service
- Calculates next maintenance due dates
- Automatically creates maintenance tasks

### Task Service
- Manages task lifecycle (Scheduled → In Progress → Completed)
- Maintains immutable maintenance history

## API Highlights
- GET /machines/{id}
- POST /tasks
- GET /tasks?dueIn=7
- PUT /tasks/{id}/complete

## Project Status
This repository currently contains:
- System design and architecture
- API contracts
- Documentation
- Initial service structure

Code implementation can be extended incrementally.

## Documentation
Refer to the `/docs` folder for:
- API contracts
- Scheduler logic
- Design trade-offs

## Presentation
The PowerPoint presentation used during the interview explains the architecture and design decisions in detail.[Machine_Maintenance_Scheduler_Presentation.pptx](https://github.com/user-attachments/files/25098370/Machine_Maintenance_Scheduler_Presentation.pptx)



