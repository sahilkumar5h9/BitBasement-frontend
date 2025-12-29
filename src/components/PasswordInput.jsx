import StrengthMeter from "./StrengthMeter";

const PasswordInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder="Enter password"
        required
        className="border border-[#26658C] p-3 w-full rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#54ACBF] transition"
      />
      <div className="mt-2">
        <StrengthMeter password={value} />
      </div>
    </div>
  );
};

export default PasswordInput;
