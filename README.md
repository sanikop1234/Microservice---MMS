# Microservice---MMS

## Overview
The Machine Maintenance Scheduler is a microservice-based web application designed to automate periodic machine maintenance, reduce unplanned downtime, and ensure maintenance traceability in manufacturing plants.

# Introduction

Nowadays many companies are basing their applications and solutions on microservices architecture. One of the main benefits of this approach is that it allows splitting a solution into a number of loosely coupled software components (microservices). These software components might have their own release and life cycles, and even development teams. Moreover, these software blocks might even be developed and maintained using different languages and technologies. However, since all the microservices are intended to be a part of something bigger (the application or solution) they always have at least one mechanism for interacting and exchanging data with each other.

At the same time, microservice-based solutions that are used under high-load or have to process rapidly growing volumes of data usually face the same issues and difficulties as the applications and solutions that are not microservices-based:

Disk-backed databases can no longer keep up with growing volumes of data that has to be stored and processed in parallel. Databases are becoming a performance bottleneck affecting the overall solution/application.
Times when a solution's high-availability guarantee was a nice feature to have are becoming a thing of the past. Today, high-availability of an application is becoming a de-facto requiremen

## Problem Statement
Manual maintenance tracking leads to missed schedules, unplanned downtime, and poor maintenance traceability.

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



