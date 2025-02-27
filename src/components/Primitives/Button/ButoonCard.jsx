const ButtonCard = ({ title, onClick, type = "button", style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 w-full py-3 text-white font-semibold rounded-lg 
                      bg-[#0066ff]
                      transition-all duration-300 transform hover:scale-105 
                      active:scale-95 shadow-lg cursor-pointer ${style} `}
    >
      {title}
    </button>
  );
};

export default ButtonCard;
