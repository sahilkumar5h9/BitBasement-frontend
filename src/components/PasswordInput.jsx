import { useState } from "react";
import StrengthMeter from "./StrengthMeter";

const PasswordInput = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="password"
        value={value}
        onChange={onChange}
        className="border p-2 w-full rounded"
        placeholder="Enter password"
        required
      />
      <StrengthMeter password={value} />
    </div>
  );
};

export default PasswordInput;
