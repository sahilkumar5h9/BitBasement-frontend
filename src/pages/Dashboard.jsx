import { useState, useEffect } from "react";
import { addPassword, listPasswords } from "../api/api";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user_id, onLogout }) => {
  const [website, setWebsite] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const navigate = useNavigate();

  const fetchPasswords = async () => {
    const res = await listPasswords(user_id);
    setPasswordList(res);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleAddPassword = async (e) => {
    e.preventDefault();
    let strengthLabel = "Weak";
    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      strengthLabel = "Strong";
    else if (password.length >= 6) strengthLabel = "Medium";

    await addPassword({
      user_id,
      website,
      login_username: loginUsername,
      password,
      strength: strengthLabel,
    });

    setWebsite("");
    setLoginUsername("");
    setPassword("");
    fetchPasswords();
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#011C40]">
      <div className="max-w-6xl mx-auto mt-8 p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1
            className="text-4xl font-bold mb-4 md:mb-0"
            style={{ color: "#26658C" }}
          >
            BitBasement
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg transition"
            style={{ backgroundColor: "#F56565", color: "#FFFFFF" }}
          >
            Logout
          </button>
        </div>

        {/* Add Password Form */}
        <form
          onSubmit={handleAddPassword}
          className="flex flex-col md:flex-row gap-4 mb-8 p-6 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          style={{ backgroundColor: "#A7EBF2" }}
        >
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="p-3 rounded-[12px] flex-1 transition"
            style={{ borderColor: "#26658C", outlineColor: "#54ACBF" }}
            required
          />
          <input
            type="text"
            placeholder="Login Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="p-3 rounded-[12px] flex-1 transition"
            style={{ borderColor: "#26658C", outlineColor: "#54ACBF" }}
          />
          <div className="flex-1">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-[12px] transition"
            style={{ backgroundColor: "#48BB78", color: "#FFFFFF" }}
          >
            Add
          </button>
        </form>

        {/* Password Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passwordList.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col justify-between gap-4 hover:shadow-lg transition"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div>
                <p className="font-bold text-xl" style={{ color: "#26658C" }}>
                  {p.website}
                </p>
                <p className="text-sm" style={{ color: "#4B5563" }}>
                  {p.login_username}
                </p>
                <p className="mt-2 text-sm">
                  Strength:{" "}
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        p.strength === "Weak"
                          ? "#F56565"
                          : p.strength === "Medium"
                          ? "#ECC94B"
                          : "#48BB78",
                    }}
                  >
                    {p.strength}
                  </span>
                </p>
              </div>
              <button
                className="mt-3 py-2 rounded-[12px] transition"
                style={{ backgroundColor: "#54ACBF", color: "#FFFFFF" }}
                onClick={() =>
                  navigator.clipboard.writeText(p.password_decrypted)
                }
              >
                Copy Password
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
