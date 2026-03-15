import {
  Cpu,
  Clock,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    loadMachines();
  }, []);

  async function loadMachines() {

    try {

      const res = await fetch("http://localhost:5050/api/machines");

      const data = await res.json();

      setMachines(data);

    } catch (err) {

      console.error("Failed to fetch machines", err);

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white p-8">

      {/* HEADER */}

      <div className="mb-12 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Microservice Control Center
          </h1>

          <p className="text-lg text-slate-600 mt-2">
            Machine Maintenance Scheduler · Enterprise Admin Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        <KPI
          title="Machines Online"
          value={machines.length}
          icon={<Cpu />}
          tone="sky"
        />

        <KPI
          title="Scheduled Jobs"
          icon={<Clock />}
          tone="indigo"
          onClick={() => navigate("/upcoming")}
        />

        <KPI
          title="Active Issues"
          icon={<AlertTriangle />}
          tone="amber"
        />

        <KPI
          title="Jobs Completed"
          icon={<CheckCircle />}
          tone="emerald"
          onClick={() => navigate("/completed")}
        />

      </div>

      {/* MACHINE TABLE */}

      <div className="bg-white rounded-2xl border shadow-lg p-8">

        <div className="flex justify-between mb-6">

          <h2 className="text-xl font-semibold">
            Maintenance Command Queue
          </h2>

          <button
            onClick={() => navigate("/machine/new")}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md"
          >
            <PlusCircle size={16} />
            Add Machine
          </button>

        </div>

        {loading && <p>Loading...</p>}

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b text-left text-slate-500">

              <th className="py-3">Machine ID</th>
              <th>Machine</th>
              <th>Location</th>
              <th>Status</th>
              <th>Maintenance</th>
              <th>Engineer</th>

            </tr>

          </thead>

          <tbody>

            {machines.map((m) => (

              <CommandRow
                key={m._id}
                machine_id={m.machine_id}
                machine={m.name}
                location={m.location}
                healthStatus={m.healthStatus}
                maintenanceStatus={m.maintenanceStatus}
                engineer={m.engineer}
                onClick={() => navigate(`/machine/${m.name}`)}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* KPI COMPONENT */

function KPI({ title, value, icon, tone, onClick }) {

  const colors = {
    sky: "bg-sky-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border shadow-lg p-6 flex gap-5 cursor-pointer"
    >

      <div className={`h-14 w-14 flex items-center justify-center text-white rounded-xl ${colors[tone]}`}>
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        {value !== undefined && (
          <p className="text-3xl font-bold">
            {value}
          </p>
        )}

      </div>

    </div>
  );
}

/* MACHINE ROW */

function CommandRow({
  machine_id,
  machine,
  location,
  healthStatus,
  maintenanceStatus,
  engineer,
  onClick,
}) {

  const healthColor =
    healthStatus === "Healthy"
      ? "text-emerald-600"
      : "text-amber-600";

  const maintenanceColor =
    maintenanceStatus === "Completed"
      ? "text-emerald-600"
      : maintenanceStatus === "In Progress"
      ? "text-amber-600"
      : "text-indigo-600";

  return (
    <tr
      onClick={onClick}
      className="border-b cursor-pointer hover:bg-slate-50"
    >

      <td className="py-3">{machine_id}</td>

      <td>{machine}</td>

      <td>{location}</td>

      <td className={healthColor}>{healthStatus}</td>

      <td className={maintenanceColor}>{maintenanceStatus}</td>

      <td>{engineer}</td>

    </tr>
  );
}