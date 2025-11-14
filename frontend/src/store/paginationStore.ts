import { create } from "zustand";

interface PaginationProps {
	limit: number;
	setLimit: (limit: number) => void;
	offset: number;
	setOffset: (offset: number) => void;
	isFirstPage: boolean;
	setIsFirstPage: (isFirstPage: boolean) => void;
	isLastPage: boolean;
	setIsLastPage: (isLastPage: boolean) => void;
}

export const usePaginationStore = create<PaginationProps>((set) => ({
	limit: 30,
	setLimit: (newLimit: number) =>
		set(() => ({
			limit: newLimit,
		})),
	offset: 0,
	setOffset: (newOffset: number) =>
		set(() => ({
			offset: newOffset,
		})),
	isFirstPage: true,
	setIsFirstPage: (isFirstPage) =>
		set(() => ({
			isFirstPage: isFirstPage,
		})),
	isLastPage: false,
	setIsLastPage: (isLastPage) =>
		set(() => ({
			isLastPage: isLastPage,
		})),
}));
