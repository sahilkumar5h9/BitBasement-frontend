import { useState } from "react";
import { signup } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup({ email, password });
    if (res.msg === "user created") {
      alert("Signup successful! Please login.");
      navigate("/login");
    } else alert("Signup failed");
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
            Signup
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
              className="py-3 rounded-[12px] transition"
              style={{ backgroundColor: "#54ACBF", color: "#FFFFFF" }}
            >
              Signup
            </button>
          </form>
          <p className="mt-4 text-center text-sm" style={{ color: "#4B5563" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#26658C", fontWeight: "600" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
