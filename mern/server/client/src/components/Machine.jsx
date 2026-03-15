import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TASK_SUGGESTIONS = [
  "Replace hydraulic oil",
  "General inspection",
  "Replace coolant filter",
  "Lubrication check",
  "Inspect safety guards",
  "Weekly belt alignment",
  "Motor temperature check",
  "Replace valve seals",
  "Pressure test",
  "Inspect generator coils",
  "Change oil filter",
];

export default function Machine() {

  const { machineName } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [machine, setMachine] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* LOAD MACHINE */

  useEffect(() => {

    fetch("http://localhost:5050/api/machines")
      .then(res => res.json())
      .then(data => {

        const found = data.find(
          m => m.name.toLowerCase() === machineName.toLowerCase()
        );

        setMachine(found);

      });

  }, [machineName]);


  /* LOAD TASKS */

  useEffect(() => {

    if (!machine) return;

    fetch("http://localhost:5050/api/maintenance/upcoming")
      .then(res => res.json())
      .then(data => {

        const machineTasks = data.filter(
          t => t.machine_id === machine.machine_id
        );

        setTasks(machineTasks);

      });

  }, [machine]);


  /* SCHEDULE TASK (AUTO CURRENT TIME) */

  async function scheduleTask(e) {

    e.preventDefault();

    if (!machine) return;

    const now = new Date();

    await fetch("http://localhost:5050/api/maintenance", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        machine_id: machine.machine_id,
        machineName: machine.name,
        task: task,
        scheduledDate: now

      })

    });

    setTask("");

    reloadTasks();

  }


  async function reloadTasks() {

    const res = await fetch("http://localhost:5050/api/maintenance/upcoming");

    const data = await res.json();

    const machineTasks = data.filter(
      t => t.machine_id === machine.machine_id
    );

    setTasks(machineTasks);

  }


  return (

    <div className="h-screen bg-slate-100 flex flex-col">

      {/* HEADER */}

      <div className="p-8 pb-4">

        <button
          onClick={() => navigate("/records")}
          className="text-sm text-slate-600 hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold capitalize mb-1">
          {machineName.replace("-", " ")}
        </h1>

        <p className="text-slate-600">
          Machine Maintenance Control Panel
        </p>

        {machine && (
          <p className="text-sm text-slate-500 mt-1">
            Machine ID: <span className="font-semibold">{machine.machine_id}</span>
          </p>
        )}

      </div>


      {/* SCROLL AREA */}

      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">


        {/* STATUS */}

        <div className="bg-white border rounded-xl p-5">

          <h2 className="font-semibold mb-2">
            Current Status
          </h2>

          {machine ? (

            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                machine.healthStatus === "Healthy"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {machine.healthStatus}
            </span>

          ) : (

            <span className="text-slate-400 text-sm">
              Loading status…
            </span>

          )}

        </div>


        {/* SCHEDULE FORM */}

        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Schedule Maintenance
          </h2>

          <form onSubmit={scheduleTask} className="space-y-4 relative">

            <input
              type="text"
              value={task}
              placeholder="Maintenance task description"
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => setTask(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2"
            />

            {showSuggestions && (

              <div className="absolute z-20 w-full bg-white border rounded-md shadow max-h-40 overflow-y-auto">

                {TASK_SUGGESTIONS.map((s, i) => (

                  <div
                    key={i}
                    onClick={() => {
                      setTask(s);
                      setShowSuggestions(false);
                    }}
                    className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer"
                  >
                    {s}
                  </div>

                ))}

              </div>

            )}

            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800"
            >
              Schedule Task
            </button>

          </form>

        </div>


        {/* MAINTENANCE HISTORY */}

        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Maintenance History
          </h2>

          <div className="space-y-3">

            {tasks.length === 0 && (

              <p className="text-slate-500 text-sm">
                No maintenance tasks scheduled.
              </p>

            )}

            {tasks.map((t) => (

              <div
                key={t._id}
                className="border rounded-lg p-4 text-sm"
              >

                <p className="font-medium">
                  Machine ID: {t.machine_id}
                </p>

                <p className="font-medium">
                  {t.task}
                </p>

                <p className="text-slate-600">
                  {new Date(t.scheduledDate).toLocaleString()}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  {t.status}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}