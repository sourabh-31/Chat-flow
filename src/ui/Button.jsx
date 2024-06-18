function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-bold bg-white py-2 px-4 border rounded ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
