import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Linkedin } from 'lucide-react';

const ChatMessage = ({ text }) => {

  // Simple regex to check for Urdu characters (Arabic script)
  const isUrdu = (str) => /[\u0600-\u06FF]/.test(str);

  const direction = isUrdu(text) ? 'rtl' : 'ltr';

  const linkedinRegex = /https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/g;

  return (
    <div dir={direction} className={`${direction === 'rtl' ? 'font-urdu' : ''} space-y-3`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => {
            const isLinkedIn = linkedinRegex.test(props.href);
            if (isLinkedIn) {
              return (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 my-2 bg-[#0077b5] text-white rounded-xl text-sm font-semibold hover:bg-[#006097] transition-all no-underline shadow-sm hover:scale-105 active:scale-95"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn Profile</span>
                </a>
              );
            }
            return <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />;
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
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
