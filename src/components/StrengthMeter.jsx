const StrengthMeter = ({ password }) => {
  const getStrength = () => {
    if (!password) return { label: "", color: "#D1D5DB" }; // gray-300
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", color: "#F56565" };
    if (score === 2 || score === 3)
      return { label: "Medium", color: "#ECC94B" };
    return { label: "Strong", color: "#48BB78" };
  };

  const strength = getStrength();

  return (
    <div className="mt-2 flex items-center gap-2">
      {strength.label && (
        <>
          <div
            className="h-2 w-32 rounded-lg transition-all duration-300"
            style={{ backgroundColor: strength.color }}
          ></div>
          <span className="text-sm font-semibold text-gray-700">
            {strength.label}
          </span>
        </>
      )}
    </div>
  );
};

export default StrengthMeter;
