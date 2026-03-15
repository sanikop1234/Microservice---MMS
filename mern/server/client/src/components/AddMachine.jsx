import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, User, Activity, CalendarPlus, ArrowLeft, Hash, MapPin } from "lucide-react";

/* ===============================
   INDUSTRY MACHINE CATALOG
================================ */
const INDUSTRY_MACHINES = [
  "Press 101",
  "Press 102",
  "Conveyor Line 3",
  "Pump X7",
  "Generator G1",
];

/* ===============================
   PLANT LOCATIONS
================================ */
const LOCATIONS = [
  "Plant 1 - Section A",
  "Plant 1 - Section A",
  "Plant 2 - Packaging Area",
  "Plant 1 - Basement",
  "Plant 2 - Power Room",
];

export default function AddMachine() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [form, setForm] = useState({
    machine_id: "",
    name: "",
    location: "",
    engineer: "",
    healthStatus: "Healthy",
    maintenanceStatus: "Scheduled",
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5050/api/machines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          ...form,
          machine_id: Number(form.machine_id),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      navigate("/records");
    } catch (err) {
      setError(err.message || "Failed to save machine");
    } finally {
      setLoading(false);
    }
  }

  /* MACHINE AUTOCOMPLETE */
  const suggestions = INDUSTRY_MACHINES
    .filter((m) =>
      m.toLowerCase().includes(form.name.toLowerCase())
    )
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border p-8">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Add New Machine
            </h1>

            <p className="text-slate-500 mt-1">
              Register an industry machine
            </p>
          </div>

          <button
            onClick={() => navigate("/records")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* MACHINE ID */}
          <Field
            icon={<Hash />}
            label="Machine ID"
            placeholder="Enter Machine ID"
            value={form.machine_id}
            onChange={(e) =>
              updateForm({ machine_id: e.target.value })
            }
            required
          />

          {/* MACHINE NAME */}
          <div ref={dropdownRef} className="relative">
            <Field
              icon={<Cpu />}
              label="Machine Name"
              placeholder="Start typing machine..."
              value={form.name}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) =>
                updateForm({ name: e.target.value })
              }
              required
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-md border bg-white shadow max-h-56 overflow-y-auto">
                {suggestions.map((name) => (
                  <div
                    key={name}
                    onClick={() => {
                      updateForm({ name });
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-slate-100"
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LOCATION */}
          <SelectField
            icon={<MapPin />}
            label="Machine Location"
            value={form.location}
            onChange={(e) =>
              updateForm({ location: e.target.value })
            }
            options={LOCATIONS}
          />

          {/* ENGINEER */}
          <Field
            icon={<User />}
            label="Assigned Engineer"
            placeholder="e.g. Ravi"
            value={form.engineer}
            onChange={(e) =>
              updateForm({ engineer: e.target.value })
            }
          />

          {/* HEALTH STATUS */}
          <SelectField
            icon={<Activity />}
            label="Health Status"
            value={form.healthStatus}
            onChange={(e) =>
              updateForm({ healthStatus: e.target.value })
            }
            options={["Healthy", "Caution"]}
          />

          {/* MAINTENANCE STATUS */}
          <SelectField
            icon={<CalendarPlus />}
            label="Maintenance Status"
            value={form.maintenanceStatus}
            onChange={(e) =>
              updateForm({ maintenanceStatus: e.target.value })
            }
            options={["Scheduled", "In Progress", "Completed"]}
          />

          {/* ACTION BUTTONS */}
          <div className="pt-6 flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/records")}
              className="rounded-md border px-5 py-2 text-sm font-medium"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Machine"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

/* ================= SMALL REUSABLE UI ================= */

function Field({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400">
          {icon}
        </span>

        <input
          {...props}
          className="w-full rounded-md border pl-10 pr-3 py-2 focus:ring-2 focus:ring-slate-900"
        />
      </div>
    </div>
  );
}

function SelectField({ icon, label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-2.5 text-slate-400">
          {icon}
        </span>

        <select
          {...props}
          className="w-full rounded-md border pl-10 pr-3 py-2 focus:ring-2 focus:ring-slate-900"
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}