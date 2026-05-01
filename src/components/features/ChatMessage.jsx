import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Linkedin } from 'lucide-react';

const ChatMessage = ({ text, metadata = {} }) => {

  // Simple regex to check for Urdu characters (Arabic script)
  const isUrdu = (str) => /[\u0600-\u06FF]/.test(str);

  const direction = isUrdu(text) ? 'rtl' : 'ltr';

  // Comprehensive regex for LinkedIn URLs
  const linkedinRegex = /https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/g;

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
          // Rich Link Rendering: Detect LinkedIn and show a button
          a: ({ node, ...props }) => {
            const isLinkedIn = linkedinRegex.test(props.href);
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
                  {String(children).replace(/\n$/, '')}
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
