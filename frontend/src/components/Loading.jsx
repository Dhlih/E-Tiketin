const Loading = () => {
  return (
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
    </div>
  );
};

export default Loading;
