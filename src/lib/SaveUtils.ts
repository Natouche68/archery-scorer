import { scoreSheet, type scoreSheetType } from './ScoreSheet';
import { get } from 'svelte/store';

export function saveSheet(): void {
	const currentScoreSheet: scoreSheetType = get(scoreSheet);

	if (!currentScoreSheet.saveKey) {
		currentScoreSheet.saveKey = currentScoreSheet.name + '_' + Date.now();
		scoreSheet.set(currentScoreSheet);
	}

	window.localStorage.setItem(currentScoreSheet.saveKey, JSON.stringify(currentScoreSheet));
}

export function loadSheets(): scoreSheetType[] {
	return [];
}

export function deleteSheet(sheetId: string): void {}
