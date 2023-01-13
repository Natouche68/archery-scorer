<script lang="ts">
	import { scoreSheet, type scoreSheetType, type scoreType } from './ScoreSheet';
	import { loadSheets } from './SaveUtils';

	let scoreSheetName: string;
	let volleyNumber: number;
	let arrowNumber: number;
	let sheets = loadSheets();

	function createNewScoreSheet() {
		const newScoreSheet: scoreType[][] = [];

		for (let index = 0; index < volleyNumber; index++) {
			const newVolley: scoreType[] = [];

			for (let index2 = 0; index2 < arrowNumber; index2++) {
				newVolley.push('-');
			}

			newScoreSheet.push(newVolley);
		}

		scoreSheet.set({
			name: scoreSheetName,
			scoreSheet: newScoreSheet,
			arrowNumber: arrowNumber,
		});
	}

	function calcSheetTotal(sheet: scoreSheetType): number {
		let total: number = 0;

		sheet.scoreSheet.forEach((volley) => {
			let volleyTotal: number = 0;

			volley.forEach((value) => {
				if (value != '-' && value != 'M') {
					volleyTotal += value;
				}
			});

			total += volleyTotal;
		});

		return total;
	}
</script>

<div class="home">
	<form on:submit|preventDefault={createNewScoreSheet}>
		<div class="title">Créer une nouvelle feuille de score</div>
		<input
			type="text"
			bind:value={scoreSheetName}
			placeholder="Nom de la feuille de score"
			required
		/>
		<input type="number" bind:value={volleyNumber} placeholder="Nombre de volées" required />
		<input type="number" bind:value={arrowNumber} placeholder="Nombre de flèches" required />
		<button type="submit" class="submit-button">Créer</button>
	</form>

	<div class="my-sheets">
		<div class="title">Mes feuilles de score</div>
		{#each sheets as sheet}
			<button class="sheet">
				<div>
					{sheet.name}
				</div>
				<div style="font-weight: 500;">
					{calcSheetTotal(sheet)}
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.home {
		padding: 24px 5%;
	}

	.title {
		font-weight: 600;
		font-size: 36px;
		margin: 0 0 16px 0;
	}

	input {
		margin: 8px 0;
		width: 100%;
		font-size: 18px;
		font-family: Poppins, Calibri, sans-serif;
		border: none;
		border-bottom: 1px solid var(--neutral-color);
		color: var(--neutral-color);
		outline: none;
		transition: all 0.4s ease;
	}

	input::placeholder {
		color: var(--neutral-color);
	}

	input:focus {
		color: var(--primary-color);
		border-bottom: 3px solid var(--primary-color);
		margin: 7px 0;
	}

	.submit-button {
		margin: 16px 6px;
		padding: 6px;
		width: calc(100% - 6px * 2);
		font-family: Poppins, Calibri, sans-serif;
		font-size: 20px;
		font-weight: 500;
		border: none;
		border-radius: 6px;
		background: var(--primary-color);
		color: #fff;
		transition: all 0.4s ease;
		cursor: pointer;
	}

	.submit-button:hover {
		transform: scale(0.96);
	}

	.my-sheets {
		padding: 36px 0 0 0;
	}

	.sheet {
		width: 100%;
		padding: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: none;
		border-bottom: 1px solid var(--neutral-color);
		background: #fff;
		font-family: Poppins, Calibri, sans-serif;
		font-size: 18px;
		transition: all 0.4s ease;
	}

	.sheet:last-child {
		border-bottom: none;
	}

	.sheet:hover {
		background: var(--light-gray);
	}
</style>
