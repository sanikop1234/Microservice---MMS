# Microservice---MMS

Introduction

Nowadays many companies are basing their applications and solutions on microservices architecture. One of the main benefits of this approach is that it allows splitting a solution into a number of loosely coupled software components (microservices). These software components might have their own release and life cycles, and even development teams. Moreover, these software blocks might even be developed and maintained using different languages and technologies. However, since all the microservices are intended to be a part of something bigger (the application or solution) they always have at least one mechanism for interacting and exchanging data with each other.

At the same time, microservice-based solutions that are used under high-load or have to process rapidly growing volumes of data usually face the same issues and difficulties as the applications and solutions that are not microservices-based:

Disk-backed databases can no longer keep up with growing volumes of data that has to be stored and processed in parallel. Databases are becoming a performance bottleneck affecting the overall solution/application.
Times when a solution's high-availability guarantee was a nice feature to have are becoming a thing of the past. Today, high-availability of an application is becoming a de-facto requiremen
