/**
 * Toast Component
 * Props:
 * - message
 */

function Toast({ message }) {
  return (
    <div className="bg-green-500 text-white p-2 rounded">
      {message}
    </div>
  );
}

export default Toast;