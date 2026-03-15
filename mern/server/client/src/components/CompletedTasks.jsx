import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompletedTasks() {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompleted();
  }, []);

  async function loadCompleted() {

    try {

      const res = await fetch("http://localhost:5050/api/maintenance/completed");

      let data = await res.json();

      // newest tasks appear at bottom
      data = data.sort(
        (a, b) => new Date(a.completedDate) - new Date(b.completedDate)
      );

      setTasks(data);

    } catch (err) {

      console.error("Failed to load completed tasks", err);

    }

  }

  return (

    <div className="p-8 bg-slate-100 min-h-screen">

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate("/records")}
        className="mb-4 text-sm text-slate-600 hover:underline"
      >
        ← Back to Dashboard
      </button>


      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold mb-6">
        Completed Maintenance Jobs
      </h1>


      {/* TABLE */}

      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">

        <table className="w-full table-fixed text-sm">

          <thead>

            <tr className="border-b bg-slate-50 text-left">

              <th className="p-3 w-[8%]">Task No</th>

              <th className="p-3 w-[12%]">Machine ID</th>

              <th className="p-3 w-[18%]">Machine</th>

              <th className="p-3 w-[35%]">Task</th>

              <th className="p-3 w-[13%]">Scheduled Time</th>

              <th className="p-3 w-[14%]">Completed Time</th>

            </tr>

          </thead>


          <tbody>

            {tasks.length === 0 && (

              <tr>

                <td colSpan="6" className="p-6 text-center text-slate-500">
                  No completed maintenance jobs yet
                </td>

              </tr>

            )}


            {tasks.map((t, index) => (

              <tr
                key={t._id}
                className="border-b hover:bg-slate-50"
              >

                {/* TASK NUMBER */}

                <td className="p-3 font-semibold">
                  {index + 1}
                </td>

                {/* MACHINE ID */}

                <td className="p-3">
                  {t.machine_id}
                </td>

                {/* MACHINE NAME */}

                <td className="p-3 capitalize">
                  {t.machineName}
                </td>

                {/* TASK */}

                <td className="p-3">
                  {t.task}
                </td>

                {/* SCHEDULED */}

                <td className="p-3">
                  {new Date(t.scheduledDate).toLocaleString()}
                </td>

                {/* COMPLETED */}

                <td className="p-3 text-emerald-700 font-medium">
                  {t.completedDate
                    ? new Date(t.completedDate).toLocaleString()
                    : "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}