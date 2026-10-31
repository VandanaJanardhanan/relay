import { isFirebaseConfigured, db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  runTransaction,
  query,
  orderBy 
} from 'firebase/firestore';
import { 
  STORAGE_KEYS, 
  getLocalItems, 
  setLocalItems, 
  listeners 
} from './storageService';
import { INITIAL_TASKS } from './mockData';
import { isTaskUnassigned } from '../utils/taskUtils';

export const taskService = {
  // Subscribe to real-time task updates
  subscribe(callback) {
    if (isFirebaseConfigured && db) {
      const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        callback(tasks);
      }, (err) => {
        console.error('Firestore tasks listener error:', err);
      });
    } else {
      const sendCurrent = () => {
        const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
        callback(tasks);
      };
      listeners.tasks.add(callback);
      sendCurrent();
      return () => {
        listeners.tasks.delete(callback);
      };
    }
  },

  // Create Task
  async createTask(data, creator) {
    const taskId = `task-${Date.now()}`;
    const newTask = {
      id: taskId,
      campaignId: data.campaignId,
      campaignTitle: data.campaignTitle || 'Campaign',
      title: data.title.trim(),
      description: data.description ? data.description.trim() : '',
      // Can be null if created without a volunteer
      assignedVolunteerId: data.assignedVolunteerId || null,
      assignedVolunteerName: data.assignedVolunteerName || null,
      status: data.status || 'Pending',
      priority: data.priority || 'Medium',
      dueDate: data.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      createdBy: creator.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      await setDoc(doc(db, 'tasks', taskId), newTask);
    } else {
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      tasks.unshift(newTask);
      setLocalItems(STORAGE_KEYS.TASKS, tasks, 'tasks');
    }

    return newTask;
  },

  // Assign Volunteer (Organizer action)
  async assignVolunteer(taskId, volunteer) {
    const patch = {
      assignedVolunteerId: volunteer ? volunteer.uid : null,
      assignedVolunteerName: volunteer ? volunteer.fullName : null,
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, 'tasks', taskId), patch);
    } else {
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      const index = tasks.findIndex((t) => t.id === taskId);
      if (index === -1) throw new Error('Task not found.');
      tasks[index] = { ...tasks[index], ...patch };
      setLocalItems(STORAGE_KEYS.TASKS, tasks, 'tasks');
    }
    return patch;
  },

  // Volunteer claims unassigned task (Atomic & Concurrent Protection)
  async claimTask(taskId, volunteer) {
    if (!volunteer || !volunteer.uid) {
      throw new Error('You must be logged in as a volunteer to claim a task.');
    }

    if (isFirebaseConfigured && db) {
      // Use Firestore transaction for concurrent claim safety
      const taskRef = doc(db, 'tasks', taskId);
      return await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(taskRef);
        if (!taskDoc.exists()) {
          throw new Error('Task does not exist.');
        }
        const taskData = taskDoc.data();
        if (!isTaskUnassigned(taskData)) {
          throw new Error('Sorry, this task has just been taken by another volunteer. Explore other available tasks.');
        }

        const updates = {
          assignedVolunteerId: volunteer.uid,
          assignedVolunteerName: volunteer.fullName,
          updatedAt: new Date().toISOString(),
        };
        transaction.update(taskRef, updates);
        return { ...taskData, ...updates };
      });
    } else {
      // Local atomic check
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      const index = tasks.findIndex((t) => t.id === taskId);
      if (index === -1) {
        throw new Error('Task does not exist.');
      }
      if (!isTaskUnassigned(tasks[index])) {
        throw new Error('Sorry, this task has just been taken by another volunteer. Explore other available tasks.');
      }

      tasks[index] = {
        ...tasks[index],
        assignedVolunteerId: volunteer.uid,
        assignedVolunteerName: volunteer.fullName,
        updatedAt: new Date().toISOString(),
      };
      setLocalItems(STORAGE_KEYS.TASKS, tasks, 'tasks');
      return tasks[index];
    }
  },

  // Update task status (Pending, In Progress, Completed)
  async updateStatus(taskId, newStatus) {
    const patch = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, 'tasks', taskId), patch);
    } else {
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      const index = tasks.findIndex((t) => t.id === taskId);
      if (index === -1) throw new Error('Task not found.');
      tasks[index] = { ...tasks[index], ...patch };
      setLocalItems(STORAGE_KEYS.TASKS, tasks, 'tasks');
    }
    return patch;
  },

  // Update task details (title, description, priority, dueDate)
  async updateTask(taskId, updates) {
    const patch = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, 'tasks', taskId), patch);
    } else {
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      const index = tasks.findIndex((t) => t.id === taskId);
      if (index === -1) throw new Error('Task not found.');
      tasks[index] = { ...tasks[index], ...patch };
      setLocalItems(STORAGE_KEYS.TASKS, tasks, 'tasks');
    }
    return patch;
  },

  // Delete task
  async deleteTask(taskId) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'tasks', taskId));
    } else {
      const tasks = getLocalItems(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      const filtered = tasks.filter((t) => t.id !== taskId);
      setLocalItems(STORAGE_KEYS.TASKS, filtered, 'tasks');
    }
    return { success: true };
  },
};

