import { writable } from 'svelte/store';

export type scoreType = '-' | 'M' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type scoreSheetType = {
	name: string;
	scoreSheet: scoreType[][];
	arrowNumber: number;
	saveKey?: string | undefined;
};

export const scoreSheet = writable<scoreSheetType>();
