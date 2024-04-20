import { create } from 'zustand'
import { https } from '../api/http';

export const useAddingTask = create((set) => ({
  isAddingTask: false,
  tasks: [],
  taskId: null,
  isEditingTask: false, 
  toggleAddingTask: () => set((state) => ({ isAddingTask: true })),
  closeIsAddingTask: () => set({ isAddingTask: false }),
  getTasks: async () => {
    try {
      const response = await https.getTasks(); // Replace with your endpoint
      set(() => ({ tasks: response.data }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  setEditingTask: (id, isEditing) =>
    set((state) => ({ taskId: id, isEditingTask: isEditing })),
}))