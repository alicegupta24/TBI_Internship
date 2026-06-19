/**
 * Button Component
 * Props:
 * - text
 * - onClick
 * - disabled
 */

function Button({ text, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {text}
    </button>
  );
}

export default Button;