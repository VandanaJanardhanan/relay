import { isFirebaseConfigured, db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  orderBy 
} from 'firebase/firestore';
import { 
  STORAGE_KEYS, 
  getLocalItems, 
  setLocalItems, 
  listeners 
} from './storageService';
import { INITIAL_CAMPAIGNS } from './mockData';

export const campaignService = {
  // Subscribe to real-time campaign updates
  subscribe(callback) {
    if (isFirebaseConfigured && db) {
      const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const campaigns = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        callback(campaigns);
      }, (err) => {
        console.error('Firestore campaigns listener error:', err);
      });
    } else {
      // Local reactive listener
      const sendCurrent = () => {
        const campaigns = getLocalItems(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
        callback(campaigns);
      };
      listeners.campaigns.add(callback);
      sendCurrent();
      return () => {
        listeners.campaigns.delete(callback);
      };
    }
  },

  // Create campaign
  async createCampaign(data, organizer) {
    const campaignId = `campaign-${Date.now()}`;
    const newCampaign = {
      id: campaignId,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category || 'Environment',
      location: data.location.trim(),
      startDate: data.startDate,
      endDate: data.endDate,
      organizerId: organizer.uid,
      organizerName: organizer.fullName || 'Organizer',
      status: data.status || 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      await setDoc(doc(db, 'campaigns', campaignId), newCampaign);
    } else {
      const campaigns = getLocalItems(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
      campaigns.unshift(newCampaign);
      setLocalItems(STORAGE_KEYS.CAMPAIGNS, campaigns, 'campaigns');
    }

    return newCampaign;
  },

  // Update campaign
  async updateCampaign(campaignId, updates) {
    const patch = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, 'campaigns', campaignId), patch);
    } else {
      const campaigns = getLocalItems(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
      const index = campaigns.findIndex((c) => c.id === campaignId);
      if (index !== -1) {
        campaigns[index] = { ...campaigns[index], ...patch };
        setLocalItems(STORAGE_KEYS.CAMPAIGNS, campaigns, 'campaigns');
      }
    }
    return patch;
  },

  // Delete campaign and its associated tasks safely
  async deleteCampaign(campaignId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'campaigns', campaignId));
    } else {
      const campaigns = getLocalItems(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
      const filtered = campaigns.filter((c) => c.id !== campaignId);
      setLocalItems(STORAGE_KEYS.CAMPAIGNS, filtered, 'campaigns');

      // Also clean up associated tasks
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, []);
      const remainingTasks = tasks.filter((t) => t.campaignId !== campaignId);
      setLocalItems(STORAGE_KEYS.TASKS, remainingTasks, 'tasks');
    }
    return { success: true };
  },
};

