import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Linkedin, Github, Mail, Copy, Check } from 'lucide-react';

const EmailBox = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 flex items-center gap-3 p-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 max-w-fit shadow-sm group">
      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
        <Mail size={18} />
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 font-mono">{email}</span>
      <button
        onClick={handleCopy}
        className="ml-2 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors flex items-center justify-center"
        title="Copy email"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="group-hover:text-blue-500 transition-colors" />}
      </button>
    </div>
  );
};

const ChatMessage = ({ text, metadata = {} }) => {

  // Simple regex to check for Urdu characters (Arabic script)
  const isUrdu = (str) => /[\u0600-\u06FF]/.test(str);

  const direction = isUrdu(text) ? 'rtl' : 'ltr';

  // Comprehensive regex for LinkedIn URLs
  const linkedinRegex = /https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/g;
  // Regex for GitHub URLs
  const githubRegex = /https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?/g;
  // Regex for Gmail/Email
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

  return (
    <div
      dir={direction}
      className={`
        ${direction === 'rtl' ? 'font-urdu text-[15px] sm:text-[16px]' : ''}
        w-full break-words whitespace-pre-wrap overflow-hidden
        prose prose-slate dark:prose-invert max-w-none
        prose-p:leading-relaxed prose-p:my-1
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
        prose-code:text-blue-600 dark:prose-code:text-blue-400
        prose-a:no-underline
        relative
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom Text Rendering for Emails
          p: ({ children }) => {
            const processContent = (content) => {
              if (typeof content !== 'string') return content;
              
              const parts = content.split(emailRegex);
              return parts.map((part, index) => {
                if (part.match(emailRegex)) {
                  return <EmailBox key={index} email={part} />;
                }
                return part;
              });
            };

            return (
              <p className="leading-relaxed my-1">
                {React.Children.map(children, child => {
                  if (typeof child === 'string') {
                    return processContent(child);
                  }
                  return child;
                })}
              </p>
            );
          },
          // Rich Link Rendering: Detect LinkedIn and GitHub and show buttons
          a: ({ node, ...props }) => {
            const isLinkedIn = linkedinRegex.test(props.href);
            const isGitHub = githubRegex.test(props.href);

            if (isLinkedIn) {
              return (
                <div className="my-3 flex">
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077b5] text-white rounded-xl text-sm font-bold hover:bg-[#006097] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 border border-[#0077b5]"
                  >
                    <Linkedin size={18} fill="currentColor" strokeWidth={0} />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              );
            }

            if (isGitHub) {
              return (
                <div className="my-3 flex">
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#24292e] dark:bg-[#1f2328] text-white rounded-xl text-sm font-bold hover:bg-[#1b1f23] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 border border-[#24292e] dark:border-slate-700"
                  >
                    <Github size={18} />
                    <span>View on GitHub</span>
                  </a>
                </div>
              );
            }

            return (
              <a 
                {...props} 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4" 
                target="_blank" 
                rel="noopener noreferrer" 
              />
            );
          },
          // Code Block Styling
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="my-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono text-slate-500 uppercase">{match[1]}</span>
                </div>
                <SyntaxHighlighter 
                  style={materialDark} 
                  language={match[1]} 
                  PreTag="div" 
                  customStyle={{ margin: 0, borderRadius: 0, fontSize: '13px' }}
                  {...props}
                >
                  {children ? String(children).replace(/\n$/, '') : ''}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-blue-600 dark:text-blue-400 font-mono text-[13px]" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
