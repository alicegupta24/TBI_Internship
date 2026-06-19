/**
 * Input Component
 * Props:
 * - label
 * - type
 * - placeholder
 */

function Input({ label, type, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded"
      />
    </div>
  );
}

export default Input;