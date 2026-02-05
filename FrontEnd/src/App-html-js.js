import React, { useEffect, useState } from "react";

function App() {
  const [machine, setMachine] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/machines/M1")
      .then(res => res.json())
      .then(data => setMachine(data));

    fetch("http://localhost:3002/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1>Machine Maintenance Scheduler</h1>
        <p>Plant Operations Dashboard</p>
      </header>

      {/* KPI Cards */}
      <div style={styles.kpiRow}>
        <Kpi title="Total Machines" value="1" />
        <Kpi title="Open Tasks" value={tasks.filter(t => t.status !== "COMPLETED").length} />
        <Kpi title="Completed Tasks" value={tasks.filter(t => t.status === "COMPLETED").length} />
      </div>

      {/* Machine Section */}
      <section style={styles.section}>
        <h2>Machine Overview</h2>
        {machine && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Last Maintenance</th>
                <th>Next Due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{machine.id}</td>
                <td>{machine.name}</td>
                <td>
                  <StatusBadge status={machine.status} />
                </td>
                <td>{machine.lastMaintenance}</td>
                <td>{new Date(machine.nextDueDate).toDateString()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>

      {/* Task Section */}
      <section style={styles.section}>
        <h2>Maintenance Tasks</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Machine ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.machineId}</td>
                <td><StatusBadge status={task.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

/* Reusable Components */
const Kpi = ({ title, value }) => (
  <div style={styles.kpiCard}>
    <h3>{value}</h3>
    <p>{title}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const color =
    status === "OPERATIONAL" ? "#2e7d32" :
    status === "NEEDS_MAINTENANCE" ? "#ed6c02" :
    status === "COMPLETED" ? "#1565c0" :
    "#c62828";

  return (
    <span style={{ ...styles.badge, backgroundColor: color }}>
      {status}
    </span>
  );
};
