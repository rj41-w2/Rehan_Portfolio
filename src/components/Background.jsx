import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-[20%] w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default Background;