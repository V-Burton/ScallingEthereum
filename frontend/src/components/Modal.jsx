function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-500 opacity-75"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded z-20">
        {children}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
