import { create } from 'zustand';
import { useState, useEffect } from 'react';

interface SettingsModalStore {
  isOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  toggleSettingsModal: () => void;
}

const useSettingsModalStore = create<SettingsModalStore>((set) => ({
  isOpen: false,
  openSettingsModal: () => set({ isOpen: true }),
  closeSettingsModal: () => set({ isOpen: false }),
  toggleSettingsModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useSettingsModal = () => {
  const { isOpen, openSettingsModal, closeSettingsModal, toggleSettingsModal } = useSettingsModalStore();
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeSettingsModal();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeSettingsModal]);

  return {
    isOpen,
    openSettingsModal,
    closeSettingsModal,
    toggleSettingsModal,
  };
};
