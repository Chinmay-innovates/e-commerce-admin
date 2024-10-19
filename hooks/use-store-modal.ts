import { create } from "zustand";

interface useStoreStoreModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useStoreModal = create<useStoreStoreModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
