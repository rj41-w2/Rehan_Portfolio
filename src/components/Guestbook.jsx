import React, { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
// CHANGE 1: 'deleteDoc' hata kar 'updateDoc' import kiya
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { LogOut, Send, User, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Guestbook = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Check Login Status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // 2. Fetch Messages Real-time
  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 3. Handle Login
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // 4. Send Message (Create)
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "guestbook"), {
        text: message,
        name: user.displayName,
        photo: user.photoURL,
        uid: user.uid,
        createdAt: serverTimestamp(),
        // CHANGE 2: Naya message banate waqt flag set kiya
        isDeleted: false 
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
    setLoading(false);
  };

  // 5. Handle Soft Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        // CHANGE 3: Permanent delete ki bajaye sirf flag update kar rahe hain
        const msgRef = doc(db, "guestbook", id);
        await updateDoc(msgRef, {
          isDeleted: true
        });
      } catch (error) {
        console.error("Error deleting message", error);
      }
    }
  };

  return (
    <section id="guestbook" className="min-h-screen py-12 px-4 relative bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Back to Home Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Guest<span className="text-blue-600 dark:text-blue-500">book</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Drop a message, feedback, or just say hello!
          </p>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-12 shadow-sm dark:shadow-none transition-colors">
          {user ? (
            <form onSubmit={sendMessage} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-600" />
                   <div>
                     <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.displayName}</p>
                     <button type="button" onClick={() => signOut(auth)} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                       <LogOut size={10} /> Sign out
                     </button>
                   </div>
                 </div>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something cool..."
                  className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-500"
                />
                <button 
                  type="submit" 
                  disabled={loading || !message.trim()}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "..." : <Send size={20} />}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">Login with Google to leave a message.</p>
              <button 
                onClick={handleLogin}
                className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white px-6 py-3 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Sign in with Google
              </button>
            </div>
          )}
        </div>

        {/* Messages List */}
        <div className="grid gap-4">
          {messages
            // CHANGE 4: Filter lagaya taake sirf wo dikhein jo delete nahi huye
            .filter(msg => msg.isDeleted !== true)
            .map((msg) => (
            <div key={msg.id} className="relative group bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 p-4 rounded-xl flex gap-4 transition-all hover:border-blue-400 dark:hover:border-blue-500/30">
              
              {msg.photo ? (
                <img src={msg.photo} alt={msg.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <User size={20} className="text-slate-500 dark:text-slate-400" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {msg.name}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-500">
                      {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                    </span>
                  </h4>

                  {/* Delete Button (Only for Author) */}
                  {user && user.uid === msg.uid && (
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
                      title="Delete your message"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <p className="text-slate-700 dark:text-slate-300 mt-1 break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {messages.filter(msg => msg.isDeleted !== true).length === 0 && (
            <div className="text-center text-slate-500 dark:text-slate-400 py-10 italic">
              No messages yet. Be the first one! 🚀
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Guestbook;