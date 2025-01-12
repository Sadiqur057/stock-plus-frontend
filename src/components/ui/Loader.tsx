import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-0.5 py-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 bg-blue-800 rounded-full animate-bounce ${
            i === 0 ? "" : `animation-delay-${i * 100}`
          }`}
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Loader;
