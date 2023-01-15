<script lang="ts">
	import { scoreSheet, type scoreType } from './ScoreSheet';
	import Numpad from './Numpad.svelte';

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
		}
		editingArrow = 0;
		editingVolley = index;
		isNumpadActive = true;
	}
</script>

<Numpad bind:isNumpadActive bind:editingVolley bind:editingArrow />

<div class="score-sheet-editor">
	<button class="back-button" on:click={() => scoreSheet.set(null)}>← Retour</button>
	<div class="title">
		{$scoreSheet.name}
	</div>
	{#each $scoreSheet.scoreSheet as volley, index}
		<button
			class="volley {editingVolley === index ? ' editing' : ''}"
			on:click={() => {
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
