import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpcomingTasks() {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {

    try {

      const res = await fetch("http://localhost:5050/api/maintenance/upcoming");

      const data = await res.json();

      setTasks(data);

    } catch (err) {

      console.error("Failed to load tasks", err);

    }

  }

  async function updateStatus(id, status) {

    try {

      await fetch(`http://localhost:5050/api/maintenance/${id}`, {

        method: "PATCH",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ status }),

      });

      await loadTasks();

    } catch (err) {

      console.error("Failed to update status", err);

    }

  }

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate("/records")}
        className="text-sm text-slate-600 mb-4 hover:underline"
      >
        ← Back to Dashboard
      </button>


      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold mb-6">
        Upcoming Maintenance Tasks
      </h1>


      <div className="space-y-4">

        {tasks.map((t) => (

          <div
            key={t._id}
            className="bg-white border rounded-lg p-5 shadow-sm"
          >

            {/* MACHINE ID */}

            <h2 className="font-semibold text-lg">
              Machine ID: {t.machine_id}
            </h2>

            {/* MACHINE NAME */}

            <p className="text-sm text-slate-700 capitalize">
              Machine: {t.machineName}
            </p>

            {/* TASK */}

            <p className="text-sm text-slate-600 mt-1">
              Task: {t.task}
            </p>

            {/* DATE */}

            <p className="text-sm mt-1">
              Due:{" "}
              <span className="font-medium">
                {new Date(t.scheduledDate).toLocaleString()}
              </span>
            </p>

            {/* STATUS */}

            <p className="text-sm mt-1">
              Status:{" "}
              <span className="font-semibold text-indigo-600">
                {t.status}
              </span>
            </p>


            {/* BUTTONS */}

            <div className="flex gap-3 mt-4">

              {t.status !== "In Progress" && (

                <button
                  onClick={() => updateStatus(t._id, "In Progress")}
                  className="px-4 py-1 bg-amber-500 text-white rounded"
                >
                  Mark In Progress
                </button>

              )}

              {t.status !== "Completed" && (

                <button
                  onClick={() => updateStatus(t._id, "Completed")}
                  className="px-4 py-1 bg-emerald-600 text-white rounded"
                >
                  Mark Completed
                </button>

              )}

            </div>

          </div>

        ))}


        {tasks.length === 0 && (

          <p className="text-slate-600">
            No upcoming maintenance tasks 🎉
          </p>

        )}

      </div>

    </div>

  );

}