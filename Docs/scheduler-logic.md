# Maintenance Scheduling Logic

1. Fetch machine last maintenance date
2. Add maintenance interval to calculate next due date
3. If current date >= due date and no open task exists:
   - Create a new maintenance task
4. On task completion:
   - Update machine last maintenance date
   - Recalculate next due date
   - Store maintenance history
