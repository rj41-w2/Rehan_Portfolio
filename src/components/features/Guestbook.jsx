import React, { useState, useEffect } from 'react';
import { auth, googleProvider, githubProvider, db } from '../../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, PenTool, User, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GuestbookSkeleton } from '../ui/Skeletons';
import ErrorBoundary from '../ui/ErrorBoundary';

const Guestbook = ({ theme, toggleTheme, showUI, setShowUI }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("visitor");
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(false);

  const navigate = useNavigate();

  // Tags configuration
  const tags = [
    { id: 'visitor', label: 'Just Visiting', icon: <User size={14} />, color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
    { id: 'hiring', label: 'Hiring', icon: <PenTool size={14} />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 'dev', label: 'Developer', icon: <PenTool size={14} />, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { id: 'fan', label: 'Supporter', icon: <PenTool size={14} />, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  ];

  // AI suggestions
  const aiSuggestions = [
    "Just explored your portfolio, amazing work! 🚀",
    "Love the design and attention to detail. Keep it up! ✨",
    "Hi from the other side of the world! 🌍",
    "Impressive tech stack. Let's connect on LinkedIn.",
    "Found this via your resume. Great projects!",
    "The UI/UX is buttery smooth. Good job!",
    "Dropping by to say hello! 👋",
  ];

  // Check if Firebase is initialized
  useEffect(() => {
    if (!db || !auth) {
      setFirebaseError(true);
      setLoading(false);
    }
  }, []);

  // Auth Listener
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Fetch Signatures
  useEffect(() => {
    if (!db || firebaseError) return;
    
    const q = query(collection(db, "guestbook_signatures"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching guestbook:", error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [firebaseError]);

  // Login Handlers
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error("GitHub login failed", error);
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
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "guestbook_signatures"), {
        text: newMessage,
        tag: selectedTag,
        name: user.displayName || user.email?.split('@')[0] || "Anonymous",
        photo: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email || 'User'}&background=random`,
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

  // Delete Handler
  const handleDelete = async (id) => {
    if (window.confirm("Delete your signature?")) {
      const docRef = doc(db, "guestbook_signatures", id);
      await updateDoc(docRef, { isDeleted: true });
    }
  };

  const getTagStyle = (tagId) => tags.find(t => t.id === tagId) || tags[0];

  // Show error if Firebase not configured
  if (firebaseError) {
    return (
      <div className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="max-w-md text-center">
          <PenTool size={48} className="mx-auto mb-4 text-slate-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Guestbook Unavailable</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Firebase is not configured. Please add your Firebase credentials to the `.env` file.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackMessage="Failed to load guestbook.">
      <section className="min-h-screen py-24 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden font-sans">

        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-10 flex justify-between items-center relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>

          {user && (
            <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email || 'User'}&background=random`} 
                alt="Me" 
                className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm" 
              />
              <button onClick={() => signOut(auth)} className="text-xs font-bold text-slate-500 hover:text-red-500">
                Sign Out
              </button>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <PenTool size={32} className="text-slate-900 dark:text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Sign my <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">Guestbook</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Leave your mark on the internet. Share a thought, a vibe, or just say you were here.
            </p>
          </div>

          {/* Sign Form / Auth Options */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-12 border border-slate-200 dark:border-slate-700">
            {user ? (
              <form onSubmit={handleSign} className="space-y-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write something..."
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows="4"
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setSelectedTag(tag.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTag === tag.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : tag.color + ' hover:opacity-80 border border-transparent'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={generateAIComment}
                    className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2"
                  >
                    ✨ AI Suggest
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !newMessage.trim()}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    {loading ? 'Posting...' : 'Post Message'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">Sign in to leave a message</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Google Login */}
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-95"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Sign in with Google
                  </button>

                  {/* GitHub Login */}
                  <button
                    onClick={handleGitHubLogin}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#24292e] text-white font-bold hover:bg-[#1b1f23] transition-all shadow-sm hover:shadow-md active:scale-95"
                  >
                    <Github size={20} />
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {loading && messages.length === 0 ? (
              <GuestbookSkeleton />
            ) : messages.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <PenTool size={40} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                <p className="text-slate-500 dark:text-slate-400">No messages yet. Be the first to leave a mark!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg ${msg.isDeleted ? 'opacity-50 grayscale' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={msg.photo || `https://ui-avatars.com/api/?name=${msg.name}&background=random`} 
                      alt={msg.name} 
                      className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700 shadow-sm object-cover" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{msg.name}</h3>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                            {msg.createdAt?.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTagStyle(msg.tag)?.color}`}>
                          {getTagStyle(msg.tag)?.label}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {msg.isDeleted ? "This message was removed by the author." : msg.text}
                      </p>
                      {msg.uid === user?.uid && !msg.isDeleted && (
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="mt-3 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Guestbook;
