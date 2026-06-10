import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package as PackageIcon, Download, Terminal, Chrome, Zap, Github, Copy, Check } from 'lucide-react';

const PACKAGE_DATA = {
  name: 'idm-cli',
  version: '0.1.3',
  description: 'The Ultimate High-Speed CLI Downloader with multi-threading, dynamic segmentation, and a Chrome extension integration.',
  author: 'Rehan Jamil',
  repo: 'https://github.com/rj41-w2/idm-cli',
  license: 'MIT',
  install: 'bun install -g idm-cli',
  keywords: ['download-manager', 'cli', 'youtube-downloader', 'parallel-downloads', 'typescript']
};

const Package = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(null);

  const copyCommand = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="min-h-screen py-24 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden font-sans">

      <div className="max-w-4xl mx-auto mb-10 flex justify-start items-center relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">

        {/* Header Card */}
        <div className="rounded-3xl p-8 transition-all duration-300 border
          bg-white border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-500/10">
                <PackageIcon size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {PACKAGE_DATA.name}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold
                    bg-blue-100 text-blue-700
                    dark:bg-blue-500/10 dark:text-blue-400">
                    v{PACKAGE_DATA.version}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold
                    bg-slate-100 text-slate-600
                    dark:bg-slate-800 dark:text-slate-400">
                    {PACKAGE_DATA.license}
                  </span>
                </div>
              </div>
            </div>
            <a
              href={PACKAGE_DATA.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all text-sm border
                bg-slate-900 text-white border-slate-900 hover:bg-slate-800
                dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
            >
              <Github size={18} /> View on GitHub
            </a>
          </div>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {PACKAGE_DATA.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {PACKAGE_DATA.keywords.map((kw) => (
              <span key={kw} className="px-3 py-1 rounded-full text-xs font-medium
                bg-slate-100 text-slate-600
                dark:bg-slate-800 dark:text-slate-400">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Installation */}
        <div className="rounded-3xl p-8 transition-all duration-300 border
          bg-white border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Download size={24} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Installation</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Install <strong className="text-slate-900 dark:text-white">idm-cli</strong> globally using Bun:
          </p>
          <div className="rounded-xl overflow-hidden border
            bg-slate-950 border-slate-800">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-mono">bash</span>
              <button
                onClick={() => copyCommand(PACKAGE_DATA.install, 'install')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied === 'install' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied === 'install' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="px-4 py-3 text-sm font-mono text-green-400 overflow-x-auto">$ {PACKAGE_DATA.install}</pre>
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
            Make sure you have <a href="https://bun.sh" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Bun</a> installed first.
          </p>
        </div>

        {/* Install Bun */}
        <div className="rounded-3xl p-8 transition-all duration-300 border
          bg-white border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={24} className="text-purple-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Install Bun (if not installed)</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            If you don't have Bun installed, run this command in <strong className="text-slate-900 dark:text-white">PowerShell</strong>:
          </p>
          <div className="rounded-xl overflow-hidden border bg-slate-950 border-slate-800">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-mono">powershell</span>
              <button
                onClick={() => copyCommand('powershell -c "irm bun.sh/install.ps1 | iex"', 'bun-install')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied === 'bun-install' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied === 'bun-install' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="px-4 py-3 text-sm font-mono text-green-400 overflow-x-auto">powershell -c "irm bun.sh/install.ps1 | iex"</pre>
          </div>
        </div>

        {/* Quick Start */}
        <div className="rounded-3xl p-8 transition-all duration-300 border
          bg-white border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} className="text-yellow-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Start</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            After installation, just type <code className="px-1.5 py-0.5 rounded text-sm font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">idm</code> to open the interactive download shell:
          </p>
          <div className="rounded-xl overflow-hidden border bg-slate-950 border-slate-800">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-mono">bash</span>
              <button
                onClick={() => copyCommand('idm', 'quick-start')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied === 'quick-start' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied === 'quick-start' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="px-4 py-3 text-sm font-mono text-green-400 overflow-x-auto">$ idm</pre>
          </div>
        </div>

        {/* Chrome Extension */}
        <div className="rounded-3xl p-8 transition-all duration-300 border
          bg-white border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Chrome size={24} className="text-green-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Chrome Extension</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Ship with a Manifest V3 Chrome extension that pushes links from your browser into the IDM-CLI REPL.
          </p>
          <div className="rounded-xl p-5 border
            bg-slate-50 border-slate-200
            dark:bg-slate-800/50 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">How to install</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Open <code className="px-1.5 py-0.5 rounded font-mono bg-slate-200 dark:bg-slate-700">chrome://extensions</code></li>
              <li>Toggle <strong>Developer mode</strong></li>
              <li>Click <strong>Load unpacked</strong> and select the <code className="px-1.5 py-0.5 rounded font-mono bg-slate-200 dark:bg-slate-700">extension/</code> folder</li>
              <li>Make sure <code className="px-1.5 py-0.5 rounded font-mono bg-slate-200 dark:bg-slate-700">idm</code> REPL is running in terminal</li>
            </ol>
          </div>
        </div>

        {/* Features */}
        <div className="rounded-3xl p-8 transition-all duration-300 border
          bg-white border-slate-200 shadow-xl
          dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { emoji: '🚀', title: 'Concurrent Downloads', desc: 'Split files into up to 32 parallel streams for maximum speed.' },
              { emoji: '💬', title: 'Interactive Shell', desc: 'Persistent REPL with visual UI for easy link management.' },
              { emoji: '🎭', title: 'Auto Quality Selection', desc: 'Choose from 144p to 4K with automatic audio-video merging.' },
              { emoji: '🔌', title: 'Zero Setup', desc: 'Auto-downloads ffmpeg & yt-dlp binaries. No manual config needed.' },
              { emoji: '⏯️', title: 'Pause & Resume', desc: 'Robust state tracking with .dl.json for reliable resume.' },
              { emoji: '🎨', title: 'Beautiful Terminal UI', desc: 'Multi-progress bars with speed, ETA, and percentage display.' },
              { emoji: '🌐', title: 'Browser Extension', desc: 'Right-click download, video detection, and auto-interception.' },
              { emoji: '🔒', title: 'Atomic State Management', desc: 'Crash-safe state writes to prevent corruption.' },
            ].map((f) => (
              <div key={f.title} className="flex gap-3 p-4 rounded-xl transition-colors text-left
                bg-slate-50 border border-slate-200
                dark:bg-slate-800/50 dark:border-slate-700">
                <span className="text-xl flex-shrink-0">{f.emoji}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Package;
