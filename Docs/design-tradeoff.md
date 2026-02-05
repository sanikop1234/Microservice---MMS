# Design Trade-offs

## Microservices vs Monolith
Microservices were chosen for scalability and clear domain ownership.
Trade-off: Increased system complexity.

## Derived Status vs Manual Updates
Machine status is derived from maintenance data to avoid human error.
Trade-off: Slightly more computation during reads.

## REST APIs vs Event Messaging
REST APIs were chosen for simplicity and clarity.
Trade-off: Less real-time compared to full event-driven systems.
