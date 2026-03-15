import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");     // 🔴 error state
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setError(""); // clear error on success
        localStorage.setItem("token", data.token);
        navigate("/records");
      })
      .catch(() => {
        setError("Invalid email or password. Please try again.");
      });
  }

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* BRAND */}
      <h1 className="relative z-10 text-5xl font-extrabold tracking-wide text-white mb-8">
        Microservice
      </h1>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white/10 backdrop-blur-lg shadow-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold tracking-wide">
            Login Account
          </h2>
        </div>

        {/* 🔴 ERROR MESSAGE */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-red-400 bg-red-500/10 px-4 py-3 text-sm text-red-200 animate-fade-in">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin ID / Email"
            className="w-full h-11 px-4 rounded-md bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-11 px-4 rounded-md bg-white/20 border border-white/30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <div className="flex justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-sky-500" />
              Remember me
            </label>
            <span className="hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 transition rounded-md font-semibold tracking-wide"
          >
            SUBMIT
          </button>
        </form>
      </div>

      {/* FOOTER */}
      <p className="relative z-10 mt-6 text-sm text-gray-300">
        Machine Maintenance Scheduler
      </p>
    </div>
  );
}
