
import { create } from 'zustand';
import { useState, useEffect } from 'react';

interface ProfileModalStore {
  isOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  toggleProfileModal: () => void;
}

const useProfileModalStore = create<ProfileModalStore>((set) => ({
  isOpen: false,
  openProfileModal: () => set({ isOpen: true }),
  closeProfileModal: () => set({ isOpen: false }),
  toggleProfileModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useProfileModal = () => {
  const { isOpen, openProfileModal, closeProfileModal, toggleProfileModal } = useProfileModalStore();
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeProfileModal();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeProfileModal]);

  return {
    isOpen,
    openProfileModal,
    closeProfileModal,
    toggleProfileModal,
  };
};
