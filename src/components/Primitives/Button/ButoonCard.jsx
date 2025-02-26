const ButtonCard = ({ title, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-6 w-full py-3 text-white font-semibold rounded-lg 
                      bg-gradient-to-r from-blue-500 to-indigo-600 
                      hover:from-indigo-600 hover:to-blue-500 
                      transition-all duration-300 transform hover:scale-105 
                      active:scale-95 shadow-lg cursor-pointer "
    >
      {title}
    </button>
  );
};

export default ButtonCard;
