const StrengthMeter = ({ password }) => {
  const getStrength = () => {
    if (!password) return { label: "", color: "bg-gray-300" };
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: "Weak", color: "bg-red-500" };
    if (score === 2 || score === 3)
      return { label: "Medium", color: "bg-yellow-400" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const strength = getStrength();

  return (
    <div className="mt-2">
      {strength.label && (
        <div className="flex items-center gap-2">
          <div className={`h-2 w-32 ${strength.color} rounded`}></div>
          <span className="text-sm font-semibold">{strength.label}</span>
        </div>
      )}
    </div>
  );
};

export default StrengthMeter;
