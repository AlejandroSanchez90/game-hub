import { create } from 'zustand';

type CreatorSidebar = {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const useCreatorSidebar = create<CreatorSidebar>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));
