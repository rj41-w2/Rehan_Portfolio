import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, PenTool, Trash2, Sparkles, Briefcase, Code, Heart, User, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Guestbook = ({ theme, toggleTheme, showUI, setShowUI }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("visitor");
  const [loading, setLoading] = useState(false);

  // 2. Navigate hook initialize karein
  const navigate = useNavigate();

  // --- TAGS CONFIGURATION ---
  const tags = [
    { id: 'visitor', label: 'Just Visiting', icon: <User size={14} />, color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
    { id: 'hiring', label: 'Hiring', icon: <Briefcase size={14} />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 'dev', label: 'Developer', icon: <Code size={14} />, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { id: 'fan', label: 'Supporter', icon: <Heart size={14} />, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  ];

  // --- AI SUGGESTIONS ---
  const aiSuggestions = [
    "Just explored your portfolio, amazing work! 🚀",
    "Love the design and attention to detail. Keep it up! ✨",
    "Hi from the other side of the world! 🌍",
    "Impressive tech stack. Let's connect on LinkedIn.",
    "Found this via your resume. Great projects!",
    "The UI/UX is buttery smooth. Good job!",
    "Dropping by to say hello! 👋",
    "Inspiring work, really like the creativity here.",
    "Clean code and great visuals. 10/10!",
    "Wishing you the best for your future endeavors! 🌟"
  ];

  // Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Fetch Signatures
  useEffect(() => {
    const q = query(collection(db, "guestbook_signatures"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Login Handle
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // AI Generator
  const generateAIComment = () => {
    const randomMsg = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setNewMessage(randomMsg);
  };

  // Handle Sign
  const handleSign = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!user) { handleLogin(); return; }

    setLoading(true);
    try {
      await addDoc(collection(db, "guestbook_signatures"), {
        text: newMessage,
        tag: selectedTag,
        name: user.displayName,
        photo: user.photoURL,
        uid: user.uid,
        createdAt: serverTimestamp(),
        isDeleted: false
      });
      setNewMessage("");
      setSelectedTag("visitor");
    } catch (error) {
      console.error("Error signing", error);
    }
    setLoading(false);
  };

  // Delete Handle
  const handleDelete = async (id) => {
    if (window.confirm("Delete your signature?")) {
      const docRef = doc(db, "guestbook_signatures", id);
      await updateDoc(docRef, { isDeleted: true });
    }
  };

  const getTagStyle = (tagId) => tags.find(t => t.id === tagId) || tags[0];

  return (
    <section className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden font-sans">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>

      {/* --- NAVBAR / BACK BUTTON (UPDATED) --- */}
      <div className="max-w-4xl mx-auto mb-10 flex justify-between items-center relative z-10">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        {user && (
          <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <img src={user.photoURL} alt="Me" className="w-5 h-5 rounded-full" />
            <button onClick={() => signOut(auth)} className="text-xs font-bold text-slate-500 hover:text-red-500">
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <PenTool size={32} className="text-slate-900 dark:text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Sign my <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Guestbook</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Leave your mark on the internet. Share a thought, a vibe, or just say you were here.
          </p>
        </div>

        {/* Signing Form */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-6 md:p-8 mb-16 relative overflow-hidden group">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {user ? (
            <form onSubmit={handleSign} className="space-y-6">

              <div className="flex items-center gap-4 mb-2">
                <img src={user.photoURL} className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700" alt="Avatar" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Signing as</p>
                  <p className="font-bold text-slate-900 dark:text-white">{user.displayName}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">Choose your Badge</label>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setSelectedTag(tag.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border
                        ${selectedTag === tag.id
                          ? 'border-blue-500 ring-1 ring-blue-500 ' + tag.color
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                      {tag.icon} {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write something memorable..."
                  rows="3"
                  className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-xl p-4 pr-32 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                />

                <button
                  type="button"
                  onClick={generateAIComment}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  title="Generate random message"
                >
                  <Wand2 size={12} /> AI Suggest
                </button>

                <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-mono">
                  {newMessage.length} chars
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !newMessage.trim()}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Sparkles className="animate-spin" /> : <PenTool size={20} />}
                Sign the Guestbook
              </button>

            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Join the Wall of Fame</h3>
              <p className="text-slate-500 mb-6">Login to leave your message </p>
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-3"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                Continue with Google
              </button>
            </div>
          )}
        </div>

        {/* Signatures List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4 px-2">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Recent Signatures</span>
          </div>

          {messages.filter(m => !m.isDeleted).map((msg) => {
            const tagStyle = getTagStyle(msg.tag);
            return (
              <div key={msg.id} className="group relative bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

                <div className="flex items-start gap-4">
                  <img src={msg.photo} alt={msg.name} className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-600" />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{msg.name}</h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${tagStyle.color}`}>
                        {tagStyle.icon} {tagStyle.label}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 font-mono">
                      {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Just now"}
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      "{msg.text}"
                    </p>
                  </div>

                  {user && user.uid === msg.uid && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                      title="Delete Signature"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {messages.filter(m => !m.isDeleted).length === 0 && (
            <div className="text-center py-20 opacity-50">
              <p>No signatures yet. Be the first!</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Guestbook;