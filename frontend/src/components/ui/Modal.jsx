/**
 * Modal Component
 * Props:
 * - title
 * - children
 */

function Modal({ title, children }) {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default Modal;