import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const LikeButton = ({ projectId }) => {
  const [likes, setLikes] = useState([]); // List of User IDs
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  // 1. Check User Auth Status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Listeners for Likes (Firestore)
  useEffect(() => {
    // "projectLikes" collection mein har project ki ID se document banega
    const likesRef = doc(db, "projectLikes", String(projectId));

    const unsubscribe = onSnapshot(likesRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.userIds || []);
      } else {
        setLikes([]);
      }
    });

    return () => unsubscribe();
  }, [projectId]);

  // 3. Check if current user has already liked
  useEffect(() => {
    if (user) {
      setIsLiked(likes.includes(user.uid));
    } else {
      setIsLiked(false);
    }
  }, [user, likes]);

  // 4. Handle Click
  const handleLike = async () => {
    // Agar user login nahi hai, to pehle login karwao
    if (!user) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Login failed", error);
      }
      return;
    }

    // Animation trigger
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    const likesRef = doc(db, "projectLikes", String(projectId));

    try {
      if (isLiked) {
        // UNLIKE: ID remove karo
        await updateDoc(likesRef, {
          userIds: arrayRemove(user.uid)
        });
      } else {
        // LIKE: ID add karo (setDoc with merge isliye taake agar doc na ho to ban jaye)
        await setDoc(likesRef, {
          userIds: arrayUnion(user.uid)
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating like", error);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all border
        ${isLiked 
          ? "bg-red-500/10 border-red-500/50 text-red-500" 
          : "bg-slate-100 border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-red-400"
        }
      `}
    >
      <Heart 
        size={20} 
        className={`transition-all duration-300 ${isLiked ? "fill-current" : ""} ${animate ? "scale-125" : "scale-100"}`}
      />
      <span className="font-semibold text-sm">
        {likes.length > 0 ? likes.length : "Like"}
      </span>
    </button>
  );
};

export default LikeButton;