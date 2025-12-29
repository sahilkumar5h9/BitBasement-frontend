import { useState } from "react";
import { login } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (res.user_id) {
      onLogin(res.user_id);
      navigate("/dashboard");
    } else alert("Login failed");
  };

  return (
    <div className="min-h-screen w-full bg-[#011C40]">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="p-10 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full max-w-md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: "#26658C" }}
          >
            Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-[12px] transition"
              style={{ border: "1px solid #26658C", outlineColor: "#54ACBF" }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-[12px] transition"
              style={{ border: "1px solid #26658C", outlineColor: "#54ACBF" }}
              required
            />
            <button
              type="submit"
              className="py-3 rounded-[12px] text-white hover:text-black transition bg-[#01953fff] hover:bg-[#72d79cff]"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm" style={{ color: "#4B5563" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#54ACBF", fontWeight: "600" }}>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
