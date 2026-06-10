import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Square, User, Moon, Sun, Eye, Folder, HelpCircle } from 'lucide-react';

const Terminal = ({ scrollToSection, toggleTheme, showUI, setShowUI }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const bootInitialized = useRef(false);

  // Commands configuration
  const COMMANDS = React.useMemo(() => ({
    help: {
      description: 'List all available commands',
      icon: <HelpCircle size={14} />,
      action: () => ({
        type: 'help',
        content: Object.entries(COMMANDS).map(([cmd, config]) => ({
          command: cmd,
          description: config.description,
          icon: config.icon
        }))
      })
    },
    clear: {
      description: 'Clear terminal screen',
      icon: <X size={14} />,
      action: () => {
        // Directly set output to show only the clear confirmation
        setOutput([{ type: 'success', text: '✓ Terminal cleared' }]);
        return null; // Don't add anything else
      }
    },
    cd: {
      description: 'Navigate to section',
      icon: <Folder size={14} />,
      action: (args) => {
        const section = args[0] || 'home';
        const sections = ['home', 'about', 'skills', 'projects', 'contact', 'guestbook', 'package'];
        
        if (sections.includes(section)) {
          scrollToSection(section);
          return { type: 'success', text: `✓ Navigated to ${section}` };
        }
        return { type: 'error', text: `✗ Section not found: ${section}` };
      }
    },
    mode: {
      description: 'Toggle theme (dark/light)',
      icon: <Moon size={14} />,
      action: (args) => {
        const mode = args[0];
        if (['dark', 'light'].includes(mode)) {
          toggleTheme(mode);
          return { type: 'success', text: `✓ Theme set to ${mode}` };
        }
        toggleTheme();
        return { type: 'success', text: '✓ Theme toggled' };
      }
    },
    gui: {
      description: 'Toggle UI visibility',
      icon: <Eye size={14} />,
      action: (args) => {
        if (args[0] === 'off') {
          setShowUI(false);
          return { type: 'success', text: '✓ GUI hidden (type: gui on)' };
        }
        setShowUI(true);
        return { type: 'success', text: '✓ GUI restored' };
      }
    },
    whoami: {
      description: 'Display user info',
      icon: <User size={14} />,
      action: () => ({
        type: 'info',
        text: 'visitor@portfolio-guest\nRole: Explorer\nStatus: Welcome!'
      })
    },
    date: {
      description: 'Show current date/time',
      icon: <Square size={14} />,
      action: () => ({
        type: 'info',
        text: new Date().toString()
      })
    },
    ls: {
      description: 'List sections',
      icon: <Folder size={14} />,
      action: () => ({
        type: 'list',
        items: ['home/', 'about/', 'skills/', 'projects/', 'contact/', 'guestbook/', 'package/']
      })
    }
  }), [toggleTheme, scrollToSection, setShowUI]);

  // Fast boot sequence - only run once
  useEffect(() => {
    if (bootInitialized.current) return;
    bootInitialized.current = true;

    const bootMessages = [
      { text: 'Initializing portfolio...', delay: 100 },
      { text: 'Loading components...', delay: 150 },
      { text: 'Starting React engine...', delay: 100 },
      { text: 'DONE: Ready for interaction!', delay: 50, type: 'success' }
    ];

    let totalDelay = 0;
    bootMessages.forEach((msg, index) => {
      totalDelay += msg.delay;
      setTimeout(() => {
        setOutput(prev => {
          // Prevent duplicates
          if (prev.some(p => p.text === msg.text)) return prev;
          return [...prev, { type: msg.type || 'system', text: msg.text }];
        });
        if (index === bootMessages.length - 1) {
          setBootComplete(true);
          // Add welcome message
          setTimeout(() => {
            setOutput(prev => {
              if (prev.some(p => p.type === 'welcome')) return prev;
              return [...prev, {
                type: 'welcome',
                text: `Welcome! Type 'help' to see commands or press ↑ for history`
              }];
            });
          }, 200);
        }
      }, totalDelay);
    });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle input change with suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const matches = Object.keys(COMMANDS).filter(cmd =>
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Handle key commands
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      const [command, ...args] = trimmedInput.toLowerCase().split(' ');

      // Add to history
      if (trimmedInput) {
        setHistory(prev => [...prev, trimmedInput]);
        setHistoryIndex(-1);
      }

      // Execute command
      if (COMMANDS[command]) {
        const result = COMMANDS[command].action(args);
        // Clear command handles its own output, so skip adding more
        if (command === 'clear') {
          setInput('');
          setSuggestions([]);
          return;
        }
        // For other commands, add user input and result
        const newOutput = [...output, { type: 'user', text: trimmedInput }];
        if (result) {
          newOutput.push(result);
        }
        setOutput(newOutput);
      } else if (trimmedInput) {
        // Command not found
        setOutput(prev => [...prev, 
          { type: 'user', text: trimmedInput },
          { type: 'error', text: `✗ Command not found: ${command}. Type 'help' for available commands.` }
        ]);
      }

      setInput('');
      setSuggestions([]);
    }

    // Arrow up for history
    if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    }

    // Arrow down for history
    if (e.key === 'ArrowDown' && history.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex === history.length - 1 ? -1 : Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    }

    // Tab for auto-complete
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setSuggestions([]);
    }

    // Clear on Ctrl+L
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
    }
  };

  // Quick command buttons
  const quickCommands = [
    { label: 'help', icon: <HelpCircle size={12} />, command: 'help' },
    { label: 'sections', icon: <Folder size={12} />, command: 'ls' },
    { label: 'theme', icon: <Moon size={12} />, command: 'mode toggle' },
    { label: 'about', icon: <User size={12} />, command: 'whoami' },
    { label: 'package', icon: <Folder size={12} />, command: 'cd package' }
  ];

  const handleQuickCommand = (command) => {
    setInput(command);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-xl">
      {/* Terminal Window */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
        
        {/* Terminal Container */}
        <div className="relative bg-slate-900/95 dark:bg-slate-950/95 rounded-xl overflow-hidden border border-slate-700/50 dark:border-slate-800 shadow-2xl">
          {/* Title Bar */}
          <div className="bg-slate-800/80 dark:bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <TerminalIcon size={16} className="text-blue-400" />
              <span className="text-xs text-slate-400 font-mono">rehan@portfolio: ~</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={outputRef}
            className="h-[280px] md:h-[320px] overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Output Lines */}
            {output.map((line, index) => (
              <div key={index} className="mb-2">
                {line.type === 'user' && (
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-blue-400">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span>{line.text}</span>
                  </div>
                )}

                {line.type === 'system' && (
                  <div className="text-slate-400">{line.text}</div>
                )}

                {line.type === 'success' && (
                  <div className="text-green-400">{line.text}</div>
                )}

                {line.type === 'error' && (
                  <div className="text-red-400">{line.text}</div>
                )}

                {line.type === 'info' && (
                  <div className="text-blue-400 whitespace-pre-wrap">{line.text}</div>
                )}

                {line.type === 'welcome' && (
                  <div className="text-purple-400 font-semibold">{line.text}</div>
                )}

                {line.type === 'help' && (
                  <div className="space-y-1 mt-2">
                    {line.content.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-slate-300">
                        <span className="text-blue-400 mt-0.5">{item.icon}</span>
                        <span className="text-green-400 font-semibold min-w-[100px]">{item.command}</span>
                        <span className="text-slate-500">— {item.description}</span>
                      </div>
                    ))}
                  </div>
                )}

                {line.type === 'list' && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {line.items.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {line.type === 'matrix' && (
                  <div className="space-y-1 text-green-400">
                    {line.lines.map((l, i) => (
                      <div key={i} className="text-xs">{l}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 relative">
              <span className="text-blue-400">➜</span>
              <span className="text-cyan-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600"
                placeholder={bootComplete ? "Type a command..." : "Loading..."}
                disabled={!bootComplete}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              
              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-xl mb-2">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      className={`px-3 py-2 text-xs font-mono cursor-pointer hover:bg-slate-700 ${
                        index === 0 ? 'bg-slate-700/50' : ''
                      }`}
                      onClick={() => {
                        setInput(suggestion);
                        setSuggestions([]);
                        inputRef.current?.focus();
                      }}
                    >
                      <span className="text-green-400">{suggestion}</span>
                      <span className="text-slate-500 ml-2">
                        {COMMANDS[suggestion]?.description}
                      </span>
                    </div>
                  ))}
                  <div className="px-3 py-1 text-xs text-slate-500 border-t border-slate-700">
                    Press <kbd className="px-1 py-0.5 bg-slate-700 rounded">Tab</kbd> to autocomplete
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Commands Bar */}
          {bootComplete && (
            <div className="px-4 py-2 bg-slate-800/50 border-t border-slate-700/50 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-slate-500 whitespace-nowrap">Quick:</span>
              {quickCommands.map((cmd) => (
                <button
                  key={cmd.command}
                  onClick={() => handleQuickCommand(cmd.command)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded text-xs whitespace-nowrap transition-colors"
                >
                  {cmd.icon}
                  {cmd.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hints */}
        <div className="mt-3 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 dark:bg-slate-700 rounded text-slate-400">↑</kbd> for history • 
            <kbd className="px-1.5 py-0.5 bg-slate-800 dark:bg-slate-700 rounded text-slate-400 ml-1">Tab</kbd> to autocomplete • 
            <kbd className="px-1.5 py-0.5 bg-slate-800 dark:bg-slate-700 rounded text-slate-400 ml-1">Ctrl+L</kbd> to clear
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
