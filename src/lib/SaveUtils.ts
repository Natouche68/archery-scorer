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
	const sheets: scoreSheetType[] = [];

	for (let index = 0; index < window.localStorage.length; index++) {
		sheets.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(index))));
	}

	return sheets;
}

export function deleteSheet(sheetId: string): void {}
