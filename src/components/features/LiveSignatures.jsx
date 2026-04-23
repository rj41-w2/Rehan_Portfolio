import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { PenTool, User, Briefcase, Code, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveSignatures = () => {
  const [signatures, setSignatures] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // --- Tag Styles ---
  const getTagStyle = (tagId) => {
    switch(tagId) {
      case 'hiring': return { icon: <Briefcase size={12} />, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' };
      case 'dev': return { icon: <Code size={12} />, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' };
      case 'fan': return { icon: <Heart size={12} />, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' };
      default: return { icon: <User size={12} />, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
    }
  };

  useEffect(() => {
    // Collection Name: guestbook_signatures
    const q = query(collection(db, "guestbook_signatures"), orderBy("createdAt", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Data fill logic for smooth animation
      if (data.length > 0 && data.length < 5) {
        const fills = [];
        while (data.length + fills.length < 5) {
             data.forEach(item => {
                 if (data.length + fills.length < 5) {
                     fills.push({...item, id: item.id + Math.random()});
                 }
             });
         }
         data = [...data, ...fills];
      }
      setSignatures(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (signatures.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setSignatures((prev) => {
          if(prev.length === 0) return prev;
          const [first, ...rest] = prev;
          return [...rest, first];
        });
        setIsAnimating(false);
      }, 500); 
    }, 2500); 

    return () => clearInterval(interval);
  }, [signatures]);

  if (signatures.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            What People <span className="text-blue-600 dark:text-blue-500">SAY</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            See the latest messages from our community in real-time.
          </p>
        </div>

        {/* --- MAIN CONTAINER --- */}
        {/* FIX: Total Height 400px (200px Header + 200px Comments) */}
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[400px]">
          
          {/* --- LEFT SIDE: CTA --- */}
          {/* FIX: Mobile height fixed to 200px */}
          <div className="md:w-1/3 p-6 flex flex-col justify-center items-start bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 z-10 shrink-0 h-[200px] md:h-auto">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl mb-3 text-blue-600 dark:text-blue-400">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Community <span className="text-blue-600">Wall</span>
            </h3>
            <Link 
              to="/guestbook" 
              className="mt-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
            >
              <PenTool size={16} /> Leave a Comment
            </Link>
          </div>

          {/* --- RIGHT SIDE: STEP SCROLLER --- */}
          {/* FIX: Mobile height fixed to 200px (Exactly fits 2 comments) */}
          <div className="md:w-2/3 relative bg-slate-50/50 dark:bg-black/20 overflow-hidden flex flex-col justify-center h-[200px] md:h-auto">
            
            {/* Gradient Overlay Top */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>

            {/* Scrolling Area */}
            <div className="p-6 h-full overflow-hidden relative z-0 flex items-center">
              
              <div 
                className="space-y-4 w-full"
                style={{
                  transform: isAnimating ? 'translateY(-84px)' : 'translateY(0)',
                  transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none'
                }}
              >
                {signatures.map((msg, index) => {
                  const displayText = msg.message || msg.text; 
                  const displayPhoto = msg.photoURL || msg.photo;
                  const style = getTagStyle(msg.tag);
                  
                  return (
                    <div 
                      key={`${msg.id}-${index}`} 
                      className="h-[68px] bg-white dark:bg-slate-800/80 backdrop-blur-sm px-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex gap-3 items-center"
                    >
                      {displayPhoto ? (
                          <img src={displayPhoto} alt={msg.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex-shrink-0" />
                      ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                              <User size={20}/>
                          </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{msg.name}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold uppercase ${style.color}`}>
                            {style.icon} {msg.tag || 'visitor'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                          "{displayText}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gradient Overlay Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveSignatures;