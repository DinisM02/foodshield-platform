import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { trpc } from '../lib/trpc';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const syncMutation = trpc.auth.syncFirebaseUser.useMutation();

  // Sync user to MySQL whenever Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      
      // Sync to MySQL if user is logged in
      if (firebaseUser) {
        try {
          await syncMutation.mutateAsync({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
        } catch (err) {
          console.error('Failed to sync user to MySQL:', err);
        }
      }
    }, (err) => {
      console.error('Auth state change error:', err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Sync happens automatically via onAuthStateChanged
      return result.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Sync happens automatically via onAuthStateChanged
      return result.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      // Sync happens automatically via onAuthStateChanged
      return result.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
  };
}
