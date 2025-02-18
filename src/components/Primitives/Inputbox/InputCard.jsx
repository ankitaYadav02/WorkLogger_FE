const InputBox = ({ label, placeholder, value, onChange, error, type = "text" }) => {
    return (
        <div className="flex flex-col gap-1">
            {/* Label */}
            {label && <label className="text-gray-700 font-medium">{label}</label>}

            {/* Input Field */}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`px-4 py-2 rounded-md border ${
                    error ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            />

            {/* Error Message */}
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default InputBox;
