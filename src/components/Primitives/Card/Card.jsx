import clsx from "clsx";

const Card = ({ children, className }) => {
  return (
    <div className={clsx("bg-white shadow-md rounded-lg p-4", className)}>
      {children}
    </div>
  );
};

export default Card