function checkMaintenance(machine) {
  const due = new Date(machine.lastMaintenance);
  due.setDate(due.getDate() + machine.intervalDays);

  if (new Date() >= due) {
    console.log(`Maintenance required for machine ${machine.id}`);
  }
}

module.exports = checkMaintenance;
