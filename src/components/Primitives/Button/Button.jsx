import clsx from "clsx";

const Button = ({ children, size = "md", variant = "filled", loading = false, className, ...props }) => {
  const baseStyles = "relative rounded-lg font-medium focus:outline-none transition-all duration-200 flex items-center justify-center overflow-hidden";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const variantStyles = {
    filled: "bg-blue-600 text-white hover:bg-blue-700",
    outlined: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className, { "opacity-75 pointer-events-none": loading })}
      disabled={loading}
      {...props}
    >
      <span className={clsx("flex items-center", { "opacity-0": loading })}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-white/20 bg-opacity-50">
          <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        </span>
      )}
    </button>
  );
};


export default Button;
