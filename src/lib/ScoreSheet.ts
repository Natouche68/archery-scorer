import { writable } from 'svelte/store';

export type score = 'M' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type scoreSheet = {
	name: string;
	scoreSheet: score[][];
};

export const scoreSheet = writable<scoreSheet>();
