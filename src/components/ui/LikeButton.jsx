import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

const MOCK_LIKES = { 1: 5, 2: 3, 3: 7, 4: 2, 5: 9 };

function generateMockLikes(pid) {
  const count = MOCK_LIKES[pid] || Math.floor(Math.random() * 10) + 2;
  return Array.from({ length: count }, (_, i) => `mock-user-${pid}-${i}`);
}

const LikeButton = ({ projectId }) => {
  const [likes, setLikes] = useState(() => generateMockLikes(projectId));
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const fbRef = useRef(null);
  const unsubAuthRef = useRef(null);
  const unsubLikesRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fb = await import('../../firebase');
        if (cancelled) return;
        if (!fb.db || !fb.auth) return;
        fbRef.current = fb;
        setFirebaseReady(true);

        const { auth, db } = fb;

        const unsubAuth = auth.onAuthStateChanged((u) => {
          if (!cancelled) setUser(u);
        });
        unsubAuthRef.current = unsubAuth;

        const { doc, onSnapshot } = await import('firebase/firestore');

        const likesRef = doc(db, "projectLikes", String(projectId));
        const unsubLikes = onSnapshot(likesRef, (snap) => {
          if (cancelled) return;
          setFirebaseConnected(true);
          if (snap.exists()) {
            setLikes(snap.data().userIds || []);
          } else {
            setLikes([]);
          }
        });
        unsubLikesRef.current = unsubLikes;
      } catch {
        // Firebase failed — keep mock data
      }
    })();
    return () => {
      cancelled = true;
      if (unsubAuthRef.current) unsubAuthRef.current();
      if (unsubLikesRef.current) unsubLikesRef.current();
    };
  }, [projectId]);

  useEffect(() => {
    if (user && firebaseConnected) {
      setIsLiked(likes.includes(user.uid));
    } else {
      setIsLiked(false);
    }
  }, [user, likes, firebaseConnected]);

  const handleLike = async () => {
    if (!firebaseReady || !fbRef.current) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      if (isLiked) {
        setLikes((prev) => prev.slice(0, -1));
      } else {
        setLikes((prev) => [...prev, 'demo-user']);
      }
      return;
    }

    const { auth, db } = fbRef.current;
    const { signInWithPopup } = await import('firebase/auth');
    const { doc, updateDoc, setDoc, arrayUnion, arrayRemove } = await import('firebase/firestore');

    if (!user) {
      try {
        const { googleProvider } = await import('../../firebase');
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Login failed", error);
      }
      return;
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    const likesRef = doc(db, "projectLikes", String(projectId));

    try {
      if (isLiked) {
        await updateDoc(likesRef, { userIds: arrayRemove(user.uid) });
      } else {
        await setDoc(likesRef, { userIds: arrayUnion(user.uid) }, { merge: true });
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
        {likes.length}
      </span>
    </button>
  );
};

export default LikeButton;
