
# 1. Machine Service

What it does:

* Stores basic machine information

* Tracks last maintenance date and maintenance interval

* Provides the current maintenance status of a machine

Why it exists:
This service acts as the source of truth for machines.
Machine status is calculated automatically based on maintenance data, so there is no manual or error-prone status update.

# 2. Scheduler Service

What it does:

* Calculates when maintenance is due

* Periodically checks all machines

* Creates maintenance tasks when a machine is due

Why it exists:
This service handles decision-making logic.
By keeping scheduling logic separate, changes to maintenance rules do not affect other services.

# 3. Task Service

What it does:

* Creates maintenance tasks

* Tracks task progress (Scheduled → In Progress → Completed)

* Stores maintenance history

Why it exists:
This service manages the actual maintenance work lifecycle and ensures all actions are recorded for future reference.
