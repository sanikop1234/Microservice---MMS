import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-6 px-4 py-2 border-b">
      
      {/* App Branding */}
      <NavLink to="/" className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-800">
          Maintenance Scheduler
        </span>
        <span className="text-sm text-gray-500">
          (Microservice Platform)
        </span>
      </NavLink>

      {/* Primary Action */}
      <NavLink
        to="/maintenance/create"
        className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium transition-colors
                   border border-gray-300 bg-white hover:bg-slate-100 h-9 rounded-md px-4"
      >
        Create Maintenance Job
      </NavLink>

    </nav>
  );
}
