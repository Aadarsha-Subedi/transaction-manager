import { create } from "zustand";

interface FlowProps {
	loading: boolean;
	setLoading: (newLoading: boolean) => void;
	error: boolean;
	setError: (newError: boolean) => void;
}

export const useFlowStore = create<FlowProps>((set) => ({
	loading: false,
	setLoading: (newLoading) =>
		set(() => ({
			loading: newLoading,
		})),
	error: false,
	setError: (newError) =>
		set(() => ({
			error: newError,
		})),
}));
