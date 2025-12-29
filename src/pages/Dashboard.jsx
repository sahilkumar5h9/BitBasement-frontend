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
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleAddPassword}
        className="flex flex-col md:flex-row gap-3 mb-6 p-4 border rounded bg-white shadow"
      >
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="Login Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <div className="flex-1">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {passwordList.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded bg-gray-50 shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-lg">{p.website}</p>
              <p className="text-sm">{p.login_username}</p>
              <p className="text-sm">
                Strength:{" "}
                <span
                  className={`font-semibold ${
                    p.strength === "Weak"
                      ? "text-red-500"
                      : p.strength === "Medium"
                      ? "text-yellow-400"
                      : "text-green-500"
                  }`}
                >
                  {p.strength}
                </span>
              </p>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
  );
};

export default Dashboard;
