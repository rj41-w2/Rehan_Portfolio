import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Documents = ({ showUI, setShowUI }) => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto mb-10 flex justify-start items-center relative z-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Documents</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Here you can find important documents and resources.
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <span className="block text-5xl font-black text-blue-600 dark:text-blue-500 animate-pulse text-center my-4">
            PENDING
          </span>

        </p>
      </div>
    </section>
  );
};

export default Documents;
