import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, PenTool, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GuestbookSkeleton } from './Skeletons';
import ErrorBoundary from './ErrorBoundary';

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

  // Login Handler
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
      <section className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden font-sans">

        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>

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

          {/* Sign Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-12 border border-slate-200 dark:border-slate-700">
            {user ? (
              <form onSubmit={handleSign} className="space-y-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write something..."
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          ? 'bg-blue-600 text-white'
                          : tag.color + ' hover:opacity-80'
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
                    className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    ✨ AI Suggest
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !newMessage.trim()}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Posting...' : 'Post Message'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400 mb-4">Sign in to leave a message</p>
                <button
                  onClick={handleLogin}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign in with Google
                </button>
              </div>
            )}
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {loading ? (
              <GuestbookSkeleton />
            ) : messages.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">No messages yet. Be the first!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <img src={msg.photo} alt={msg.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 dark:text-white">{msg.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTagStyle(msg.tag)?.color}`}>
                          {getTagStyle(msg.tag)?.label}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{msg.text}</p>
                      {msg.uid === user?.uid && (
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="mt-3 text-xs text-red-500 hover:text-red-600"
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
