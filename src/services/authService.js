import { 
  isFirebaseConfigured, 
  auth, 
  db 
} from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { 
  STORAGE_KEYS, 
  getLocalItems, 
  setLocalItems, 
  initializeLocalStorage 
} from './storageService';
import { INITIAL_USERS } from './mockData';

initializeLocalStorage();

export const authService = {
  // Subscribe to auth state changes
  subscribe(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              callback({ uid: firebaseUser.uid, email: firebaseUser.email, ...data });
              return;
            }
          } catch (err) {
            console.error('Failed to get Firestore user doc:', err);
          }
          callback({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            role: 'volunteer',
          });
        } else {
          callback(null);
        }
      });
    } else {
      // Local demo mode auth listener
      const checkLocalSession = () => {
        const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
        if (raw) {
          try {
            const user = JSON.parse(raw);
            callback(user);
            return;
          } catch (e) {}
        }
        // Default to organizer if not set so app is ready immediately
        const defaultUser = INITIAL_USERS[0];
        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(defaultUser));
        callback(defaultUser);
      };

      checkLocalSession();
      const storageHandler = (e) => {
        if (e.key === STORAGE_KEYS.ACTIVE_USER) {
          try {
            callback(e.newValue ? JSON.parse(e.newValue) : null);
          } catch (err) {}
        }
      };
      window.addEventListener('storage', storageHandler);
      return () => window.removeEventListener('storage', storageHandler);
    }
  },

  // Login
  async login(email, password) {
    if (isFirebaseConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
      if (userDoc.exists()) {
        return { uid: cred.user.uid, ...userDoc.data() };
      }
      return { uid: cred.user.uid, email: cred.user.email };
    } else {
      // Local mock login
      const users = getLocalItems(STORAGE_KEYS.USERS, INITIAL_USERS);
      const matched = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (!matched) {
        throw new Error('No account found with this email address.');
      }
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(matched));
      return matched;
    }
  },

  // Register
  async register({ fullName, email, password, role }) {
    if (!fullName || !email || !password || !role) {
      throw new Error('All fields are required.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    if (isFirebaseConfigured && auth && db) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const userProfile = {
        uid: cred.user.uid,
        fullName,
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', cred.user.uid), userProfile);
      return userProfile;
    } else {
      const users = getLocalItems(STORAGE_KEYS.USERS, INITIAL_USERS);
      const exists = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (exists) {
        throw new Error('An account with this email address already exists.');
      }
      const newUser = {
        uid: `user-${Date.now()}`,
        fullName,
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        institution: 'Yenepoya Institute of Technology',
      };
      users.push(newUser);
      setLocalItems(STORAGE_KEYS.USERS, users, 'users');
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(newUser));
      return newUser;
    }
  },

  // Logout
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
  },

  // Quick switch for demonstration
  quickSwitchUser(role) {
    const users = getLocalItems(STORAGE_KEYS.USERS, INITIAL_USERS);
    let targetUser = null;
    if (role === 'organizer') {
      targetUser = users.find((u) => u.role === 'organizer') || INITIAL_USERS[0];
    } else {
      targetUser = users.find((u) => u.role === 'volunteer') || INITIAL_USERS[1];
    }
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(targetUser));
    return targetUser;
  },

  // Get all registered volunteers
  getVolunteers() {
    const users = getLocalItems(STORAGE_KEYS.USERS, INITIAL_USERS);
    return users.filter((u) => u.role === 'volunteer');
  },
};

