import { create } from "zustand";

interface ActiveTabProps {
	activeTab: string;
	setActiveTab: (newActiveTab: string) => void;
}

export const useActiveTabStore = create<ActiveTabProps>((set) => ({
	activeTab: "",
	setActiveTab: (newActiveTab) =>
		set(() => ({
			activeTab: newActiveTab,
		})),
}));
