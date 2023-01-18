<script lang="ts">
	import { scoreSheet, type scoreType } from './ScoreSheet';
	import Numpad from './Numpad.svelte';
	import Back from './icons/Back.svelte';
	import Delete from './icons/Delete.svelte';
	import Edit from './icons/Edit.svelte';
	import { saveSheet } from './SaveUtils';

	let isNumpadActive: boolean = false;
	let editingVolley: number | '' = '';
	let editingArrow: number = 0;

	function calcTotalVolley(index: number): number {
		let total: number = 0;

		$scoreSheet.scoreSheet[index].forEach((value) => {
			if (value != '-' && value != 'M') {
				total += value;
			}
		});

		return total;
	}

	function calcCumulTotal(index: number): number {
		if (index == 0) {
			return calcTotalVolley(index);
		} else {
			return calcTotalVolley(index) + calcCumulTotal(index - 1);
		}
	}

	function updateVolley(index: number): void {
		if (editingVolley !== '') {
			$scoreSheet.scoreSheet[editingVolley].sort((a: scoreType, b: scoreType): number => {
				if (typeof a == 'number' && typeof b == 'number') {
					return b - a;
				}
				return 0;
			});
			scoreSheet.set($scoreSheet);
			saveSheet();
		}
		editingArrow = 0;
		editingVolley = index;
		isNumpadActive = true;
	}

	function closeNumpad() {
		if (editingVolley !== '') {
			$scoreSheet.scoreSheet[editingVolley].sort((a: scoreType, b: scoreType): number => {
				if (typeof a == 'number' && typeof b == 'number') {
					return b - a;
				}
				return 0;
			});
			scoreSheet.set($scoreSheet);
			saveSheet();
		}

		isNumpadActive = false;
		editingVolley = '';
		editingArrow = 0;
	}
</script>

<svelte:window on:click={closeNumpad} />

<Numpad bind:isNumpadActive bind:editingVolley bind:editingArrow />

<div class="score-sheet-editor">
	<div class="options">
		<button class="back-button" on:click={() => scoreSheet.set(null)}>
			<Back fillColor="#9f9f9f" size={18} /> Retour
		</button>
		<button class="square-button">
			<Edit fillColor="#9f9f9f" />
		</button>
		<button class="square-button">
			<Delete fillColor="#9f9f9f" />
		</button>
	</div>
	<div class="title">
		{$scoreSheet.name}
	</div>
	{#each $scoreSheet.scoreSheet as volley, index}
		<button
			class="volley {editingVolley === index ? ' editing' : ''}"
			on:click|stopPropagation={() => {
				updateVolley(index);
			}}
		>
			{#each volley as score, currentArrow}
				<div
					class="score {editingVolley === index && editingArrow === currentArrow ? ' editing' : ''}"
				>
					{score + ' '}
				</div>
			{/each}
			<div class="total">
				{#key $scoreSheet}
					{calcTotalVolley(index)}
				{/key}
			</div>
			<div class="total">
				{#key $scoreSheet}
					{calcCumulTotal(index)}
				{/key}
			</div>
		</button>
	{/each}
</div>

{#if isNumpadActive}
	<div style="height: 288px;" />
{/if}

<style>
	.score-sheet-editor {
		padding: 24px 5%;
	}

	.options {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.back-button {
		margin-bottom: 16px;
		width: 100%;
		color: var(--neutral-color);
		font-family: Poppins, Calibri, sans-serif;
		font-size: 18px;
		text-align: left;
		border: none;
		outline: none;
		background: none;
	}

	.square-button {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 2px;
		margin-bottom: 16px;
		padding: 0;
		text-align: center;
		height: 30px;
		width: 42px;
		border: none;
		outline: none;
		background: none;
	}

	.title {
		font-weight: 600;
		font-size: 36px;
		margin: 0 0 16px 0;
	}

	.volley {
		width: 100%;
		padding: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: none;
		border-bottom: 1px solid var(--neutral-color);
		background: #fff;
		font-family: Poppins, Calibri, sans-serif;
		transition: all 0.4s ease;
	}

	.volley:last-child {
		border: none;
	}

	.volley.editing {
		background: var(--light-gray);
	}

	.score {
		width: 60px;
		text-align: center;
		font-size: 20px;
		transition: all 0.4s ease;
	}

	.score.editing {
		color: var(--primary-color);
		transform: scale(1.2);
	}

	.total {
		width: 60px;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
	}
</style>
