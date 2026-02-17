import React, { useState, useRef, useEffect } from 'react';

const Terminal = ({ scrollToSection, toggleTheme, showUI, setShowUI }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    {
      type: 'system',
      text: 'Welcome to my interactive terminal! Type ``help`` to see all available commands.',
    },
  ]);
  const inputRef = useRef(null);

  const COMMANDS = React.useMemo(() => ({
    help: {
      description: 'Shows a list of all available commands.',
      action: () => {
        const helpEntries = Object.keys(COMMANDS).map(command => {
          let cmdDisplay = command;
          let description = COMMANDS[command].description;

          // Special handling for commands with arguments to display them nicely in help
          if (command === 'cd') {
            cmdDisplay = 'cd [section]';
            description = `${description}.`;
          } else if (command === 'mode') {
            cmdDisplay = 'mode [dark|light]';
          } else if (command === 'gui') {
            cmdDisplay = 'gui [on|off]';
          }

          return { type: 'help_entry', command: cmdDisplay, description: description };
        });
        // Add a header for the help output
        return [{ type: 'system', text: 'Available commands:' }, ...helpEntries];
      },
    },
    clear: {
      description: 'Clears the terminal screen.',
      action: () => {
        setOutput([]);
        return '';
      },
    },
    cd: {
      description: 'Scrolls to a specific section of the page',
      action: (args) => {
        const section = args[0];
        if (!section || ['~', 'home'].includes(section)) {
          scrollToSection('hero');
          return 'scrolled to home';
        }
        const validSections = ['about', 'projects', 'skills', 'contact'];
        if (validSections.includes(section)) {
          scrollToSection(section);
          return `scrolled to ${section}...`;
        }
        return `Error: Directory not found: ${section}`;
      },
    },
    mode: {
      description: 'Controls the website theme',
      action: (args) => {
        const option = args[0];
        if (option === 'dark' || option === 'light') {
          toggleTheme(option);
          return `Theme switched to ${option} mode.`;
        } else if (option === 'toggle') {
          toggleTheme();
          return 'Theme toggled.';
        }
        return "Error: Invalid option. Use 'dark', 'light', or 'toggle'.";
      },
    },
    gui: {
      description: 'Toggles UI visibility',
      action: (args) => {
        const state = args[0];
        if (state === 'off') {
          setShowUI(false);
          return 'GUI hidden. Type `gui on` to bring it back';
        } else if (state === 'on') {
          setShowUI(true);
          return 'GUI restored';
        }
        return "Error: Invalid command. Use 'gui on' or 'gui off'.";
      }

    },
    '': {
      description: '',
      action: () => {
        let bootOutput = [];
        const bootSequence = [
          { text: 'Initializing system...', delay: 500 },
          { text: 'Loading assets...', delay: 500 },
          { text: 'Compiling React components...', delay: 500 },
          { text: 'DONE: Portfolio is live!', delay: 500, type: 'success' },
        ];

        let delay = 0;
        bootSequence.forEach((step, index) => {
          setTimeout(() => {
            bootOutput.push({ type: step.type || 'system', text: step.text });
            setOutput((prevOutput) => [...prevOutput, bootOutput[bootOutput.length - 1]]);
          }, delay);
          delay += step.delay;
        });
        return '';
      },
    },
  }), [toggleTheme, scrollToSection, setShowUI, setOutput]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const [command, ...args] = trimmedInput.split(' ');
      setInput('');

      if (command === 'clear') {
        setOutput([]);
        return;
      }

      let newOutput = [...output, { type: 'user', text: `$ ${trimmedInput}` }];

      const commandAction = COMMANDS[command]?.action;
      if (commandAction) {
        const result = commandAction(args);
        if (result) {
          if (Array.isArray(result)) {
            newOutput.push(...result);
          } else {
            newOutput.push({ type: 'system', text: result });
          }
        }
      } else if (command) {
        newOutput.push({ type: 'system', text: `Command not found: ${command}. Type 'help' for a list of commands.` });
      }

      setOutput(newOutput);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const terminalOutputDiv = document.getElementById('terminal-output');
    if (terminalOutputDiv) {
      terminalOutputDiv.scrollTop = terminalOutputDiv.scrollHeight;
    }
  }, [output]);

  return (
    <div
      className="w-full max-w-xl h-[300px] bg-white/95 dark:bg-slate-900/95 rounded-lg font-mono text-sm text-slate-900 dark:text-white overflow-hidden border border-slate-200 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20"
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <div className="bg-slate-100 dark:bg-slate-800 p-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <p className="text-slate-500 dark:text-slate-400 text-xs ml-auto">rehan@portfolio: ~</p>
      </div>

      <div className="p-4 h-[calc(100%-60px)] overflow-y-auto">
        <div id="terminal-output">
          {output.map((line, index) => (
            <div key={index} className="mb-2">
              {line.type === 'help_entry' ? (
                <pre className="whitespace-pre-wrap">
                  <span className="text-green-600 dark:text-green-400 mr-2">{line.command}:</span>
                  <span className="text-slate-700 dark:text-slate-300">{line.description}</span>
                </pre>
              ) : (
                <pre className={`whitespace-pre-wrap ${line.type === 'user' ? 'text-green-600 dark:text-green-400' : line.type === 'success' ? 'text-green-500' : 'text-slate-700 dark:text-slate-300'}`}>
                  {line.text}
                </pre>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="bg-transparent border-none text-slate-900 dark:text-white w-full focus:outline-none"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;