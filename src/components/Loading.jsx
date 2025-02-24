const Loading = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50 dark:bg-black dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></div>
          <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }}></div>
          <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  