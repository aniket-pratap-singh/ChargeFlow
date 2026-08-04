function Button({
  children,
  variant = "primary",
  onClick,
}) {
  const baseStyles =
    "rounded-lg px-6 py-3 font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-green-500 text-white hover:bg-green-600",

    secondary:
      "border border-slate-500 text-white hover:border-green-500 hover:text-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;