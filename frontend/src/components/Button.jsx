const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn my-4 bg-linear-150 from-purple-800 to-indigo-500 text-white shadow-none font-bold border-none hover:to-indigo-700 disabled:from-stone-800 disabled:to-stone-600 ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;

export const ButtonSuccess = ({ children, className, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn my-4 bg-linear-150 from-green-500 to-lime-600 text-white shadow-none font-bold border-none  disabled:from-slate-950 disabled:to-neutral-600 hover:to-green-700 ${className}`}
    >
      {children}
    </button>
  );
};
