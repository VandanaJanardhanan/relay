import { isFirebaseConfigured, db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  runTransaction
} from 'firebase/firestore';
import { INITIAL_USERS, INITIAL_CAMPAIGNS, INITIAL_TASKS } from './mockData';

const STORAGE_KEYS = {
  USERS: 'relay_users_data',
  CAMPAIGNS: 'relay_campaigns_data',
  TASKS: 'relay_tasks_data',
  ACTIVE_USER: 'relay_active_session',
};

// Event bus for local reactive updates
const listeners = {
  campaigns: new Set(),
  tasks: new Set(),
  users: new Set(),
};

// BroadcastChannel for cross-tab sync if supported
let broadcastChannel = null;
if (typeof window !== 'undefined' && window.BroadcastChannel) {
  try {
    broadcastChannel = new BroadcastChannel('relay_sync_channel');
    broadcastChannel.onmessage = (event) => {
      const { type, data } = event.data;
      if (listeners[type]) {
        listeners[type].forEach((cb) => cb(data));
      }
    };
  } catch (e) {
    console.log('BroadcastChannel not supported or restricted');
  }
}

const notifyListeners = (type, data) => {
  if (listeners[type]) {
    listeners[type].forEach((cb) => cb(data));
  }
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type, data });
    } catch (e) {}
  }
};

// Initialize localStorage if empty
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  }
};

export const resetLocalDemoData = () => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  notifyListeners('campaigns', INITIAL_CAMPAIGNS);
  notifyListeners('tasks', INITIAL_TASKS);
  notifyListeners('users', INITIAL_USERS);
  return { success: true };
};

// Seed live Firestore with demo data if organizer clicks Seed
export const seedFirestoreDemoData = async () => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured yet. Using local demo mode.');
  }
  for (const user of INITIAL_USERS) {
    await setDoc(doc(db, 'users', user.uid), user, { merge: true });
  }
  for (const campaign of INITIAL_CAMPAIGNS) {
    await setDoc(doc(db, 'campaigns', campaign.id), campaign, { merge: true });
  }
  for (const task of INITIAL_TASKS) {
    await setDoc(doc(db, 'tasks', task.id), task, { merge: true });
  }
  return { success: true };
};

// Get local entities
export const getLocalItems = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const setLocalItems = (key, items, type) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    if (type) {
      notifyListeners(type, items);
    }
  } catch (e) {
    console.error('Error saving local item:', e);
  }
};

export { STORAGE_KEYS, notifyListeners, listeners };

